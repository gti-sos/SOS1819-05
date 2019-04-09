var app = angular.module("MiniPostmanApp");

app.controller("MainCtrl", ["$scope","$http", function($scope, $http){
    console.log("Modular MainCtrl initialized!");
    $scope.url = "api/v1/students-andalucia";
                
    $scope.send = function(){
        $http.get($scope.url).then(function(response){
            $scope.data = JSON.stringify(response.data,null,2); 
        });
    }
}]);