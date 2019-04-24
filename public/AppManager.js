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

            /*Enrique*/
            .when("/api/v1/libraries-stats", {
                templateUrl: "../libraries/index.html",
                controller: "mainCtrl"
            })
            .when("/api/v1/libraries-stats/:city/:year", {
                templateUrl: "../libraries/edit.html",
                controller: "editCtrl"
            });
    });
