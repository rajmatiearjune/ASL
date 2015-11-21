var mongo = require('../mongo');

module.exports = function(req, res, next){
  console.log('check if entered', req.session);
  
  if (req.session.myList) {
    
    var coll = mongo.collection('list');
    var myList = req.session.myList;
    console.log('looking for item by',list);
    coll.find({myList: myList}).toArray(function(err, list){
      if (err) {
        throw new Error('Error finding list by id: '+err);
      }
      console.log('list',list);
      
      // This makes it available to all templates
      // For example: {{#if user}} The username is {{user.username}} {{/if}}
      res.locals.list = list[0];
      
      // Store it on 'req.user' for other middlewares ('require_user.js', e.g.)
      req.list = list[0];
      
      next();
    });
  } else {
    next();
  }
};