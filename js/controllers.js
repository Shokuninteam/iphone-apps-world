iphoneApp.controller('MainCtrl', ['$scope', 'requestService', function ($scope, requestService) {
	
	$scope.ok = "ok";

	$scope.init = function(){
		requestService.setBaseData();
	};

}]);

iphoneApp.controller('CategoryCtrl', ['$scope', '$routeParams', '$resource', function($scope, $routeParams, $resource) {
   
	$scope.init = function(){
		$scope.selectedCategory = $routeParams.category;
		var Categories = $resource('http://fake.co:3000/categories/:category/articles', {}, {});
		Categories.get({
			category : $routeParams.category
		}, function(data) {
			$scope.cat = data;
		});
	};

}]);

iphoneApp.controller('ArticleCtrl', ['$scope', '$routeParams', '$resource', '$rootScope', function($scope, $routeParams, $resource, $rootScope) {

	$scope.init = function(){

		var Article = $resource('http://fake.co:3000/articles/:article', {}, {});
		Article.get({
			article : $routeParams.article
		}, function(data) {
			$scope.article = data;
		});
	};

	$scope.getCategory = function(article){
		if(article){
			for (var i = 0; i < $rootScope.categories.length; i++) {
				if($rootScope.categories[i].id === article.category_id){
					return $rootScope.categories[i].name;
				}
			}
		}
	};

}]);

iphoneApp.controller('SearchCtrl', ['$scope', '$routeParams', function($scope, $routeParams) {
    
}]);

iphoneApp.controller('CategoriesCtrl', ['$scope', '$routeParams', function($scope, $routeParams) {
    
}]);

iphoneApp.service('requestService', ['$rootScope', '$http', '$resource',  function($rootScope, $http, $resource) {

    this.setBaseData = function() {
    	var Global = $resource('http://fake.co:3000/global', {});
    	if($rootScope.categories && $rootScope.top10 && $rootScope.articles){
    		return;
    	}
		Global.get({}, function(data) {
			setupDataDetails(data);
		  	$rootScope.categories = data.categories;
		  	$rootScope.top10 = data.top10;
		  	$rootScope.articles = data.articles;
		  	$rootScope.total = data.total;
		});
    };

    function setupDataDetails(data){
		for (var i = 0; i < data.top10.length; i++) {
			data.top10[i].category = getCategoryNameById(data, data.top10[i].category_id);
		}
		for (var j = 0; j < data.articles.length; j++) {
			data.articles[j].category = getCategoryNameById(data, data.articles[j].category_id);
		}
	}

	function getCategoryNameById(data, id){
		for (var i = 0; i < data.categories.length; i++) {
			if(data.categories[i].id === id){
				return data.categories[i].name;
			}
		}
	}
}]);