
var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'me',
  password: 'secret',
  database: 'users'
});
connection.connect();

connection.query('SELECT now()', function(err, rows) {
  if (err) throw err;

  console.log('The current time is: ', rows[0].solution);
});


var ObjectID = require('mongodb').ObjectID;

  var idString = '4e4e1638c85e808431000003';
  collection.findOne({_id: new ObjectID(idString)}, console.log)  // ok
  collection.findOne({_id: idString}, console.log)  // wrong! callback gets undefined

  // Fetch the library
  var mongo = require('mongodb');
  // Create new instances of BSON types
  new mongo.Long(numberString)
  new mongo.ObjectID(hexString)
  new mongo.Timestamp()  // the actual unique number is generated on insert.
  new mongo.DBRef(collectionName, id, dbName)
  new mongo.Binary(buffer)  // takes a string or Buffer
  new mongo.Code(code, [context])
  new mongo.Symbol(string)
  new mongo.MinKey()
  new mongo.MaxKey()
  new mongo.Double(number)	// Force double storage
  