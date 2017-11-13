const http = require('http')
const express = require('express');
const app = express();

const router = require('../')()

router.get('/', (req, res, next) => {
  res.json({'path': 'root'}) 
})

router.on('GET', '/test', (req, res, next) => {
  res.json({'hello': 'world'})
})

app.use(router.routes());

app.use(async function (ctx, next) {
  res.send("default")
});

const server = http.createServer(app)

server.listen(3030, err => {
  if (err) throw err
  console.log('Server listening on: http://localhost:3000')
})
