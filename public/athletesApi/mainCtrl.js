/*global angular*/
var app = angular.module("App");

app.controller("mainCtrl", ["$scope", "$http", function($scope, $http) {
    console.log("mainCtrl inicializado");
    $scope.url = "/api/v1/athletes-performance-sport";

    $scope.get = function() {
        $http.get($scope.url).then(function(response) {
            $scope.status = response.status;
            $scope.data = JSON.stringify(response.data, null, 2);
        });
    };

    $scope.post = function() {
        $http.post($scope.url, $scope.data).then(function(response) {
            $scope.status = response.status;
            $scope.data = JSON.stringify(response.data, null, 2);
        });
    };

    $scope.put = function() {
        $http.put($scope.url, $scope.data).then(function(response) {
            $scope.status = response.status;
            $scope.data = JSON.stringify(response.data, null, 2);
        });
    };

    $scope.delete = function() {
        $http.delete($scope.url).then(function(response) {
            $scope.status = response.status;
            $scope.data = [];
        });
    };

    $scope.loadInitialData = function() {
        $http.get($scope.url + "/loadInitialData").then(function(response) {
            $scope.status = response.status;
            $scope.data = JSON.stringify(response.data, null, 2);
        });
    };


}]);
