/* global angular */

var app = angular.module("MiniPostmanApp");

app.controller("MainCtrl", ["$scope","$http", function($scope, $http){
    console.log("Modular MainCtrl initialized!");
    $scope.url = "https://sos1819-05.herokuapp.com/api/v1/students-andalucia/";
        
    //LoadInitialData
    $scope.loadInitialData = function (){
        $http.get($scope.url + "loadInitialData").then(function (response){
            $scope.data = JSON.stringify(response.data,null,2);
            $scope.statusInfo = JSON.stringify(response.status, null, 2);
        }).catch(function (response) {
		   	$scope.statusInfo = JSON.stringify(response.status, null, 2);
		});
    };
         
    //GET       
    $scope.get = function(){
        $http.get($scope.url).then(function(response){
            $scope.status = response.status;
            $scope.data = JSON.stringify(response.data,null,2);
        }, function (error){
            $scope.status = error.status;
            $scope.data = "";
        });
    };

    //POST
    $scope.post = function(){
        $http.post($scope.url,$scope.data).then(function(response){
            $scope.status = response.status;
            $scope.data = "";
        }, function (error){
            $scope.status = error.status;
            $scope.data = "";
        });
    };
      
    //PUT            
    $scope.put = function(){
        $http.put($scope.url,$scope.data).then(function(response){
            $scope.status = response.status;
            $scope.data = "";
        }, function (error){
            $scope.status = error.status;
            $scope.data = "";
        });
    };
         
    //DELETE        
    $scope.delete = function(){
        $http.delete($scope.url).then(function(response){
            $scope.status = response.status;
            $scope.data = "";
        }, function (error){
            $scope.status = error.status;
            $scope.data = "";
        });
    };
    
    
}]);