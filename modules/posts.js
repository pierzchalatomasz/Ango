var mongoose = require('mongoose');

var Post = mongoose.model('Post', {
  title: String,
  content: String,
  author: String,
  date: Number
});

module.exports = Post;
