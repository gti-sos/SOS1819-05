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
            })
            
<<<<<<< HEAD
=======
                        
>>>>>>> 227d609c865f144d6229736e27f33611ee3e5861
            .when("/librariesApp",{
                templateUrl: "librariesList.html",
                controller: "librariesListCtrl"
            })
            .when("/librariesApp/:city/:year",{
                templateUrl: "librariesEdit.html",
                controller: "librariesEditCtrl"
            });
    });

console.log("App Initialized!");
