/* global angular */

var app = angular.module("MiniPostmanApp");

app.controller("MainCtrl", ["$scope","$http", function($scope, $http){
    console.log("Modular MainCtrl initialized!");
    var API = "/api/v1/students-andalucia";
    refresh();
        
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
    function refresh(){
        console.log("Requesting students to <"+ API +">...");
        $http.get(API).then(function(response){
            console.log("Data Received: " + JSON.stringify(response.data,null,2));
                
            $scope.students = response.data;
        });
    }
    
    //POST
    $scope.add = function(){
        var newStudent = $scope.newStudent;
                
        console.log("Adding a new student!"+ JSON.stringify(newStudent.data,null,2));
        $http
            .post(API,newStudent)
            .then(function(response){
                console.log("Response: " + response.status + " " +response.data);
                refresh();
            });
    }

    //DELETE        
    $scope.delete = function(city){
        console.log("Deleting student!"+ city);      
        
        $http
            .delete(API + "/" + city)
            .then(function(response){
                console.log("Delete response: " + response.status + " " + response.data);
                refresh();
            });
    
    }
    
    
}]);