var resizeCrop = require('resize-crop');

module.exports = function(imagePath, callback) {

  var fileName = imagePath.slice(imagePath.lastIndexOf('\\') + 1, imagePath.length)
  fileName = fileName.slice(0, fileName.lastIndexOf('.'));
  var fileExt = imagePath.slice(imagePath.lastIndexOf('.') + 1, imagePath.length);

  resizeCrop({
    format: fileExt,
    src: './' + imagePath,
    dest: './public/uploads/thumbnails/' + fileName + '-resized.' + fileExt,
    height: 250,
    width: 250,
    gravity: "center"
  }, function(err) {
    if(err) throw err;
    callback();
  });

}
