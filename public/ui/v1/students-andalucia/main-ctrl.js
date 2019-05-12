/* global angular */

var app = angular.module("MiniPostmanApp");

app.controller("MainCtrl", ["$scope","$http", function($scope, $http){
    console.log("Modular MainCtrl initialized!");
    var API = "/api/v1/students-andalucia";
    var limit = 10;
    var offset = 0;
    $scope.currentPage = 1;
    
    refresh();
    
     
    function refresh(){
        console.log("Requesting students to <"+ API +">...");
        $http.get(API).then(function(response){
            console.log("Data Received: " + JSON.stringify(response.data,null,2));
                
            $scope.students = response.data;
        });
    }
        
    //LoadInitialData
    $scope.loadInitialData = function() {
        console.log("Loading all athletes");
        $http.get(API + "/loadInitialData").then(function(response) {
            console.log("LOADING res: " + response.status + " " + response.data);
            $scope.status = response.status + ": los datos se han inicializado correctamente";
        }).catch(function(response){
           $scope.statusInfo = JSON.stringify(response.status,null,2); 
        });
        refresh();
    };
        
    
    //POST
    $scope.add = function(){
        var newStudent = $scope.newStudent;
                
        console.log("Adding a new student!"+ JSON.stringify(newStudent.data,null,2));
        $http
            .post(API,newStudent)
            .then(function(response){
                console.log("Response: " + response.status + " " +response.data);
                refresh();
                $scope.status = response.status + ": el dato se ha añadido correctamente";
            }, function(error) {
            if(error.status==400){
                window.alert("ERROR: No puede haber campos vacios");
            }else if(error.status==409){
                window.alert("ERROR: la ciudad " + JSON.stringify(newStudent.city,null,2) + " ya existe.");
            }
           
            });
    }

    //DELETE RECURSO CONCRETO     
    $scope.delete = function(city) {
        debugger;
        console.log("Deleting student with city : " + city);
        $http.delete(API + "/" + city).then(function(response) {
            console.log("DELETE res: " + response.status + " " + response.data);

            refresh();
            $scope.status = response.status + ": el dato se ha eliminado correctamente";
        });
    };
    
    //DELETE TODO        
    $scope.deleteAll = function(){
        console.log("Deleting student!");      
        
        $http
            .delete(API + "/")
            .then(function(response){
                console.log("Delete response: " + response.status + " " + response.data);
                
                refresh();
                $scope.status = response.status + ": los datos se han eliminado correctamente";
                
            });
    
    }
    
    //BUSQUEDA
    $scope.busqueda = function() {
        console.log(API + "?" + $scope.atributo + "=" + $scope.valor);
        $http.get(API + "?" + $scope.atributo + "=" + $scope.valor).then(function (res) {
            if(res.data.length == 0){
                window.alert("No se ha encontrado ningun dato");
            }else if(res.data.length == 1){
                window.alert("Se ha encontrado 1 dato");
            }else{
                window.alert("se han encontrado " + res.data.length + " datos");
            }
            $scope.students = res.data;
            console.log(res.status + " " + JSON.stringify(res.data,null,2));
        });
    };
    
    //PAGINACIÓN
    $scope.previousPage = function() {
        if ($scope.currentPage > 1) {
            offset -= limit;
            refresh();
            $scope.currentPage -= 1;
        }
    };

    $scope.nextPage = function() {
        if ($scope.students.length == 4) {
            offset += limit;
            refresh();
            $scope.currentPage += 1;
        }
    };    
    
}]);