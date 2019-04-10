var app = angular.module("MiniPostmanApp");

app.controller("MainCtrl", ["$scope","$http", function($scope, $http){
    console.log("Modular MainCtrl initialized!");
    $scope.url = "https://sos1819-05.herokuapp.com/api/v1/libraries-stats";
                
    $scope.send = function(){
        $http.get($scope.url).then(function(response){
            $scope.data = JSON.stringify(response.data,null,2); 
            $scope.estado=response.status;
        });
    };
    
    //POST
    $scope.city = null;
    $scope.year = null;
    $scope.number = null;
    $scope.activities = null;
    $scope.service= null;
    
    //post textarea
    $scope.postdata = function(city, year, number, activities, service) {
        $http.post($scope.url, JSON.parse($scope.data)).then(function(response) {
            $scope.estado = response.status;
		});
      };
    
    
    //POST
    $scope.postdataform = function(city, year, number, activities, service){
        var dato = {
            "city": city,
            "year": year,
            "number": number,
            "activities": activities,
            "service": service
        };  
        $http.post($scope.url, JSON.stringify(dato)).then(function(response) {
            $scope.estado = response.status;
		});
    };
    
    //PUT
    $scope.putdataform = function(city, year, number, activities, service) {
         
        $http.put($scope.url, JSON.parse($scope.data)).then(function(response) {
            $scope.estado = response.status;
        });
    };
      
    //DELETE
    $scope.deletedata = function(city, year, number, activities, service) {
        var dato = {
           "city": city,
            "year": year,
            "number": number,
            "activities": activities,
            "service": service
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