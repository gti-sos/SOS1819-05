/*global angular*/
angular
    .module("app")
    .controller("athletesEditCtrl", ["$scope", "$http", "$routeParams", "$location", function($scope, $http, $routeParams, $location) {
        console.log("athletesEditCtrl initialized!");
        var athleteURL = "/api/v1/athletes-performance-sport/" + $routeParams.city + "/" + $routeParams.year;

        refresh();

        function refresh() {
            console.log("Requesting athletes to <" + athleteURL + ">");
            $http.get(athleteURL).then(function(res) {
                console.log("Datos recibidos del servidor: " + JSON.stringify(res.data, null, 2));
                $scope.updatedAthlete = res.data;
            });
        }
        
        $scope.update = function() {
            $http.put(athleteURL, $scope.updatedAthlete).then(function(response) {
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
            $location.path("athletesApp"); //para volver
            refresh();
        };

    }]);
