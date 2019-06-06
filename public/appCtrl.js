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
<<<<<<< HEAD
            
<<<<<<< HEAD
=======
                        
>>>>>>> 227d609c865f144d6229736e27f33611ee3e5861
            .when("/librariesApp",{
=======
            .when("/librariesApp", {
>>>>>>> ad4a349ea53f9290d6e45106b2b1f5e567aa5b60
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
            .when("/integrations/Athletes", {
                templateUrl: "integrationsAthletes.html",
                controller: "integrationsAthletesCtrl"
            })
            .when("/usos/Athletes", {
                templateUrl: "usosAthletes.html",
                controller: "usosAthletesCtrl"
            })
            .when("/usos", {
                templateUrl: "usos.html"
            })
            .when("/integrations", {
                templateUrl: "integrations.html"
            })
            .when("/about", {
                templateUrl: "about.html"
            });
    });

console.log("App Initialized!");
