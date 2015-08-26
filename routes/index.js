var express = require('express');
var router = express.Router();
var Post = require('../modules/posts.js');
var MenuItems = require('../modules/menu-items.js');

// var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/angodb');
//
// var Post = mongoose.model('Post', {
//   title: String,
//   content: String,
//   author: String,
//   date: Number
// });
//
// /*var kitty = new Post({
//   title: 'Second Post',
//   content: 'Second post content.<h3>This is a blockquote</h3>. Ut quis enim pellentesque, consequat dui et, pulvinar nisl. In aliquam sit amet lectus vel suscipit. Aliquam venenatis mauris non odio faucibus faucibus. Vestibulum vulputate nulla sed sem rhoncus vestibulum. Curabitur justo neque, pulvinar nec mollis sit amet, pellentesque quis lorem.',
//   author: 'Sally',
//   date: 1439111111111
// });*/
// /*kitty.save(function (err) {
//   if (err) // ...
//   console.log('meow');
// });*/
//

var posts, menuItems;

function getPosts(callback) {
  Post.find(function (err, data) {
    if (err) return console.error(err);
    console.log(data);
    posts = data;
    callback();
  });
  MenuItems.find(function (err, data) {
    if (err) return console.error(err);
    console.log(data);
    menuItems = data;
  });
}

/* GET home page. */
router.get('/', function(req, res, next) {
  getPosts(function() {
    res.render('index', { title: 'Express', posts: posts, menuItems: menuItems });
  });
});

module.exports = router;
