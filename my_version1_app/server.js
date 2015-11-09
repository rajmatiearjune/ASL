//lets require/import the mongodb native drivers.
var mongodb = require('mongodb');

//We need to work with "MongoClient" interface in order to connect to a mongodb server.
var MongoClient = mongodb.MongoClient;

// Connection URL. This is where your mongodb server is running.
var url = 'mongodb://localhost:27017/todo';

// Use connect method to connect to the Server
MongoClient.connect(url, function (err, db) {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    //HURRAY!! We are connected. :)
    console.log('Connection established to', url);

    // do some work here with the database.

    //Close connection
    db.close();
  }
});

/*
var express = require('express');

// Mongoose import
var mongoose = require('mongoose');

// Mongoose connection to MongoDB (ted/ted is readonly)
mongoose.connect('mongodb://localhost:27017/todo/user', function (error) {
    if (error) {
        console.log(error);
    }
});

// Mongoose Schema definition
var Schema = mongoose.Schema;
var UserSchema = new Schema({
    first_name: String,
    last_name: String,
    email: String
});

// Mongoose Model definition
var User = mongoose.model('user', UserSchema);

// Bootstrap express
var app = express();

// URLS management
app.get('/', function (req, res) {
    res.send("<a href='/user'>Show Users</a>");
});

app.get('/user', function (req, res) {
    User.find({}, function (err, docs) {
        res.json(docs);
    });
});

app.get('/user/:email', function (req, res) {
    if (req.params.email) {
        User.find({ email: req.params.email }, function (err, docs) {
            res.json(docs);
        });
    }
});

// Start the server
app.listen(8000);
*/