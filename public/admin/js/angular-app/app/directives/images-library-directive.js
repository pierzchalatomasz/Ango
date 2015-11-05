(function() {

  var imagesLibraryDirective = angular.module('imagesLibraryDirective', []);

  imagesLibraryDirective.directive('imagesLibrary', function() {
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

})()
