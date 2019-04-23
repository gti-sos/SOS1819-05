/*global angular*/
var app = angular.module("App");

app.controller("editCtrl", ["$scope", "$http", "$routeParams", "$location", function($scope, $http, $routeParams, $location) {
    console.log("editCtrl inicializado");
    var API = "/api/v1/athletes-performance-sport" + "/" + $routeParams.city + "/" + $routeParams.year;

    $http.get(API).then(function(res) {
        console.log("Dato recibido del servidor: " + JSON.stringify(res.data, null, 2));
        $scope.updatedAthlete = res.data;
    });

    $scope.put = function() {
        console.log("Updating an athlete");
        $http.put(API, $scope.updatedAthlete).then(function(res) {
            if ($scope.updatedAthlete.params != 5) {
                console.log("Actualización incorrecta");
                $scope.status = "400: debe completar todos los campos";
            }
            else {
                console.log(res.status + ": los datos han sido actualizados correctamente");
                window.alert("OK: estadística actualizada");
                $location.path("/ui/v1/athletes-performance-sport");
            }
        });
    };
}]);
