const http = require('http')
const Koa = require('koa')
const app = new Koa()

const router = require('koa-router')()
// router.type = 'koa'

router.get('/', (ctx, next) => {
  ctx.body = {'path': 'root'}
})

router.get('/test', (ctx, next) => {
  ctx.body = {'hello': 'world'}
})

app.use(router.routes())

app.use(async function (ctx, next) {
  ctx.body = "default"
})

const server = http.createServer(app.callback())

server.listen(3000, err => {
  if (err) throw err
  console.log('Server listening on: http://localhost:3000')
})
