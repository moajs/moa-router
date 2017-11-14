/*!
 * methods
 * Copyright(c) 2013-2014 TJ Holowaychuk
 * Copyright(c) 2015-2016 Douglas Christopher Wilson
 * MIT Licensed
 */

'use strict'

/**
 * Module dependencies.
 * @private
 */

var http = require('http')

/**
 * Module exports.
 * @public
 */

module.exports = getCurrentNodeMethods() || getBasicNodeMethods()

/**
 * Get the current Node.js methods.
 * @private
 */

function getCurrentNodeMethods () {
  return http.METHODS && http.METHODS.map(function upperCaseMethod (method) {
    return method.toUpperCase()
  })
}

/**
 * Get the "basic" Node.js methods, a snapshot from Node.js 0.10.
 * @private
 */

function getBasicNodeMethods () {
  return [
    'GET',
    'POST',
    'PUT',
    'HEAD',
    'DELETE',
    'OPTIONS',
    'TRACE',
    'COPY',
    'LOCK',
    'MKCOL',
    'MOVE',
    'PURGE',
    'PROPFIND',
    'PROPPATCH',
    'UNLOCK',
    'REPORT',
    'MKACTIVITY',
    'CHECKOUT',
    'MERGE',
    'M-SEARCH',
    'NOTIFY',
    'SUBSCRIBE',
    'UNSUBSCRIBE',
    'PATCH',
    'SEARCH',
    'CONNECT'
  ]
}
