Post = function(postRef) {
  this.post = postRef;
};

Post.prototype = {
  title: function() {
    return this.post.title;
  },
  content: function() {
    return this.post.content;
  },
  author: function() {
    return this.post.author;
  },
  date: function() {
    var date = new Date();
    return date.getDate() + ' ' + date.getMonthName() + ' ' + date.getFullYear();
  },
  tags: function() {
    var tag, tags = '';
    for(var i = 0; i < this.post.tags.length; i++) {
      tag = this.post.tags[i];
      tags += '<a href="/tag/' + tag + '">';
      tags += tag;
      tags += '</a>';
      if(i < this.post.tags.length - 1)
        tags += ', ';
    }
    return tags;
  },
  thumbnail: function() {
    return this.post.thumbnail;
  },
  slug: function() {
    return this.post.slug;
  }
};

module.exports = Post;

/*
** Get Month Name
*/
Date.prototype.getMonthName = function() {
  var months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];
  return months[this.getMonth() - 1];
};
