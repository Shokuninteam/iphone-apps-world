iphoneApp.controller('MainCtrl', ['$scope', '$rootScope', 'requestService', '$resource', function ($scope, $rootScope, requestService, $resource) {

	$scope.init = function(){
		requestService.setBaseData();
		$scope.page = 1;
	};

	$rootScope.$watch('main', function(newValue, oldValue) {
		if($rootScope.main){
			setupPagination($rootScope.main.total);
		}		
	});

	function setupPagination(total){
		$scope.paginator = [];
		var indice = 0;
		for (var i = 0; i < total / 10; i++) {
			var selected = $scope.page === i + 1 ? 'active' : '';
			if($scope.page === i + 1){
				indice = i;
			}
			$scope.paginator.push({
				number : i + 1,
				selected : selected
			});
		}
		
		while($scope.paginator.length > 5){
			var frontDiff = indice - $scope.paginator[0].number;
			var backDiff = $scope.paginator[$scope.paginator.length - 1].number - indice;
			if (frontDiff > backDiff){
				$scope.paginator.splice(0, 1);
				indice++;
			} else {
				$scope.paginator.splice($scope.paginator.length - 1, 1);
				indice--;
			}
		}
		
	}

	$scope.previous = function(){
		if($scope.page > 1){
			var Article = $resource('http://fake.co:3000/articles/set/:page', {}, {
				'query':  {method:'GET', isArray:true},
			});
			Article.query({
				page : --$scope.page
			}, function(data) {
				$scope.main.articles = data;
				setupPagination($rootScope.main.total);
			});
		}
		
	};

	$scope.next = function(){
		if($scope.page < $scope.paginator[$scope.paginator.length - 1].number){
			var Article = $resource('http://fake.co:3000/articles/set/:page', {}, {
				'query':  {method:'GET', isArray:true},
			});
			Article.query({
				page : ++$scope.page
			}, function(data) {
				$scope.main.articles = data;
				setupPagination($rootScope.main.total);
			});
		}
	};

	$scope.goToPage = function(page){
		$scope.page = page.number;
		var Article = $resource('http://fake.co:3000/articles/set/:page', {}, {
				'query':  {method:'GET', isArray:true},
			});
			Article.query({
				page : $scope.page
			}, function(data) {
				$scope.main.articles = data;
				setupPagination($rootScope.main.total);
			});
	};

}]);

iphoneApp.controller('CategoryCtrl', ['$scope', '$routeParams', '$resource', '$rootScope', function($scope, $routeParams, $resource, $rootScope) {
   
	$scope.init = function(){
		$scope.selectedCategory = $routeParams.category;
		$scope.page = 1;
		var Categories = $resource('http://fake.co:3000/categories/:category/articles', {}, {});
		Categories.get({
			category : $routeParams.category
		}, function(data) {
			$scope.cat = data;
		});
	};

	$scope.$watch('cat', function(newValue, oldValue) {
		if($scope.cat){
			setupPagination($scope.cat.total);
		}		
	});

	function setupPagination(total){
		$scope.paginator = [];
		var indice = 0;
		for (var i = 0; i < total / 10; i++) {
			var selected = $scope.page === i + 1 ? 'active' : '';
			if($scope.page === i + 1){
				indice = i;
			}
			$scope.paginator.push({
				number : i + 1,
				selected : selected
			});
		}
		
		while($scope.paginator.length > 5){
			var frontDiff = indice - $scope.paginator[0].number;
			var backDiff = $scope.paginator[$scope.paginator.length - 1].number - indice;
			if (frontDiff > backDiff){
				$scope.paginator.splice(0, 1);
				indice++;
			} else {
				$scope.paginator.splice($scope.paginator.length - 1, 1);
				indice--;
			}
		}
		
	}

	$scope.previous = function(){
		if($scope.page > 1){
			var Article = $resource('http://fake.co:3000/categories/:category/articles/set/:page', {}, {
				'query':  {method:'GET', isArray:true},
			});
			Article.query({
				category : $routeParams.category,
				page : --$scope.page
			}, function(data) {
				$scope.cat.articles = data;
				setupPagination($scope.cat.total);
			});
		}
		
	};

	$scope.next = function(){
		if($scope.page < $scope.paginator[$scope.paginator.length - 1].number){
			var Article = $resource('http://fake.co:3000/categories/:category/articles/set/:page', {}, {
				'query':  {method:'GET', isArray:true},
			});
			Article.query({
				category : $routeParams.category,
				page : ++$scope.page
			}, function(data) {
				$scope.cat.articles = data;
				setupPagination($scope.cat.total);
			});
		}
	};

	$scope.goToPage = function(page){
		$scope.page = page.number;
		var Article = $resource('http://fake.co:3000/categories/:category/articles/set/:page', {}, {
				'query':  {method:'GET', isArray:true},
			});
			Article.query({
				category : $routeParams.category,
				page : $scope.page
			}, function(data) {
				$scope.cat.articles = data;
				setupPagination($scope.cat.total);
			});
	};

}]);

