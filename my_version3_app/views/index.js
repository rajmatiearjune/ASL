router.get('/userlist', function(req, res) {
    var db = req.db;
    var collection = db.get('usercollection');
    collection.find({},{},function(e,docs){
        res.render('userlist', {
            "userlist" : docs
        });
    });
});



router.get('/list', function(req, res) {
    var db = req.db;
    var collection = db.get('listcollection');
    collection.find({},{},function(e,docs){
        res.render('list', {
            "list" : docs
        });
    });
});
