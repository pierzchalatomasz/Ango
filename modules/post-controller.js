//
// Post Controller
//

var Post = require('./posts');
var posts = [];

exports.getPostsFromDB = function(callback) {
  Post.find(function (err, data) {
    if(err) {
      return console.error(err);
    }
    console.log('I got this from DB: ' + data);
    posts = data;
    if(typeof(callback) != 'undefined') {
      callback();
    }
  });
}

exports.posts = function() {
  return posts;
}

exports.delete = function(req, callback) {
  Post.findOneAndRemove({_id: req.body._id}, {
    title: req.body.title,
    content: req.body.content
  }, function(error, doc, result) {
    if(error) {
      console.log('Error');
    }
    else {
      console.log('Removed!!!!');
      callback();
    }
  });
}

exports.update = function(req, callback) {
  Post.findOneAndUpdate({_id: req.body._id}, {
    title: req.body.title,
    content: req.body.content
  }, {upsert: true}, function(error, doc, result) {
    if(error) {
      console.log('Error');
    }
    else {
      console.log('Updated');
      callback();
    }
  });
}

exports.createNew = function(req, callback) {
  var newPost = new Post;
  newPost.title = req.body.title;
  newPost.content = req.body.content;
  newPost.author = 'Admin';
  newPost.date = Date.now();
  newPost.save(function (err) {
    callback();
  });
}
