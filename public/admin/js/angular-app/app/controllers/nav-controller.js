(function() {

  var navController = angular.module('NavController', []);

  navController.controller('NavController', ['$scope', '$location', function($scope, $location) {
    var instance = this;

    this.init = function() {
      if($location.path()) this.activate($location.path().slice(1), false);
      else this.activate('home');
    };

    this.activate = function(item, clearReqParams) {
      this.active = item;
      $location.path(item);

      if(typeof(clearReqParams) === 'undefined') var clearReqParams = true;

      // Clear all req params
      if(clearReqParams)
        for(var key in $location.search())
          $location.search(key, $location.search().key);
    };

    this.show = function(item) {
      if(this.active === item)
        return true;
      return false;
    };

    this.init();
  }]);

})()
