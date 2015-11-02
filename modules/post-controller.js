//
// Post Controller
//

var Post = require('./posts');
var fs = require('fs');
var LoopController = require('./loop');
var posts = [];

exports.getPostsFromDB = function(callback) {
  Post.find().sort({ date: -1 }).find(function (err, data) {
    if(err) throw err;
    posts = data;
    if(typeof(callback) != 'undefined') callback();
  });
};

exports.posts = function(raw) {
  if(typeof(raw) === 'undefined' || raw === true) {
    var postsCopy = [];
    posts.forEach(function(post) {
      postsCopy.push(new LoopController(post));
    });
    console.log('Look here ' + postsCopy);
    return postsCopy;
  }
  else {
    return posts;
  }
}

exports.delete = function(req, callback) {
  Post.findOneAndRemove({_id: req.body._id}, {
    title: req.body.title,
    content: req.body.content
  }, function(error, doc, result) {
    if(error) throw error;
    else callback();
  });
}

exports.update = function(req, callback) {
  var postObject = {
    title: req.body.title,
    content: req.body.content,
    slug: req.body.title.toLowerCase().replace(/[^a-z0-9\s]/g, '').replace(/\s/g, '-'),
    tags: req.body.tags.replace(/[,]\s/g, ',').split(','),
    thumbnail: req.body.thumbnail
  };
  Post.findOneAndUpdate({_id: req.body._id}, postObject, {upsert: true}, function(error, doc, result) {
    if(error) throw error;
    else callback();
  });
}

exports.createNew = function(req, callback) {
  var newPost = new Post;
  newPost.title = req.body.title;
  newPost.content = req.body.content;
  newPost.author = req.user.name;
  newPost.date = Date.now();
  newPost.slug = req.body.title.toLowerCase().replace(/[^a-z0-9\s]/g, '').replace(/\s/g, '-');
  newPost.tags = req.body.tags.replace(/\s/g, '').split(',');
  newPost.save(function (err) {
    callback();
  });
}

exports.getPostBySlug = function(req, callback) {
  Post.findOne({ slug: req.params.slug }, function(err, post) {
    callback(new LoopController(post));
  });
}

exports.getPostsBy = function(postParams, callback) {
  var postsCopy = [];
  Post.find(postParams).sort({ date: -1 }).find(function(err, posts) {
    if(!err) {
      posts.forEach(function(post) {
        postsCopy.push(new LoopController(post));
      });
    }
    callback(postsCopy);
  });
}

exports.search = function(req, callback) {
  var instance = this,
      found = false,
      searchTerm = req.params.query,
      postsFound = [],
      cb = function(post) {
        postsFound.push(post);
        found = true;
      };

  this.getPostsFromDB(function() {
    instance.posts().forEach(function(post) {

      // Title and Content
      if(post.post.title.toLowerCase().indexOf(searchTerm) != -1 || post.post.content.toLowerCase().indexOf(searchTerm) != -1) {
        cb(post);
      }
      // Tags
      else {
        post.post.tags.forEach(function(tag) {
          if(tag.toLowerCase().indexOf(searchTerm) != -1) {
            cb(post);
          }
        });
      }
    });

    callback(postsFound);
  });
}
