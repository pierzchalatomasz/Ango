var express = require('express');
var router = express.Router();
var fs = require('fs');
var multer = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname.substr(0, file.originalname.lastIndexOf('.')) + '-' + Date.now() + file.originalname.substr(file.originalname.lastIndexOf('.'), file.originalname.length))
  }
});
var upload = multer({ storage: storage });
var ImageResize = require('node-image-resize');
var PostController = require('../modules/post-controller');
var User = require('../modules/users.js');

var passport = require('passport');

var thumbnailResizer = require('../modules/thumbnail-resizer')

/* GET admin page. */
router.get('/', function(req, res, next) {
  PostController.getPostsFromDB(function() {
    if(req.isAuthenticated()) {
      res.render('./admin/index', { isAuthenticated: req.isAuthenticated(), user: req.user });
    }
    else {
      res.redirect('login');
    }
  });
});

router.post('/login', passport.authenticate('local'), function(req, res) {
  res.redirect('/admin');
});

router.get('/login', function(req, res) {
  res.render('admin/login');
});

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/admin');
});

router.get('/register', function(req, res) {
  res.render('admin/register');
});

router.post('/register', function(req, res) {
  var newUser = new User({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email
  });
  newUser.save(function(error) {
    if(error)
    console.log('Error registering new user!');
  })
  res.redirect('/admin/login');
});

router.get('/get-data', function(req, res) {
  PostController.getPostsFromDB(function() {
    var data = {
      title: 'Blog',
      subtitle: 'Subtitle goes here',
      username: req.user.name,
      newPosts: PostController.posts(false).length
    };
    res.json(data);
  });
});

router.get('/get-posts', function(req, res, next) {
  PostController.getPostsFromDB(function() {
    res.json(PostController.posts(false));
  });
});

router.post('/delete-post', function(req, res, next) {
  PostController.delete(req, function() {
    res.json({saved: 'true', date: Date.now()});
    PostController.getPostsFromDB();
  });
});

router.post('/save-post', upload.single('thumbnail'), function(req, res, next) {
  console.log('This is req: ' + req);
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

router.get('/get-available-images', function(req, res) {
  fs.readdir('./public/uploads', function(err, files) {
    var output = new Array();
    files.forEach(function(fileName) {
      var file = {
        fileName: '\\uploads\\' + fileName
      };
      output.push(file);
    });
    res.json(output);
  });
});

router.post('/upload-thumbnail', function(req, res) {
  upload.single('thumbnail')(req, res, function(err) {
    if(err) throw err;
    thumbnailResizer(req.file.path, function() {
      res.json({saved: 'true', date: Date.now()});
    });
  });
});

router.post('/delete-image', function(req, res) {
  fs.unlink('./public' + req.body.fileName, function(err) {
    if(err) throw err;
    else res.json({success: 'true', date: Date.now()});
  })
});

module.exports = router;
