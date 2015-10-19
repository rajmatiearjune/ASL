var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.reset('respond with a resource'),
  res.send('respond with a resource');
});

module.exports = router;
