app.use(function(req, res){
  User.find({}, function(err, users) {
    res.render('index', { "user_names": users });
  });
});

app.use(function(req, res){
  User.find({}, function(err, list) {
    res.render('index', { "myList": list });
  });
});