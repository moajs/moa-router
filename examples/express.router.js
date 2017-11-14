const http = require('http')
const express = require('express')
const app = express()

app.get('/', (req, res, next) => {
  res.json({'path': 'root'})
})

app.get('/test', (req, res, next) => {
  res.json({'hello': 'world'})
})

const server = http.createServer(app)

server.listen(3000, err => {
  if (err) throw err
  console.log('Server listening on: http://localhost:3000')
})
