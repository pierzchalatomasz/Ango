//
// Menu Item Schema
//

var mongoose = require('mongoose');

var MenuItem = mongoose.model('MenuItem', {
  title: String
});

module.exports = MenuItem;
