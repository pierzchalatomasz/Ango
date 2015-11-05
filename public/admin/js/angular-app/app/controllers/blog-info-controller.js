(function() {

  var blogInfoController = angular.module('BlogInfoController', []);

  blogInfoController.controller('BlogInfo', ['$http', function($http) {
    var blogInfo = this;

    $http.get('/admin/get-data').then(function(res) {
      blogInfo.info = res.data;
    });
  }]);

})()
