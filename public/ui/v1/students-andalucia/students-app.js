/* global angular*/
angular
    .module("StudentsApp", ["ngRoute"])
    .config(function($routeProvider) {
        $routeProvider
            .when("/",{
                templateUrl: "studentsList.html",
                controller: "studentsListCtrl"
            })
            .when("/edit/:city/:year",{
                templateUrl: "studentEdit.html",
                controller: "editCtrl"
            });
    });

console.log("Students App Initialized!");