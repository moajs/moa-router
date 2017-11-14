'use strict'

const t = require('tap')
const test = t.test
const request = require('supertest')
const express = require('express')
const router = require('../')()
router.type = 'express'

const app = express()

router.get('/', (req, res, next) => {
  res.json({ 'path': 'root' })
})

router.get('/query', (req, res, next) => {
  res.json({ 'query': req.query })
})

router.on('GET', '/user', (req, res, next) => {
  res.json({
    hello: 'world',
    store: req.store
  })
}, { message: 'hello world' })

router.get('/:id', (req, res, next) => {
  let id = req.params.id
  res.json({ 'id': id })
})

app.use(router.routes())

app.use((req, res, next) => {
  res.send('default')
})

test('GET / return json', t => {
  t.plan(2)

  request(app)
    .get('/')
    .expect('Content-Type', /json/)
    .expect('Content-Length', '15')
    .expect(200)
    .end(function (err, res) {
      if (err) {
        t.error(err)
        t.strictEqual(res.statusCode, 404)
      }

      t.strictEqual(res.statusCode, 200)
      t.pass('Everything good')
    })
})

test('GET /query return json', t => {
  t.plan(3)

  request(app)
    .get('/query?a=1&b=2')
    .expect('Content-Type', /json/)
    .expect('Content-Length', '27')
    .expect(200)
    .end(function (err, res) {
      if (err) {
        t.error(err)
      }
      t.equal(res.body.query.a, '1')
      t.equal(res.body.query.b, '2')
      t.pass('Everything good')
    })
})

test('GET /:id test ctx.params', t => {
  t.plan(2)

  request(app)
    .get('/i5ting')
    .expect('Content-Type', /json/)
    .expect('Content-Length', '15')
    .expect(200)
    .end(function (err, res) {
      if (err) {
        t.error(err)
        t.strictEqual(res.statusCode, 404)
      }

      t.strictEqual(res.body.id, 'i5ting')
      t.pass('Everything good')
    })
})

test('GET /user test on() && ctx.store', t => {
  t.plan(2)

  request(app)
    .get('/user')
    .expect('Content-Type', /json/)
    .expect(200)
    .end(function (err, res) {
      if (err) {
        t.error(err)
      }
      t.equal(res.body.store.message, 'hello world')
      t.pass('Everything good')
    })
})
