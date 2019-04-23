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
            });
    });
