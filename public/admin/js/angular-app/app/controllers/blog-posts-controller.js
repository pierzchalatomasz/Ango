(function() {

  var blogPostsController = angular.module('BlogPostsController', []);

  blogPostsController.controller('BlogPosts', ['$rootScope', '$http', 'blogPostsContainer', function($rootScope, $http, blogPostsContainer) {
    var instance = this;

    this.update = function() {
      $rootScope.$on('blogPostsDownloaded', function() {
        instance.posts = blogPostsContainer.posts;
      });
    };

    // Update posts on init
    this.update();
  }]);

})()
