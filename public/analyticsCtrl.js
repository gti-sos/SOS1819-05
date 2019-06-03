/*global angular*/
/*global Highcharts*/
/*global google*/
angular
    .module("app")
    .controller("analyticsCtrl", ["$scope", "$http", function($scope, $http) {
        console.log("analyticsCtrl initialized");
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
                    categories: res.data.map(function(a) { return a.city })
                },

                yAxis: {
                    title: {
                        text: 'Number of Athletes'
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

            google.charts.load('current', {
                'packages': ['geochart'],
                'mapsApiKey': 'AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY'
            });
            google.charts.setOnLoadCallback(drawMarkersMap);

            function drawMarkersMap() {
                var data = google.visualization.arrayToDataTable([
                    ['City', 'Total'],
                    ['Almeria', res.data[0].total],
                    ['Cadiz', 1324110],
                    ['Cordoba', 959574],
                    ['Granada', 907563],
                    ['Huelva', 655875],
                    ['Jaen', 607906],
                    ['Malaga', 380181],
                    ['Seville', 371282]
                ]);

                var options = {
                    region: 'ES',
                    displayMode: 'markers',
                    colorAxis: { colors: ['green', 'blue'] }
                };

                var chart = new google.visualization.GeoChart(document.getElementById('analytics2'));
                chart.draw(data, options);
            }
        });
    }]);
