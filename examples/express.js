const http = require('http')
const express = require('express')
const app = express()

const router = require('../')()
router.type = 'express'

router.get('/', (req, res, next) => {
  res.json({'path': 'root'})
})

router.on('GET', '/test', (req, res, next) => {
  res.json({'hello': 'world'})
})

app.use(router.routes())

const server = http.createServer(app)

server.listen(3000, err => {
  if (err) throw err
  console.log('Server listening on: http://localhost:3000')
})
