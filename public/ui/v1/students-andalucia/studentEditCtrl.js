/*global angular*/

angular
    .module("StudentsApp")
    .controller("editCtrl", ["$scope", "$http", "$routeParams", "$location", function($scope, $http, $routeParams, $location) {
    console.log("editCtrl inicializado");
    var API = "/api/v1/students-andalucia" + "/" + $routeParams.city + "/" + $routeParams.year;

    $http.get(API).then(function (response){
        console.log("Data Received: "
                        + JSON.stringify(response.data,null,2));

        $scope.updatedStudent = response.data;
    });


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
        $location.path("/"); //para volver al la vista principal
    }
    
}]);
