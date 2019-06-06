/* global angular*/
/* global Highcharts*/
angular
    .module("app")
    .controller("analyticsCtrl", ["$scope", "$http", function($scope, $http) {
        console.log("analyticsCtrl initialized");

        var apiAlvaro = "/api/v1/athletes-performance-sport/proxy";
        var apiMarta = "/api/v1/students-andalucia/proxy";
        var apiEnrique = "/api/v1/libraries-stats/proxy";

        $http.get(apiAlvaro).then(function(res1) {
            $http.get(apiMarta).then(function(res2) {
                $http.get(apiEnrique).then(function(res3) {

                    Highcharts.chart('analytics', {
                        title: {
                            text: 'Integration Grupal'
                        },
                        xAxis: {
                            categories: ['Almería', 'Cadiz', 'Cordoba', 'Granada', 'Huelva', 'Jaen', 'Malaga', 'Sevilla']
                        },
                        labels: {
                            items: [{
                                style: {
                                    left: '50px',
                                    top: '18px',
                                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'black'
                                }
                            }]
                        },
                        series: [{
                            type: 'column',
                            name: 'man',
                            data: res1.data.map(function(a) { return a.man })
                        }, {
                            type: 'column',
                            name: 'woman',
                            data: res1.data.map(function(a) { return a.woman })
                        }, {
                            type: 'column',
                            name: 'total',
                            data: res1.data.map(function(a) { return a.total })
                        }, {
                            type: 'column',
                            name: 'eso',
                            data: res2.data.map(function(a) { return a.eso })
                        }, {
                            type: 'column',
                            name: 'high',
                            data: res2.data.map(function(a) { return a.high })
                        }, {
                            type: 'column',
                            name: 'vocational',
                            data: res2.data.map(function(a) { return a.vocational })
                        }, {
                            type: 'column',
                            name: 'number',
                            data: res3.data.map(function(a) { return a.number })
                        }, {
                            type: 'column',
                            name: 'activities',
                            data: res3.data.map(function(a) { return a.activities })
                        }, {
                            type: 'column',
                            name: 'service',
                            data: res3.data.map(function(a) { return a.service })

                        }, {
                            type: 'column',
                            name: 'year',
                            data: res1.data.map(function(a) { return a.year })
                        }]
                    });

                });
            });
        });


    }]);
