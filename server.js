var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

app.get('/', function(req, res, next) {
    res.sendFile(__dirname + '/public/index.html')
});

app.use(express.static('public'));


io.on('connection', function(client) {
    console.log('Client connected...');

    client.on('join', function(data) {
        console.log(data);
    });

    client.on('messages', function(data) {
        client.emit('thread', data);
        client.broadcast.emit('thread', data);
    });
});

// server.listen(3000);
// changed to server.listen(process.env.PORT || 5000); to deploy on Heroku
server.listen(process.env.PORT || 5000);
console.log('HEY you got it up and Running on Meow port 5000  =^._.^= ');