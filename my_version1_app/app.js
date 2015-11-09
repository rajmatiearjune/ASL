var express = require('express');
var http = require('http');
var path = require('path');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

app = express();
app.use(bodyParser.urlencoded({ extended: false }));

//app.use(express.bodyParser);
//app.use(express.methodOverride());
//app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/index.html');  
  }).listen(1337, "127.0.0.1");
    console.log('Server running at http://127.0.0.1:1337/');


mongoose.connect('mongodb://localhost:27017/todo');

//app.use("/", express.static(__dirname + '/public'));
//login schema that allows info to be saved in database
var todoSchema = mongoose.Schema({
    signinButton: String,
    signinPassword: String,
    created: {type: Date, default: Date.now}
});

//model to execute login info into users database
var User = mongoose.model('users',todoSchema);

app.post('/new',function(req,res){
    new User({
        signinButton :req.body.signinButton,
        signinPassword :req.body.signinPassword,
    }).save(function(err, doc){
        if(err)res.json(err);
        //else res.send('Success');
        else res.sendFile(__dirname + '/public/list.html');  
    })
});


//registration schema that allows info to be saved in database
var registerSchema = mongoose.Schema({
    name: String,
    lastname: String,
    email: String,
    date: Date,
    username: String,
    password: String,
});

var Register = mongoose.model('register',registerSchema);

app.post('/newUser',function(req,res){
    new Register({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        date: req.body.date,
        username: req.body.username,
        password: req.body.password,
    }).save(function(err, doc){
        if(err)res.json(err);
        //else res.send('Success');
        else res.sendFile(__dirname + '/public/index.html');  
    })
});


