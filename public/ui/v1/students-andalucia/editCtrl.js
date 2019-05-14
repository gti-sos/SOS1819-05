/*global angular*/

angular
    .module("StudentsApp")
    .controller("editCtrl", ["$scope", "$http", "$routeParams", "$location", function($scope, $http, $routeParams, $location) {
    console.log("editCtrl inicializado");
    var API = "/api/v1/students-andalucia" + "/" + $routeParams.city + "/" + $routeParams.year;

    refresh();

    function refresh() {
        console.log("Requesting athletes to <" + API + ">");
        $http.get(API).then(function(res) {
            console.log("Datos recibidos del servidor: " + JSON.stringify(res.data, null, 2));
            $scope.updatedAthlete = res.data;
        });
    }


        $scope.update = function() {
            $http.put(API, $scope.updatedStudent).then(function(response) {
                $scope.status = "Status: " + response.status;
                alert("OK: estadistica actualizada");
            }).catch(function(response) {
                if (response.status == 405) {
                    alert("Método no permitido");
                }
                if (response.status == 400) {
                    alert("Asegurese de poner bien los datos");
                }
                $scope.estado = response.status;

            });
            $location.path("StudentsApp"); //para volver
            refresh();
        };
}]);
