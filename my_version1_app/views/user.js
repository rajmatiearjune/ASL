//creating mongoose schema
var mongoose = require('mongoose');
var Scheme = mongoose.Scheme;

var UserSchema = new Scheme({
	firstName: String,
	lastName: String,
	email: String,
	userName: String,
	passwordHash: String,
	passwordSalt: String

});

module.exports = mongoose.model('User', UserSchema);
