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
    $scope.delete = function(city) {
        console.log("Deleting student with city : " + city);
        $http.delete(API + "/" + city).then(function(res) {
            console.log("DELETE res: " + res.status + " " + res.data);

            refresh();
            $scope.status = res.status + ": el dato se ha eliminado correctamente";
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
            });
    
    }
    
    //BUSQUEDA
    $scope.busqueda = function() {
        console.log(API + "?" + $scope.atributo + "=" + $scope.valor);
        $http.get(API + "?" + $scope.atributo + "=" + $scope.valor).then(function succesCallback(res) {
            $scope.status = "Recurso encontrado";
            $scope.students = res.data;
        }, function errorCallback(res) {
            console.log(res.status);
            $scope.status = res.status;
        });
    };
    
}]);