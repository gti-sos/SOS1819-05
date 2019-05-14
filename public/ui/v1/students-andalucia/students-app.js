/*global angular*/

    angular
        .module("MiniPostmanApp",["ngRoute"])
        .config( function ($routeProvider){
            $routeProvider
                .when("/edit/:city",{
                   controller : "EditCtrl",
                   templateUrl: "edit.html"
                });
        });
            
        
    console.log("Students app initialized!");