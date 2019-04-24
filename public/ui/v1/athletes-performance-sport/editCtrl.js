/*global angular*/
var app = angular.module("App");

app.controller("editCtrl", ["$scope", "$http", "$routeParams", "$location", function($scope, $http, $routeParams, $location) {
    console.log("editCtrl inicializado");
    var API = "/api/v1/athletes-performance-sport" + "/" + $routeParams.city + "/" + $routeParams.year;

    refresh();

    function refresh() {
        console.log("Requesting athletes to <" + API + ">");
        $http.get(API).then(function(res) {
            console.log("Datos recibidos del servidor: " + JSON.stringify(res.data, null, 2));
            $scope.updatedAthlete = res.data; //ya lo tenemos en el modelo. Ya podemos recogerlo desde la vista
        });
    }


    $scope.put = function() {
        console.log("Updating an athlete");
        $http.put(API, $scope.updatedAthlete).then(function(res) {
            console.log(res.status + ": los datos han sido actualizados correctamente");
            window.alert("OK: estadística actualizada");
            $location.path("/ui/v1/athletes-performance-sport");

        });
    };
}]);
