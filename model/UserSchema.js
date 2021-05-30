var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    about:String,

});
// mongoose.model('RegisterUser',UserSchema);
module.exports = mongoose.model('Users',UserSchema);

