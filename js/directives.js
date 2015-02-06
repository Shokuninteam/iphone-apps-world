iphoneApp.directive('myNavbar', function() {
  return {
    templateUrl: 'views/directives/mynavbar.html'
  };
})

.directive('myHeader', function() {
  return {
    templateUrl: 'views/directives/myheader.html'
  };
})

.directive('topTen', function() {
  return {
    templateUrl: 'views/directives/topten.html'
  };
})

.directive('categories', function() {
  return {
    templateUrl: 'views/directives/categories.html'
  };
})

.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.ngEnter);
                });
                event.preventDefault();
            }
        });
    };
});