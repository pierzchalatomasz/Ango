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
var thumbnailResizer = require('../../modules/thumbnail-resizer');


module.exports = function(router) {

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

}
