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
            console.log("tratamiento del error");

            if (Object.values($scope.updatedAthlete).includes("")) {
                window.alert("Debe rellenar todos los campos");
            }
            else {
                $http.put(athleteURL, $scope.updatedAthlete).then(function(res) {
                    window.alert("Modificado correctamente");
                    refresh();
                    $location.path("athletesApp");
                });
            }
        };
    }]);
