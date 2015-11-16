var mongo = require('../mongo');

module.exports = function(req, res, next){
  console.log('check if entered', req.session);
  
  if (req.session.items) {
    
    var coll = mongo.collection('items');
    var items = req.session.items;
    console.log('looking for user by',items);
    coll.find({items: items}).toArray(function(err, items){
      if (err) {
        throw new Error('Error finding user by id: '+err);
      }
      console.log('items',items);
      
      // This makes it available to all templates
      // For example: {{#if user}} The username is {{user.username}} {{/if}}
      res.locals.items = items[0];
      
      // Store it on 'req.user' for other middlewares ('require_user.js', e.g.)
      req.items = items[0];
      
      next();
    });
  } else {
    next();
  }
};