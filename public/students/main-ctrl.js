/* global angular */

var app = angular.module("MiniPostmanApp");

app.controller("MainCtrl", ["$scope","$http", function($scope, $http){
    console.log("Modular MainCtrl initialized!");
    var API = "/api/v1/students-andalucia";
    refresh();
        
    //LoadInitialData
    $scope.loadInitialData = function() {

        $http.get(API + "/loadInitialData", JSON.stringify($scope.data)).then(function(response) {
            $scope.estado = response.status;
            refresh();
        }).catch(function(response) { //recoje el error en caso de que haya
            $scope.estado = response.status;

            refresh();

        });
    };
         
    //GET 
    function refresh(){
        console.log("Requesting students to <"+ API +">...");
        $http.get(API).then(function(response){
            console.log("Data Received: " + JSON.stringify(response.data,null,2));
                
            $scope.students = response.data;
        });
    }
    
    //POST
    $scope.add = function(){
        var newStudent = $scope.newStudent;
                
        console.log("Adding a new student!"+ JSON.stringify(newStudent.data,null,2));
        $http
            .post(API,newStudent)
            .then(function(response){
                console.log("Response: " + response.status + " " +response.data);
                refresh();
            });
    }

    //DELETE RECURSO CONCRETO     
    $scope.deleteData = function(city, year){
        console.log("Deleting student!"+ city + year);      
        
        $http
            .delete(API + "/" + city + "/" + year)
            .then(function(response){
                console.log("Delete response: " + response.status + " " + response.data);
                refresh();
            });
    }
    
    //DELETE TODO        
    $scope.deleteAll = function(){
        console.log("Deleting student!");      
        
        $http
            .delete(API + "/")
            .then(function(response){
                console.log("Delete response: " + response.status + " " + response.data);
                refresh();
            });
    
    }
    
    //BUSQUEDA
    $scope.searchData = function(city, year) {

        if (city && !year) {

            $http.get($scope.url + "?city=" + city).then(function(response) {

                $scope.datos = response.data;
                $scope.mensaje = "Recurso/s encontrado/s con exito";

            }, function(error) {

                $scope.mensaje = "Error: " + error.status + " = recurso/s no encontrado/s";

                refresh();
            });
        }
        else {

            if (year && !city) {

                $http.get($scope.url + "?year=" + year).then(function(response) {

                    $scope.datos = response.data;

                    $scope.mensaje = "Recurso/s encontrado/s con exito";

                }, function(error) {

                    $scope.mensaje = "Error: " + error.status + " = recurso/s no encontrado/s";

                    refresh();

                });
            }
            else {

                refresh();
            }
        }
    };
    
}]);