/*global angular*/
var app = angular.module("App");

app.controller("mainCtrl", ["$scope", "$http", function($scope, $http) {
    console.log("mainCtrl inicializado");
    $scope.url = "/api/v1/athletes-performance-sport";

    $scope.get = function() {
        $http.get($scope.url).then(function(response) {
            $scope.status = response.status;
            $scope.data = JSON.stringify(response.data, null, 2);

        }, function(error) {
            $scope.status = error.status;
            $scope.data = "";
        });
    };

    $scope.post = function() {
        $http.post($scope.url, $scope.data).then(function(response) {
            $scope.status = response.status;
            $scope.data = JSON.stringify(response.data, null, 2);

        }, function(error) {
            $scope.status = error.status;
            $scope.data = "";
        });
    };

    $scope.put = function() {
        $http.put($scope.url, $scope.data).then(function(response) {
            $scope.status = response.status;
            $scope.data = JSON.stringify(response.data, null, 2);

        }, function(error) {
            $scope.status = error.status;
            $scope.data = "";
        });
    };

    $scope.delete = function() {
        $http.delete($scope.url).then(function(response) {
            $scope.status = response.status;
            $scope.data = [];

        }, function(error) {
            $scope.status = error.status;
            $scope.data = "";
        });
    };

    $scope.loadInitialData = function() {
        $http.get($scope.url + "/loadInitialData").then(function(response) {
            $scope.status = response.status;
            $scope.data = JSON.stringify(response.data, null, 2);
        });
    };


}]);
