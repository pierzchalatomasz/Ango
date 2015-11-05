(function() {

  var userSettingsDirective = angular.module('userSettingsDirective', []);

  userSettingsDirective.directive('userSettings', function() {
    return {
      restrict: 'E',
      templateUrl: '../admin/user-settings.html'
    };
  });

})()
