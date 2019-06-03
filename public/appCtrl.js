/* global angular*/
angular
    .module("app", ["ngRoute"])
    .config(function($routeProvider) {
        $routeProvider
            .when("/athletesApp", {
                templateUrl: "athletesList.html",
                controller: "athletesListCtrl"
            })
            .when("/athletesApp/:city/:year", {
                templateUrl: "athletesEdit.html",
                controller: "athletesEditCtrl"
            })
            .when("/librariesApp", {
                templateUrl: "librariesList.html",
                controller: "librariesListCtrl"
            })
            .when("/librariesApp/:city/:year", {
                templateUrl: "librariesEdit.html",
                controller: "librariesEditCtrl"
            })
            .when("/analytics", {
                templateUrl: "analytics.html",
                controller: "analyticsCtrl"
            });
    });

console.log("App Initialized!");
