(function() {

  var blogPostsDirective = angular.module('blogPostsDirective', []);

  blogPostsDirective.directive('blogPosts', function() {
    return {
      restrict: 'E',
      templateUrl: '../admin/blog-posts.html',
      controller: function($scope, $rootScope, $http, multipartForm, $location, $filter, blogPostsContainer) {
        var instance = this;
        this.editing = false;

        this.startEditing = function(post) {
          this.editing = true;
          this.currentPost = post;
          this.currentPost.savedOn = 0;
          if(typeof($location.search().postID) === 'undefined')
            $location.search('postID', post._id)
        };

        this.stopEditing = function() {
          this.editing = false;
          $location.search('postID', null);
        };

        this.save = function() {
          console.log(this.currentPost);
          multipartForm.post('/admin/save-post', this.currentPost).then(function(response) {
            if(response.data.saved)
              instance.currentPost.savedOn = response.data.date;
            console.log(response);
          });
          // $http.post('/admin/save-post', this.currentPost).then(function(response) {
          //   if(response.data.saved)
          //   instance.currentPost.savedOn = response.data.date;
          // });
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

        this.getAvailableImages = function() {
          $http.get('/admin/get-available-images').then(function(response) {
            instance.availableImages = response.data;
          });
        };

        this.uploadThumbnail = function() {
          console.log(this.currentPost.thumbnailFile);
          multipartForm.post('/admin/upload-thumbnail', this.currentPost.thumbnailFile).then(function(response) {
            if(response.data.saved) {
              console.log('Uploaded!');
              instance.getAvailableImages();
            }
          });
        };

        $scope.$on('$locationChangeSuccess', function() {
          if($location.path() === '/posts' && typeof($location.search().postID) === 'undefined')
            // instance.startEditing(blogPostsContainer.posts);
          instance.stopEditing();
        });

        this.init = function() {
          // Get available images on init
          instance.getAvailableImages();
          $rootScope.$on('blogPostsDownloaded', function() {
            if($location.search() && $location.search().postID)
              instance.startEditing($filter('filter')(blogPostsContainer.posts, { _id: $location.search().postID })[0]);
          });
        };

        this.init();
      },
      controllerAs: 'posts'
    }
  });

})()
