/*global angular*/
angular
    .module("app")
    .controller("librariesEditCtrl", ["$scope", "$http", "$routeParams", "$location", function($scope, $http, $routeParams, $location) {
        console.log("librariesEditCtrl initialized!");
        var librarieURL = "/api/v1/libraries-stats/" + $routeParams.city + "/" + $routeParams.year;

        refresh();

        function refresh() {
            console.log("Requesting libraries to <" + librarieURL + ">");
            $http.get(librarieURL).then(function(res) {
                console.log("Datos recibidos: " + JSON.stringify(res.data, null, 2));
                $scope.updatedLibrarie = res.data;
            });
        }
        
        $scope.update = function() {
            $http.put(librarieURL, $scope.updatedLibrarie).then(function(response) {
                $scope.status = "Status: " + response.status;
                alert("OK: biblioteca actualizada");
            }).catch(function(response) {
                if (response.status == 405) {
                    alert("Método no permitido");
                }
                if (response.status == 400) {
                    alert("Datos incorrectos");
                }
                $scope.estado = response.status;

            });
            $location.path("librariesApp"); //para volver
            refresh();
        };

    }]);
