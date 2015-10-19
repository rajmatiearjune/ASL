var express = require('express');
var routes = require('./routes/index');
var users = require('./routes/users');
var http = require('http');
var path = require('path');
var mongoose = require('mongoose');

var app = express();

// view engine setup
app.set('port', process.env.PORT || 3700);
app.set('views', path.join(__dirname, 'views'));

app.set('views', __dirname + '/tpl');
app.set('view engine', "jade");
app.engine('jade', require('jade').__express);
app.get("/", function(req, res){
    res.render("page");
});


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public'));
/*
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
*/

if ('development' == app.get('env')){
  app.use(express.errorHandler());
  mongoose.connect('mongodb://localhost:27017')

}

mongoose.model('user', {name: String});
mongoose.model('posts', {content: String});

app.get('/user', function(req, res){
  mongoose.models('user').find(function(err, user){
    res.send('user');

  });
});

app.get('/posts', function(req, res){
  mongoose.models('user').find(function(err, user){
    res.send('user');

  });
});



app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;


