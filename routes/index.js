var express = require('express');
var router = express.Router();
var PostController = require('../modules/post-controller');
var MenuController = require('../modules/menu-controller');

/* GET home page. */
router.get('/', function(req, res, next) {
  PostController.getPostsFromDB(function() {
    MenuController.getMenuItemsFromDB(function() {
      res.render('blog', { title: 'Express', posts: PostController.posts(), menuItems: MenuController.menuItems() });
    });
  });
});

// Display Single Post
router.get('/post/:id', function(req, res) {
  var date = new Date(1439111111111);
  res.render('single-post', { postId: req.params.id });
  //res.send(req.params.id + '; Date: ' + date.getFullYear() + ' / ' + date.getMonth() + ' / ' + date.getDate());
});

// Display Search Results
router.post('/search', function(req, res) {
  res.redirect('/search/' + req.body.search);
});

router.get('/search/:query', function(req, res) {
  res.send(req.params.query);
});

module.exports = router;
