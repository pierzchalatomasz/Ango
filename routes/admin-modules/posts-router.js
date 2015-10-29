var PostController = require('../../modules/post-controller');
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

module.exports = function(router) {

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

}
