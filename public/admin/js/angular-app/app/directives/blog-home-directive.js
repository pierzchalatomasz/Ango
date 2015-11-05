(function() {

  var blogHomeDirective = angular.module('blogHomeDirective', []);

  blogHomeDirective.directive('blogHome', function() {
    return {
      restrict: 'E',
      templateUrl: '../admin/blog-home.html'
    }
  });

})()