iphoneApp.controller('ArticleCtrl', ['$scope', '$routeParams', '$resource', '$rootScope', function($scope, $routeParams, $resource, $rootScope) {

	$scope.init = function(){

		var Article = $resource('http://fake.co:3000/articles/:article', {}, {});
		Article.get({
			article : $routeParams.article
		}, function(data) {
			$scope.bundle = data;
		});
	};

	$scope.getCategory = function(article){
		if(article){
			for (var i = 0; i < $rootScope.main.categories.length; i++) {
				if($rootScope.main.categories[i].id === article.category_id){
					return $rootScope.main.categories[i].name;
				}
			}
		}
	};

}]);

iphoneApp.controller('SearchCtrl', ['$scope', '$routeParams', '$resource', function($scope, $routeParams, $resource) {
    
	$scope.init = function(){
		$scope.page = 1;
		$scope.value = $routeParams.value;
		var Search = $resource('http://fake.co:3000/articles/search/:value', {}, {});
		Search.get({
			value : $scope.value
		}, function(data) {
			$scope.search = data;
		});
	};

	$scope.$watch('search', function(newValue, oldValue) {
		if($scope.search){
			setupPagination($scope.search.total);
		}		
	});

	function setupPagination(total){
		$scope.paginator = [];
		var indice = 0;
		for (var i = 0; i < total / 10; i++) {
			var selected = $scope.page === i + 1 ? 'active' : '';
			if($scope.page === i + 1){
				indice = i;
			}
			$scope.paginator.push({
				number : i + 1,
				selected : selected
			});
		}
		
		while($scope.paginator.length > 5){
			var frontDiff = indice - $scope.paginator[0].number;
			var backDiff = $scope.paginator[$scope.paginator.length - 1].number - indice;
			if (frontDiff > backDiff){
				$scope.paginator.splice(0, 1);
				indice++;
			} else {
				$scope.paginator.splice($scope.paginator.length - 1, 1);
				indice--;
			}
		}
		
	}

	$scope.previous = function(){
		if($scope.page > 1){
			var Article = $resource('http://fake.co:3000/articles/search/:value/set/:page', {}, {
				'query':  {method:'GET', isArray:true},
			});
			Article.query({
				value : $scope.value,
				page : --$scope.page
			}, function(data) {
				$scope.search.articles = data;
				setupPagination($scope.search.total);
			});
		}
		
	};

	$scope.next = function(){
		if($scope.page < $scope.paginator[$scope.paginator.length - 1].number){
			var Article = $resource('http://fake.co:3000/articles/search/:value/set/:page', {}, {
				'query':  {method:'GET', isArray:true},
			});
			Article.query({
				value : $scope.value,
				page : ++$scope.page
			}, function(data) {
				$scope.search.articles = data;
				setupPagination($scope.search.total);
			});
		}
	};

	$scope.goToPage = function(page){
		$scope.page = page.number;
		var Article = $resource('http://fake.co:3000/articles/search/:value/set/:page', {}, {
				'query':  {method:'GET', isArray:true},
			});
			Article.query({
				value : $scope.value,
				page : $scope.page
			}, function(data) {
				$scope.search.articles = data;
				setupPagination($scope.search.total);
			});
	};

}]);

iphoneApp.controller('CategoriesCtrl', ['$scope', '$routeParams', function($scope, $routeParams) {
    
}]);

iphoneApp.controller('SeekCtrl', ['$scope', '$routeParams', function($scope, $routeParams) {
    
}]);

iphoneApp.service('requestService', ['$rootScope', '$http', '$resource',  function($rootScope, $http, $resource) {

    this.setBaseData = function() {
    	var Global = $resource('http://fake.co:3000/global', {});
    	if($rootScope.categories && $rootScope.top10 && $rootScope.articles){
    		return;
    	}
		Global.get({}, function(data) {
			setupDataDetails(data);
		  	$rootScope.main = data;
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