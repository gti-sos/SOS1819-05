/* global angular */
angular
    .module("App", ["ngRoute"])
    .config(function($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "about.html"
            })
            
            /*ÁLVARO*/
            .when("/ui/v1/athletes-performance-sport", {
             
                templateUrl: "../athletesApi/index.html",
                controller: "mainCtrl"
            })
            .when("/ui/v1/athletes-performance-sport/:city/:year", {
                templateUrl: "../athletesApi/edit.html",
               controller: "editCtrl"
            })
        
            /*Enrique*/
            .when("/ui/v1/libraries-stats", {
                templateUrl: "../libraries/index.html",
                controller: "main-ctrl"
            })
            .when("/ui/v1/libraries-stats/:city/:year", {
                templateUrl: "../libraries/edit.html",
                controller: "editCtrl"
            })
            
            //Marta
            .when("/ui/v1/students-andalucia", {
                templateUrl: "../students/index.html",
                controller: "main-ctrl"
            })
            .when("/ui/v1/students-andalucia/:city/:year", {
                templateUrl: "../students/edit.html",
                controller: "editCtrl"
            });
    });
