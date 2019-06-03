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
            })
            .when("/analytics/Athletes", {
                templateUrl: "analyticsAthletes.html",
                controller: "analyticsAthletesCtrl"
            })
            .when("/integrations", {
                templateUrl: "integrations.html",
                controller: "integrationsCtrl"
            })
            .when("/integrations/Athletes", {
                templateUrl: "integrationsAthletes.html",
                controller: "integrationsAthletesCtrl"
            });
    });

console.log("App Initialized!");
