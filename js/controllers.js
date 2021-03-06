iphoneApp.controller('MainCtrl', ['$scope', '$rootScope', 'requestService', '$resource', '$location', function ($scope, $rootScope, requestService, $resource, $location) {

	$scope.init = function(){
		$rootScope.globalTitle = "Iphone Apps World";
		$rootScope.globalDescription = "Get the most of your Iphone through our detailed reviews of Apple store's hidden jewels";
		requestService.setBaseData();
		$scope.page = 1;
	};

	$rootScope.enterSearch = function(search){
		$location.path('search/' + search);
	}

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
		$rootScope.globalTitle = "Apps category " + $routeParams.category;
		$rootScope.globalDescription = "Discover our latest reviews of Iphone applications in the " +$routeParams.category+ " category.";
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
		$rootScope.globalTitle = $routeParams.article + " iphone app review";
		$rootScope.globalDescription = "Indepth review of the " + $routeParams.article + " Iphone app";
		var Article = $resource('http://fake.co:3000/articles/:article', {}, {});
		Article.get({
			article : $routeParams.article
		}, function(data) {
			var baseRoute = "http://fake.co:3000/";
			data.image[0] = baseRoute + data.image[0];
			$scope.bundle = {
				article: data.article,
				cons: data.cons,
				pros: data.pros,
				image: data.image
			};
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

iphoneApp.controller('SearchCtrl', ['$scope', '$rootScope', '$routeParams', '$resource', function($scope, $rootScope, $routeParams, $resource) {
    
	$scope.init = function(){
		$scope.value = $routeParams.value;
		$rootScope.globalTitle = "Search apps " + $scope.value;
		$rootScope.globalDescription = "Search every Iphone app's review containing the string " + $scope.value;
		$scope.page = 1;		
		var Search = $resource('http://fake.co:3000/articles/search/:value', {}, {});
		Search.get({
			value : $scope.value
		}, function(data) {
			var baseRoute = "http://fake.co:3000/";
			for (var i = 0; i < data.articles.length; i++) {
				data.articles[i].url = baseRoute + data.articles[i].url;
			};
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

iphoneApp.controller('CategoriesCtrl', ['$scope', '$rootScope', '$routeParams', function($scope, $rootScope, $routeParams) {
	$rootScope.globalTitle = "Iphone apps categories";
	$rootScope.globalDescription = "Pick an Iphone apps category to discover hidden jewels of the Apple store.";
}]);

iphoneApp.controller('SeekCtrl', ['$scope', '$rootScope', '$routeParams', function($scope, $rootScope, $routeParams) {
    $rootScope.globalTitle = "Search iphone apps";
    $rootScope.globalDescription = "Search for a specific review of Iphone apps.";
}]);

iphoneApp.service('requestService', ['$rootScope', '$http', '$resource',  function($rootScope, $http, $resource) {

    this.setBaseData = function() {
    	var Global = $resource('http://fake.co:3000/global', {});
    	if($rootScope.categories && $rootScope.top10 && $rootScope.articles){
    		return;
    	}
		Global.get({}, function(data) {
			setupDataDetails(data);
		  	$rootScope.main = {
		  		categories : data.categories,
		  		macro : data.macro,
		  		top10 : data.top10,
		  		total : data.total
		  	};
		});
    };

    function setupDataDetails(data){
		var serverBaseRoute = "http://fake.co:3000/";
		for (var i = 0; i < data.top10.length; i++) {
			data.top10[i].app.category = getCategoryNameById(data, data.top10[i].app.category_id);
			data.top10[i].url = serverBaseRoute + data.top10[i].url;
		}
		for (var j = 0; j < data.macro.length; j++) {
			data.macro[j].app.category = getCategoryNameById(data, data.macro[j].app.ategory_id);
			data.macro[j].url = serverBaseRoute + data.macro[j].url;
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