module.exports = function(req, res, next){
  if (!req.list) {
    res.redirect('/not_allowed');
  } else {
    next();
  }
};