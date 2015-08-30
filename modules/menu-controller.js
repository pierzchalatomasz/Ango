//
// Menu Controller
//

var MenuItemsSchema = require('./menu-items');
var menuItems;

exports.menuItems = function() {
  return menuItems;
}

exports.getMenuItemsFromDB = function(callback) {
  MenuItemsSchema.find(function (err, data) {
    if (err) return console.error(err);
    console.log(data);
    menuItems = data;
    if(typeof(callback) != 'undefined') {
      callback();
    }
  });
}
