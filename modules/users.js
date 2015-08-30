var mongoose = require('mongoose');

var User = mongoose.model('User', {
  username: String,
  password: String,
  email: String
});

module.exports = User;
