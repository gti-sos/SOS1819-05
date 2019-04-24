/*global angular*/
var app = angular.module("App");

app.controller("mainCtrl", ["$scope", "$http", function($scope, $http) {
    console.log("mainCtrl inicializado");
    var API = "/api/v1/athletes-performance-sport";
    var limit = 10;
    var offset = 0;
    $scope.currentPage = 1;

    refresh();

    function refresh() {
        console.log("Requesting athletes to <" + API + ">");
        $http.get(API + "?limit=" + limit + "&offset=" + offset).then(function(res) {
            console.log("Datos recibidos del servidor: " + JSON.stringify(res.data, null, 2));
            $scope.athletes = res.data; //ya lo tenemos en el modelo. Ya podemos recogerlo desde la vista
        });
    }

    $scope.add = function() {
        var newAthlete = $scope.newAthlete;
        console.log("Adding a new athlete: " + JSON.stringify(newAthlete, null, 2));
        $http.post(API, newAthlete).then(function(res) {
            console.log("POST res: " + res.status + " " + res.data);
            refresh();
            $scope.status = res.status + ": el dato se ha añadido correctamente";
        }, function(res) {
            if (newAthlete.length !== 5) {
                console.log(res.status + "debe completar todos los campos");
                $scope.status = "Error 400: debe completar todos los campos";
            }
            else if ($scope.city == newAthlete.city && $scope.year == newAthlete.year) {
                console.log(res.status + "la estadística ya existe");
                $scope.status = res.status + ": la estadística ya existe";
            }
        });
    };

    $scope.delete = function(city) {
        console.log("Deleting athlete with city : " + city);
        $http.delete(API + "/" + city).then(function(res) {
            console.log("DELETE res: " + res.status + " " + res.data);

            refresh();
            $scope.status = res.status + ": el dato se ha eliminado correctamente";
        });
    };

    $scope.deleteAll = function() {
        console.log("Deleting all athletes");
        $http.delete(API).then(function(res) {
            console.log("DELETEALL res: " + res.status + " " + res.data);

            refresh();
            $scope.status = res.status + ": los datos se han eliminado correctamente";
        });
    };

    $scope.loadInitialData = function() {
        console.log("Loading all athletes");
        $http.get(API + "/loadInitialData").then(function(res) {
            console.log("LOADING res: " + res.status + " " + res.data);
            $scope.status = res.status + ": los datos se han inicializado correctamente";
            refresh();

        });
    };

    $scope.previousPage = function() {
        if ($scope.currentPage > 1) {
            offset -= limit;
            refresh();
            $scope.currentPage -= 1;
        }
    };

    $scope.nextPage = function() {
        if ($scope.athletes.length == 10) {
            offset += limit;
            refresh();
            $scope.currentPage += 1;
        }
    };

    $scope.busqueda = function() {
        console.log(API + "?" + $scope.atributo + "=" + $scope.valor);
        $http.get(API + "?" + $scope.atributo + "=" + $scope.valor).then(function succesCallback(res) {
            $scope.status = "Recurso encontrado";
            $scope.athletes = res.data;
        }, function errorCallback(res) {
            console.log(res.status);
            $scope.status = res.status;
        });
    };

}]);
