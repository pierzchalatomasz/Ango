(function() {

  // Blog Posts Service
  var blogPostsContainer = angular.module('blogPostsContainer', []);

  blogPostsContainer.service('blogPostsContainer', ['$rootScope', '$http', function($rootScope, $http) {
    var instance = this;
    this.posts = [];

    $http.get('/admin/get-posts').then(function(res) {
      instance.posts = res.data;
      $rootScope.$emit('blogPostsDownloaded');
    });
  }]);

})()
