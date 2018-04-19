const express = require('express')
const http = require('http')
const path = require('path')

let app = express()

// Use body-parser for parsing request data
const bodyParser = require('body-parser')
app.use(bodyParser.json())

// Make static files in the public folder accessible (for images, scripts, etc)
app.use('/public', express.static('public'))

// Send index.html on root path
app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname + '/public/index.html'))
})

let server = http.createServer(app)
server.listen(8080, () => {
  console.log('listening on *:8080')
})
