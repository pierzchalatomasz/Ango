(function() {

  // Angular Ango Admin Dashboard

  var dependencies = [
    // Controllers
    'BlogInfoController', 'NavController', 'BlogPostsController',
    // Services
    'blogPostsContainer', 'multipartForm',
    // Directives
    'blogHomeDirective', 'blogPostsDirective', 'blogSettingsDirective', 'fileModelDirective', 'imagesLibraryDirective', 'userSettingsDirective',
    // External
    'ui.tinymce'
  ];

  var app = angular.module('BlogAdmin', dependencies);

  app.config(function($locationProvider) {
    // $locationProvider.html5Mode(true);
  });

})()
