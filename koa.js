const http = require('http')
const Koa = require('koa');
const router = require('./')()

router.on('GET', '/test', (ctx, next) => {
  // ctx.body = {'hello': 'world'}
  return next()
})

const app = new Koa();

app.use(async function (ctx, next) {
  router.lookup(ctx, next)
});

// app.use(async function (ctx, next) {
//   ctx.body = "default"
// });

const server = http.createServer(app.callback())

server.listen(3030, err => {
  if (err) throw err
  console.log('Server listening on: http://localhost:3000')
})


