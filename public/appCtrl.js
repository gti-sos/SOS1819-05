/* global angular*/
angular
    .module("app", ["ngRoute"])
    .config(function($routeProvider) {
        $routeProvider
            .when("/athletesApp",{
                templateUrl: "athletesList.html",
                controller: "athletesListCtrl"
            })
            .when("/athletesApp/:city/:year",{
                templateUrl: "athletesEdit.html",
                controller: "athletesEditCtrl"
            });
    });

console.log("App Initialized!");
