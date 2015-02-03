var iphoneApp = angular.module('iphoneApp', [
  'ngRoute'
]);

iphoneApp.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      }).
      when('/category/:category', {
        templateUrl: 'views/category.html',
        controller: 'CategoryCtrl'
      }).
      otherwise({
        redirectTo: '/'
      });
}]);