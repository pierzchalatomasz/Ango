var express = require('express');
var router = express.Router();
var PostController = require('../modules/post-controller');

/* GET admin page. */
router.get('/', function(req, res, next) {
  PostController.getPostsFromDB(function() {
    res.render('./admin/index', { title: 'Express' });
  });
});

router.get('/get-posts', function(req, res, next) {
  PostController.getPostsFromDB(function() {
    res.json(PostController.posts());
  });
});

router.post('/delete-post', function(req, res, next) {
  PostController.delete(req, function() {
    res.json({saved: 'true', date: Date.now()});
    PostController.getPostsFromDB();
  });
});

router.post('/save-post', function(req, res, next) {
  if(typeof(req.body._id) != 'undefined') {
    PostController.update(req, function() {
      res.json({saved: 'true', date: Date.now()});
    });
  }
  else {
    PostController.createNew(req, function() {
      res.json({saved: 'true', date: Date.now()});
    });
  }
  PostController.getPostsFromDB();
});

module.exports = router;
