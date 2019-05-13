/*global angular*/
var app = angular.module("App");

app.controller("editCtrl", ["$scope", "$http", "$routeParams", "$location", function($scope, $http, $routeParams, $location) {
    console.log("editCtrl inicializado");
    var API = "/api/v1/libraries-stats" + "/" + $routeParams.city + "/" + $routeParams.year;

    $http.get(API).then(function(res) {
        console.log("Dato recibido del servidor: " + JSON.stringify(res.data, null, 2));
        $scope.updatedLibrarie = res.data;
    });

    $scope.put = function() {
        console.log("Updating an librarie");
        $http.put(API, $scope.updatedLibrarie).then(function(res) {
            console.log(res.status + ": los datos han sido actualizados correctamente");
            window.alert("OK: estadística actualizada");
            $location.path("/api/v1/libraries-stats");

        });
    };
}]);