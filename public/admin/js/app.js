(function() {
  var app = angular.module('BlogAdmin', ['ui.tinymce']);

  app.controller('BlogInfo', ['$http', function($http) {
    var blogInfo = this;
    $http.get('/admin/get-data').then(function(res) {
      blogInfo.info = res.data;
    });
  }]);

  app.controller('BlogPosts', ['$http', function($http) {
    var postCtrlInstance = this;
    this.update = function() {
      $http.get('/admin/get-posts').then(function(res) {
        postCtrlInstance.posts = res.data;
      });
    };
    this.update();
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
      controller: function($http, multipartForm) {
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
        // Get available images on init
        this.getAvailableImages();
      },
      controllerAs: 'posts'
    }
  });

  app.directive('imagesLibrary', function() {
    return {
      restrict: 'E',
      templateUrl: '../admin/blog-images-library.html',
      controller: function($http, multipartForm) {
        var instance = this;
        this.getAvailableImages = function() {
          $http.get('/admin/get-available-images').then(function(response) {
            instance.availableImages = response.data;
            console.log(instance.availableImages);
          });
        };
        this.deleteImage = function(image) {
          $http.post('/admin/delete-image', image).then(function(response) {
            if(response.data.success) {
              console.log('Deleted image!');
              instance.getAvailableImages();
            }
          });
        };
        this.uploadImage = function() {
          multipartForm.post('/admin/upload-thumbnail', this.thumbnailFile).then(function(response) {
            if(response.data.saved) {
              console.log('Uploaded!');
              instance.getAvailableImages();
            }
          });
        };
        // Get available images on init
        this.getAvailableImages();
      },
      controllerAs: 'imagesLibrary'
    }
  });

  app.directive('blogSettings', function() {
    return {
      restrict: 'E',
      templateUrl: '../admin/blog-settings.html'
    };
  });

  app.directive('userSettings', function() {
    return {
      restrict: 'E',
      templateUrl: '../admin/user-settings.html'
    };
  });

  // File uploads
  app.directive('fileModel', ['$parse', function($parse) {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
        var model = $parse(attrs.fileModel);
        var modelSetter = model.assign;

        element.bind('change', function() {
          scope.$apply(function() {
            modelSetter(scope, element[0].files[0]);
          });
        });
      }
    }
  }]);

  // Multipart Form
  app.service('multipartForm', ['$http', function($http) {
    this.post = function(uploadUrl, data) {
      var fd = new FormData();
      for(var key in data)
        fd.append(key, data[key]);
      return $http.post(uploadUrl, fd, {
        transformRequest: angular.identity,
        headers: { 'Content-Type' : undefined }
      });
    };
  }]);

  // Dummy Data

  var blogInfo = {
    title: 'Blog',
    subtitle: 'My personal blog'
  };

})()
