/*global angular*/
angular
    .module("app")
    .controller("librariesEditCtrl", ["$scope", "$http", "$routeParams", "$location", function($scope, $http, $routeParams, $location) {
        console.log("librariesEditCtrl initialized!");
        var athleteURL = "/api/v1/libraries-stats/" + $routeParams.city + "/" + $routeParams.year;

        refresh();

        function refresh() {
            console.log("Requesting libraries to <" + librarieURL + ">");
            $http.get(librarieURL).then(function(res) {
                console.log("Datos recibidos del servidor: " + JSON.stringify(res.data, null, 2));
                $scope.updatedLibrarie = res.data;
            });
        }

        $scope.update = function() {
            $http.put(librarieURL, $scope.updatedLibrarie).then(function(res) {
                $scope.status = "Status: " + res.status;
                window.alert("OK: estadistica actualizada");
                $location.path("librariesApp"); //para volver
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
