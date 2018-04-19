var express = require('express');
var http = require('http');
var path = require('path');
var app = express();
// Use body-parser for parsing request data
var bodyParser = require('body-parser');
app.use(bodyParser.json());
// Make static files in the public folder accessible (for images, scripts, etc)
app.use('/public', express.static('public'));
// Send index.html on root path
app.get('/', function (req, res, next) {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});
var server = http.createServer(app);
server.listen(8080, function () {
    console.log('listening on *:8080');
});
//# sourceMappingURL=index.js.map