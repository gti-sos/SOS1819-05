/*global angular*/
/*global Highcharts*/
angular
    .module("app")
    .controller("analyticsAthletesCtrl", ["$scope", "$http", function($scope, $http) {
        console.log("analyticsAthletesCtrl initialized");
        var api = "/api/v1/athletes-performance-sport";

        $http.get(api).then(function(res) {
            Highcharts.chart('analytics1', {

                title: {
                    text: 'athletes analytics'
                },

                subtitle: {
                    text: 'Source: athletes-performance-sport'
                },

                xAxis: {
                    categories: res.data.map(function(a) { return a.city }),
                },

                yAxis: {
                    title: {
                        text: 'Number of Athletes for 2017'
                    }
                },
                legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'middle'
                },

                series: [{
                    name: 'Man',
                    data: res.data.map(function(a) { return a.man })
                }, {
                    name: 'Woman',
                    data: res.data.map(function(a) { return a.woman })
                }, {
                    name: 'Total',
                    data: res.data.map(function(a) { return a.total })
                }],

                responsive: {
                    rules: [{
                        condition: {
                            maxWidth: 500
                        },
                        chartOptions: {
                            legend: {
                                layout: 'horizontal',
                                align: 'center',
                                verticalAlign: 'bottom'
                            }
                        }
                    }]
                }
            });
        });
    }]);
