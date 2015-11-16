var express = require('express');
var app = express();
var http = require('http');
var path = require('path');
var mongoose = require('mongoose');
var expressSession = require('express-session');
var mongoUrl = 'mongodb://localhost:27017/todo';
var MongoStore = require('connect-mongo')(expressSession);
var mongo = require('./mongo');
var port = 8080;

//login middleware
function requireUser(req, res, next){
  if (!req.user) {
    res.redirect('/not_allowed');
  } else {
    next();
  }
}

/*
var express = require('express');
var app = express();
var http = require('http');
var path = require('path');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({ extended: false }));

app.listen(1337, "127.0.0.1");
    console.log('Server running at http://127.0.0.1:1337/');

mongoose.connect('mongodb://localhost:27017/todo');
*/

//app.use(express.bodyParser);
//app.use(express.methodOverride());
//app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use('/public', express.static('public'));
/*
app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/index.html');  
  }).listen(1337, "127.0.0.1");
    console.log('Server running at http://127.0.0.1:1337/');
*/

//check if user is logged in
function checkIfLoggedIn(req, res, next){
    if (req.session.username) {
        var coll = mongo.collection('users');
        coll.findOne({username: req.session.username}, function(err, user){
            if (user){
                //setting user property to check user status
                req.user = user;
                //setting res.locals variable to call user to user handlebars template.
                res.locals.user = user;
            }
            next();
        });
         }  else {
            next();
    }
};

//access to req.body in forms element
app.use(require('body-parser')());
//app.use(bodyParser.urlencoded({ extended: false })));

//cookie parser middelware
app.use(require('cookie-parser')());

app.use(expressSession({
    secret: 'mytodolist',
    store: new MongoStore({
        url: mongoUrl
    })
}));




//app.use("/", express.static(__dirname + '/public'));
/*login schema that allows info to be saved in database
var todoSchema = mongoose.Schema({
    signinButton: String,
    signinPassword: String,
    created: {type: Date, default: Date.now}
});

//model to execute login info into users database
var User = mongoose.model('users',todoSchema);
*/
app.post('/new',function(req,res){
    new User({
        signinButton :req.body.signinButton,
        signinPassword :req.body.signinPassword,
        
    }).save(function(err, doc){
        if(err)res.json(err);
        //else res.send('Success');
        //else res.sendFile(__dirname + '/public/list.html');  
        else
            coll.insert(itemObject, function(err,checkIfLoggedIn){
                    callback(err,checkIfLoggedIn);
                });
    })
});


/*registration schema that allows info to be saved in database
var registerSchema = mongoose.Schema({
    name: String,
    lastname: String,
    email: String,
    date: Date,
    username: String,
    password: String,
});

var Register = mongoose.model('register',registerSchema);
*/
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
        else
            coll.insert(itemObject, function(err,register){
                    callback(err,register);
                });
            
        //else res.sendFile(__dirname + '/public/index.html');  
    })
});



mongo.connect(mongoUrl, function(){
  console.log('Connected to mongo at: ' + mongoUrl);
  app.listen(port, function(){
    console.log('Server is listening on port: '+port);
  });  
})


