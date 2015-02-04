var iphoneApp = angular.module('iphoneApp', [
  'ngRoute'
]);

iphoneApp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $locationProvider.html5Mode(true);

    $routeProvider.
      when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      }).
      when('/category/:category', {
        templateUrl: 'views/category.html',
        controller: 'CategoryCtrl'
      }).
      when('/article/:article', {
        templateUrl: 'views/article.html',
        controller: 'ArticleCtrl'
      }).
      otherwise({
        redirectTo: '/'
      });
}]);
