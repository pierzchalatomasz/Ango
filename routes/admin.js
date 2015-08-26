var express = require('express');
var router = express.Router();
var Post = require('../modules/posts.js');
var postOperations = require('../modules/post-operations');

/* GET admin page. */
router.get('/', function(req, res, next) {
  postOperations.getPosts(function() {
    res.render('./admin/index', { title: 'Express' });
  });
});

router.get('/get-posts', function(req, res, next) {
  postOperations.getPosts(function() {
    res.json(postOperations.posts());
  });
});

router.post('/delete-post', function(req, res, next) {
  postOperations.delete(req, function() {
    res.json({saved: 'true', date: Date.now()});
    postOperations.getPosts();
  });
});

router.post('/save-post', function(req, res, next) {
  if(typeof(req.body._id) != 'undefined') {
    postOperations.update(req, function() {
      res.json({saved: 'true', date: Date.now()});
    });
  }
  else {
    postOperations.createNew(req, function() {
      res.json({saved: 'true', date: Date.now()});
    });
  }
  postOperations.getPosts();
});

module.exports = router;
