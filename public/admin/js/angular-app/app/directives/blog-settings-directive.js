(function() {

  var blogSettingsDirective = angular.module('blogSettingsDirective', []);

  blogSettingsDirective.directive('blogSettings', function() {
    return {
      restrict: 'E',
      templateUrl: '../admin/blog-settings.html'
    };
  });

})()
