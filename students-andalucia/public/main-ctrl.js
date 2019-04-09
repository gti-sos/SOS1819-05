var app = angular.module("MiniPostmanApp");

app.controller("MainCtrl", ["$scope","$http", function($scope, $http){
    console.log("Modular MainCtrl initialized!");
    $scope.url = "https://sos1819-05.herokuapp.com/api/v1/students-andalucia";
                
    $scope.send = function(){
        $http.get($scope.url).then(function(response){
            $scope.data = JSON.stringify(response.data,null,2); 
            $scope.estado=response.status;
        });
    };
    
    //POST
    $scope.city = null;
    $scope.year = null;
    $scope.eso = null;
    $scope.high = null;
    $scope.vocational= null;
    
    //post textarea
    $scope.postdata = function(city, year, eso, high, vocational) {
        $http.post($scope.url, JSON.parse($scope.data)).then(function(response) {
            $scope.estado = response.status;
		});
      };
    
    
    //POST
    $scope.postdataform = function(city,year,eso,high,vocational){
        var dato = {
            "city": city,
            "year": year,
            "eso": eso,
            "high": high,
            "vocational": vocational
        };  
        $http.post($scope.url, JSON.stringify(dato)).then(function(response) {
            $scope.estado = response.status;
		});
    };
    
    //PUT
    $scope.putdataform = function(city, year, eso, high, vocational) {
         
        $http.put($scope.url, JSON.parse($scope.data)).then(function(response) {
            $scope.estado = response.status;
        });
    };
      
    //DELETE
    $scope.deletedata = function(city, year, eso, high, vocational) {
        var dato = {
            "city": city,
            "year": year,
            "eso": eso,
            "high": high,
            "vocational": vocational
        };
        
        $http.delete($scope.url, JSON.stringify(dato)).then(function(response) {
            $scope.estado = response.status;
        });
    };
      
    //loadInitialData
    $scope.loadData = function() {
          
        $http.get($scope.url, JSON.stringify($scope.data)).then(function(response) {
            $scope.estado = response.status;
        });
    };
    
    
    
}]);