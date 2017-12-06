var Mongoose = require('mongoose'),
Schema = Mongoose.Schema,
Bcrypt = require('bcryptjs');

var UserSchema = new Schema({
    "firstName": { "type": String, "required": true },
    "lastName": { "type": String, "required": true },
    "status": { "type": Boolean, "default": true },
    "email": { "type": String, "unique": true, "password": true },
    "password": { "type": String, "required": true },
    "dateRegistered": { "type": String, "required": true }
});

module.exports = Mongoose.model('User', UserSchema);