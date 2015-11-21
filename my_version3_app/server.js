var express = require('express');
var app = express();
var expressSession = require('express-session');
var mongoUrl = 'mongodb://localhost:27017/todo';
var expressHbs = require('express3-handlebars');
var MongoStore = require('connect-mongo')(expressSession);
var mongo = require('./mongo');
var mongoose = require('mongoose');
var List = require('./views/list');
var port = 8900;

//login middleware
function requireUser(req, res, next){
  if (!req.user) {
    res.redirect('/not_allowed');
  } else {
    next();
  }
}

//adding to item list middleware
function requireList(req, res, next){
    if (!req.user/list) {
        res.redirect('/not_allowed');
  } else {
    next();
  }
}

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


//middleware to be used after expressSession.
app.use(checkIfLoggedIn);

app.engine('hbs', expressHbs({extname: 'hbs', defaultLayout: 'main.hbs'}));
app.set('view engine', 'hbs');

app.get('/', function(req, res){
    var coll = mongo.collection('users');
    coll.find({}).toArray(function(err, users){
        res.render('index', {users:users});
    })
});

app.get('/', function(req, res){
    var coll = mongo.collection('list');
    coll.find({}).toArray(function(err, list){
        res.send('index', {list:list});
    })
});

app.get('/login', function(req, res){
    res.render('login');
});

app.get('/logout', function(req, res){
    delete req.session.username;
    res.redirect('/');
});

app.get('/not_allowed', function(req, res){
    res.render('not_allowed');
});

//secret url with requireUser middleware
app.get('/secret', requireUser, function(req, res){
    res.render('secret');
});

app.get('/signup', function(req,res){
    res.render('signup');
});

app.get('/mytodolist', function(req,res){
    res.render('mytodolist');
});

//creating new users with callback
function createUser(username, password, password_confirmation, image, callback){
    var coll = mongo.collection('users');

    if (password !== password_confirmation) {
        var err = 'The password do not match';
        callback(err);
    }else{
        var query       = {username:username};
        var userObject  = {username: username, password: password, image:image};

        //check if username already exist
        coll.findOne(query, function(err, user){
            if (user) {
                err = 'user already exists';
                callback(err);

            }else{
                //create user
                coll.insert(userObject, function(err,user){
                    callback(err,user);
                });
            }
        });

    }
}

//signup user post
app.post('/signup', function(req, res){
    var personName = req.body.personName;
    var email = req.body.email;
    var username = req.body.username;
    var password = req.body.password;
    var password_confirmation = req.body.password_confirmation;
    var image = req.body.image;

    createUser(username, password, password_confirmation, image, function(err,user){
        if (err) {
            res.render('signup', {error: err});
        }else{
            req.session.username = user.username;
            res.redirect('/');
        }
    });
});

//function finds matching users
function authenticateUser(username, password, callback){
    var coll = mongo.collection('users');

    coll.findOne({username: username, password:password}, function(err, user){
        callback(err, user);
    });
}

app.post('/login', function(req, res){
    //create from form /views/login.hbs page
    var personName = req.body.personName;
    var email = req.body.email;
    var username = req.body.username;
    var password = req.body.password;

    authenticateUser(username, password, function(err, user){
        if (user){
            //any other request will see user logged in
            req.session.username = user.username;

            res.redirect('/');
        }else{
            res.render('login', {badCredentials: true});
        }
    });

});

//todo list items

//creating new items with callback
function createList(myList, message, callback){
    var coll = mongo.collection('list');

    if (myList = 'submit') {
        var err = 'Enter an item';
        callback(err);
    }else{
        var query       = {myList:myList};
        var listObject  = {myList:myList, message:message};

        //check if item already exist
        coll.findOne(query, function(err, list){
            if (list) {
                err = 'item already exists';
                callback(err);

            }else{
                //create item
                coll.insert(listObject, function(err,list){
                    callback(err,list);
                });
            }
        });

    }
}


//entries list post
app.post('/mytodolist', function(req, res){
    var myList = req.body.myList;
    var message = req.body.message;

    createList(myList, message, function(err,list){
        if (err) {
            res.render('mytodolist', {error: err});
        }else{
            req.session.myList = list.myList;
            //res.redirect('/')
            response.writeBody(req.body.myList);
            response.writeBody(req.body.message);
        }
    })
});




app.use('/public', express.static('public'));

mongo.connect(mongoUrl, function(){
  console.log('Connected to mongo at: ' + mongoUrl);
  app.listen(port, function(){
    console.log('Server is listening on port: '+port);
  });  
})

//app.listen(8080);