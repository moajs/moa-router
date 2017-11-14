'use strict'

const t = require('tap')
const test = t.test
const request = require('supertest')
const Koa = require('koa')
const router = require('../')()
// router.type = 'koa'

const app = new Koa()

router.get('/', (ctx, next) => {
  ctx.body = { 'path': 'root' }
})

router.get('/query', (ctx, next) => {
  // console.log(ctx.query)
  ctx.body = { 'query': ctx.query }
})

router.on('GET', '/user', (ctx, next) => {
  // console.log(ctx.store)
  ctx.body = {
    hello: 'world',
    store: ctx.store
  }
}, { message: 'hello world' })

router.get('/:id', (ctx, next) => {
  let id = ctx.params.id
  ctx.body = { 'id': id }
})

app.use(router.routes())

app.use(function (ctx, next) {
  ctx.body = 'default'
})

test('GET / return json', t => {
  t.plan(2)

  request(app.callback())
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

  request(app.callback())
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

  request(app.callback())
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

  request(app.callback())
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
