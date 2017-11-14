'use strict'

const httpMethods = require('./methods')
const Router = require('find-my-way')

class MoaRouter extends Router {
  constructor (opts) {
    super(opts)
    var self = this

    httpMethods.forEach(function (method) {
      self[method] = function (path, handler, store) {
        return self.on(method.toUpperCase(), path, handler, store)
      }
    })
  }

  lookupKoa (ctx, next) {
    var req = ctx.req
    // var res = ctx.res
    var handle = this.find(req.method, sanitizeUrl(req.url))
    if (!handle) return this._defaultKoaRoute(ctx, next)
    ctx.params = handle.params
    ctx.store = handle.store
    return handle.handler(ctx, next)
  }

  lookupExpress (req, res, next) {
    var handle = this.find(req.method, sanitizeUrl(req.url))
    if (!handle) return this._defaultHttpRoute(req, res)
    req.params = handle.params
    req.store = handle.store
    return handle.handler(req, res, next)
  }

  lookupHttp (req, res) {
    var handle = this.find(req.method, sanitizeUrl(req.url))
    if (!handle) return this._defaultHttpRoute(req, res)
    return handle.handler(req, res, handle.params, handle.store)
  }

  _defaultKoaRoute (ctx, next) {
    if (this.defaultRoute) {
      this.defaultRoute(ctx, next)
    }
  }

  _defaultHttpRoute (req, res) {
    if (this.defaultRoute) {
      this.defaultRoute(req, res)
    } else {
      res.statusCode = 404
      res.end()
    }
  }

  routes () {
    var router = this
    if (router.type === 'express') {
      return function (req, res, next) {
        router.lookupExpress(req, res, next)
      }
    } else if (router.type === 'koa') {
      return function (ctx, next) {
        router.lookupKoa(ctx, next)
      }
    } else {
      return function (req, res) {
        router.lookupHttp(req, res)
      }
    }
  }
}

module.exports = function (opts) {
  if (opts && !opts.type) opts.type = 'koa'
  return new MoaRouter(opts)
}

function sanitizeUrl (url) {
  for (var i = 0, len = url.length; i < len; i++) {
    var charCode = url.charCodeAt(i)
    if (charCode === 63 || charCode === 35) {
      return url.slice(0, i)
    }
  }
  return url
}
