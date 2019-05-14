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
            $http.put(athleteURL, $scope.updatedAthlete).then(function(res) {
                $scope.status = "Status: " + res.status;
                window.alert("OK: estadistica actualizada");
                $location.path("athletesApp"); //para volver
            }, function() {
                var i;
                for (i = 0; i < $scope.length; i++) {
                    if ($scope[i] == null) {
                        $scope.status = "Error 400: debe completar todos los campos";
                        break;
                    }
                }
            });
            refresh();
        };

    }]);
