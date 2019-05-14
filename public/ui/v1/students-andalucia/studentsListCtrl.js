/*global angular*/
angular
    .module("StudentsApp")
    .controller("studentsListCtrl", ["$scope", "$http", function($scope, $http) {
        console.log("studentsListCtrl inicializado");
        var API = "/api/v1/students-andalucia";
        var limit = 10;
        var offset = 0;
        $scope.currentPage = 1;

        refresh();

        function refresh() {
            console.log("Requesting students to <" + API + ">");
            $http.get(API + "?limit=" + limit + "&offset=" + offset).then(function(res) {
                console.log("Datos recibidos del servidor: " + JSON.stringify(res.data, null, 2));
                $scope.students = res.data; //ya lo tenemos en el modelo. Ya podemos recogerlo desde la vista
            });
        }

        $scope.add = function() {
            var newStudent = $scope.newAthlete;
            console.log("Adding a new athlete: " + JSON.stringify(newStudent, null, 2));
            $http.post(API, newStudent).then(function(res) {
                console.log("POST res: " + res.status + " " + res.data);
                refresh();
                $scope.status = res.status + ": el dato se ha añadido correctamente";
            }, function(error) {
                if (error.status == 400) {
                    window.alert("ERROR: Debe completar todos los campos");
                }
                else if (error.status == 409) {
                    window.alert("ERROR: la ciudad " + JSON.stringify(newStudent.city, null, 2) + " ya existe.");
                }
            });
        };

        $scope.delete = function(city) {
            console.log("Deleting student with city : " + city);
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
            console.log("Loading all students");
            $http.get(API + "/loadInitialData").then(function(res) {
                console.log("LOADING res: " + res.status + " " + res.data);
                $scope.status = res.status + ": los datos se han inicializado correctamente";
            }).catch(function(res) {
                $scope.statusInfo = JSON.stringify(res.status, null, 2);
            });
            refresh();
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
            $http.get(API + "?" + $scope.atributo + "=" + $scope.valor).then(function(res) {
                if (res.data.length == 0) {
                    window.alert("No se ha encontrado ningun dato");
                }
                else if (res.data.length == 1) {
                    window.alert("Se ha encontrado 1 dato");
                }
                else {
                    window.alert("se han encontrado " + res.data.length + " datos");
                }
                $scope.students = res.data;
                console.log(res.status + " " + JSON.stringify(res.data, null, 2));
            });
        };

    }]);