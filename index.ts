const express = require('express')
const http = require('http')
const path = require('path')
const util = require('util')
const vm = require('vm')
const validator = require('./src/validator')

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

// Validate code that is sent to the validate path
app.post('/validate', (req, res, next) => {
  let code:string = req.body.code

  let feedback:string = validator.validate(code)

  const sandbox = {}

  const context = new vm.createContext(sandbox)

  try {
    const script = new vm.Script(code)
    script.runInContext(context)
    res.send('Your code did not throw an error!')
  } catch(e) {
    let relevantErrorLines:Array<string> = e.stack.match(/^(?!evalmachine.*\n)(?!\s*at.*)(.+).*$/gm)
    let error:string = ''

    relevantErrorLines.forEach((line) => {
      error += line + '\n'
    })

    res.send(error)
  } 
})

let server = http.createServer(app)
server.listen(8080, () => {
  console.log('listening on *:8080')
})
