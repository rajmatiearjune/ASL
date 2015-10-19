var mongoose = require('mongoose')
var express = require('express'),
app = express(),

server = require('http').createServer(app),
io = require('socket.io').listen(server);

server.listen(3000);

app.get('/', function(req, res){
res.sendfile(__dirname + '/index.html');
});



io.sckets.on('connection', function(socket){
    socket.on('send message', function(data){

        var newMsg = new Chat({msg: '' + data});

        console.log('saving newMsg: ' + newMsg);

        newMsg.save(function(err){
            console.log('saved, err = ' + err);
            if(err) throw err;
            console.log('echoeing back data =' + data);
            io.sockets.emit('new message', data);
        });

    });
});

var choatSchema = mongoose.Schema({
    msg: String,
    created: {type: Date, default: Date.now}
});

var Chat = mongoose.model('Message', chatSchema);



mongoose.connect('mongodb://localhost/index', function(err){
if(err){
console.log(err);
} else{
    console.log('Connected to mongodb!');
}
});