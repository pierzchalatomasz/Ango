var express = require('express');
var router = express.Router();
var PostController = require('../modules/post-controller');
var MenuController = require('../modules/menu-controller');

/* GET home page. */
router.get('/', function(req, res, next) {
  PostController.getPostsFromDB(function() {
    MenuController.getMenuItemsFromDB(function() {
      res.render('index', { title: 'Express', posts: PostController.posts(), menuItems: MenuController.menuItems() });
    });
  });
});

module.exports = router;
