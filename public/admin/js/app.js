(function() {
  var app = angular.module('BlogAdmin', []);

  app.controller('BlogInfo', function() {
    this.info = blogInfo;
  });

  app.controller('BlogPosts', ['$http', function($http) {
    var postCtrlInstance = this;

    $http.get('/admin/get-posts').then(function(res) {
      postCtrlInstance.posts = res.data;
    });
  }]);

  app.controller('NavController', function() {
    this.active = 'home';
    this.activate = function(item) {
      this.active = item;
    };
    this.show = function(item) {
      if(this.active === item)
        return true;
      return false;
    };
  });

  app.directive('blogHome', function() {
    return {
      restrict: 'E',
      templateUrl: '../admin/blog-home.html'
    }
  });

  app.directive('blogPosts', function() {
    return {
      restrict: 'E',
      templateUrl: '../admin/blog-posts.html',
      controller: function($http) {
        var instance = this;
        this.editing = false;
        this.startEditing = function(post) {
          this.editing = true;
          this.currentPost = post;
          this.currentPost.savedOn = 0;
        };
        this.stopEditing = function() {
          this.editing = false;
        };
        this.save = function() {
          console.log(this.currentPost);
          $http.post('/admin/save-post', this.currentPost).then(function(response) {
            if(response.data.saved)
            instance.currentPost.savedOn = response.data.date;
          });
        };
        this.createNew = function() {
          instance.currentPost = {};
          console.log(instance.currentPost);
          instance.editing = true;
        };
        this.delete = function(post) {
          $http.post('/admin/delete-post', post).then(function(response) {
            //if(response.data.saved)
            //instance.currentPost.savedOn = response.data.date;
          });
        };
      },
      controllerAs: 'posts'
    }
  });

  app.directive('blogSettings', function() {
    return {
      restrict: 'E',
      templateUrl: '../admin/blog-settings.html'
    };
  });

  // Dummy Data

  var blogInfo = {
    title: 'Blog',
    subtitle: 'My personal blog'
  };
/*
  var posts = [
    {
      title: 'First Post',
      date: 1439215543081,
      author: 'John',
      content: 'First post content. Curabitur dictum, purus eu pulvinar maximus, leo nunc gravida ex, in elementum ante nisi at arcu. Donec auctor ipsum ex, vehicula pretium erat congue non. Proin eu venenatis erat, quis semper leo. Nunc ex ante, interdum nec magna quis, ornare consequat nunc. Phasellus rhoncus, ante id pharetra gravida, orci est eleifend augue, in laoreet nisi ligula id nisi. Quisque aliquam malesuada justo, ut tincidunt nibh.'
    },
    {
      title: 'Second Post',
      date: 1439111111111,
      author: 'Sally',
      content: 'Second post content.<h3>This is a blockquote</h3>. Ut quis enim pellentesque, consequat dui et, pulvinar nisl. In aliquam sit amet lectus vel suscipit. Aliquam venenatis mauris non odio faucibus faucibus. Vestibulum vulputate nulla sed sem rhoncus vestibulum. Curabitur justo neque, pulvinar nec mollis sit amet, pellentesque quis lorem.'
    },
  ];*/
})()
