var mysql      = require('mysql');
var connection = mysql.createConnection({
  host       : String, // defaults to 'localhost'
  port       : Number, // defaults to 3306
  socketPath : String, // defaults to undefined
  user       : String, // defaults to undefined
  password   : String, // defaults to undefined
  database   : String, // defaults to undefined
  charset    : String, // defaults to 'UTF8_GENERAL_CI'
  typeCast   : Boolean, // defaults to true
  debug      : Boolean, // defaults to false
});

connection.connect(function(err) {
  // connected! (unless `err` is set)
});

