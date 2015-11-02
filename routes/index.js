var express = require('express');
var router = express.Router();
var PostController = require('../modules/post-controller');
var MenuController = require('../modules/menu-controller');
var Loop = require('../modules/loop.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  PostController.getPostsFromDB(function() {
    MenuController.getMenuItemsFromDB(function() {
      res.render('blog', {
        title: 'Blog Page',
        subtitle: 'Our latest blog posts. Keep in touch with us!',
        posts: PostController.posts(),
        menuItems: MenuController.menuItems(),
        urlPrefix: ''
      });
    });
  });
});

// Display Single Post
router.get('/post/:slug', function(req, res) {
  PostController.getPostBySlug(req, function(post) {
    MenuController.getMenuItemsFromDB(function() {
      res.render('single-post', {
        post: post,
        menuItems: MenuController.menuItems(),
        urlPrefix: '../../'
      });
    });
  });
});

router.get('/post', function(req, res) {
  res.redirect('/');
});

// Display Search Results
router.post('/search', function(req, res) {
  res.redirect('/search/' + req.body.search);
});

router.get('/search/:query', function(req, res) {
  PostController.search(req, function(posts) {
    var subtitle;

    if(posts.length) subtitle = 'We are presenting search results for \'' + req.params.query + '\' ( ' + posts.length + ' )';
    else subtitle = 'There are no posts matching your query \'' + req.params.query + '\'';

    res.render('blog', {
      title: 'Search',
      subtitle: subtitle,
      posts: posts,
      menuItems: MenuController.menuItems(),
      urlPrefix: '../../'
    });
  });
});

// Display Post By Tag
router.get('/tag/:tag', function(req, res) {
  PostController.getPostsBy({
    tags: { $in: [req.params.tag] }
  }, function(posts) {
    res.render('blog', {
      title: 'Blog Page',
      subtitle: 'We are presenting results for \'' + req.params.tag + '\' tag',
      posts: posts,
      menuItems: MenuController.menuItems(),
      urlPrefix: '../../'
    });
  });
});

// Display Post By Tag
router.get('/author/:author', function(req, res) {
  PostController.getPostsBy({
    author: req.params.author
  }, function(posts) {
    res.render('blog', {
      title: 'Posts by ' + req.params.author,
      subtitle: 'We are presenting posts written by ' + req.params.author,
      posts: posts,
      menuItems: MenuController.menuItems(),
      urlPrefix: '../../'
    });
  });
});

module.exports = router;
