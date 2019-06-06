/*global angular*/
/*global google*/
/*global Highcharts*/
angular
    .module("app")
    .controller("integrationsAthletesCtrl", ["$scope", "$http", function($scope, $http) {
        console.log("integrationsAthletesCtrl initialized");

        var api = "/api/v1/athletes-performance-sport/proxy";
        var api2 = "/api/v1/athletes-performance-sport/proxy2";
        var api3 = "https://sos1819-03.herokuapp.com/api/v1/computers-attacks-stats";
        var api4 = "https://sos1819-11.herokuapp.com/api/v2/public-health-expenses";

        $http.get(api).then(function(res1) {
            $http.get(api2).then(function(res2) {

                Highcharts.chart('integrations1', {
                    chart: {
                        plotBackgroundColor: null,
                        plotBorderWidth: null,
                        plotShadow: false,
                        type: 'pie'
                    },
                    title: {
                        text: 'Relationship between Takingstats & Athletes in 2017'
                    },
                    tooltip: {
                        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                    },
                    plotOptions: {
                        pie: {
                            allowPointSelect: true,
                            cursor: 'pointer',
                            dataLabels: {
                                enabled: false
                            },
                            showInLegend: true
                        }
                    },
                    series: [{
                        name: 'Athletes & Takingstats',
                        colorByPoint: true,
                        data: [{
                            name: res1.data[0].city,
                            y: res1.data[0].total
                        }, {
                            name: res1.data[1].city,
                            y: res1.data[1].total
                        }, {
                            name: res1.data[2].city,
                            y: res1.data[2].total
                        }, {
                            name: res1.data[3].city,
                            y: res1.data[3].total
                        }, {
                            name: res1.data[4].city,
                            y: res1.data[4].total
                        }, {
                            name: res1.data[5].city,
                            y: res1.data[5].total
                        }, {
                            name: res1.data[6].city,
                            y: res1.data[6].total
                        }, {
                            name: res1.data[7].city,
                            y: res1.data[7].total
                        }, {
                            name: res2.data[0].film,
                            y: res2.data[0].spectator / 1000,
                            sliced: true,
                            selected: true
                        }, {
                            name: res2.data[1].film,
                            y: res2.data[1].spectator / 1000
                        }, {
                            name: res2.data[2].film,
                            y: res2.data[2].spectator / 1000
                        }, {
                            name: res2.data[3].film,
                            y: res2.data[3].spectator / 1000
                        }, {
                            name: res2.data[4].film,
                            y: res2.data[4].spectator / 1000
                        }]
                    }]
                });

            });

            $http.get(api3).then(function(res3) {
                Highcharts.chart('integrations2', {
                    chart: {
                        type: 'pyramid3d',
                        options3d: {
                            enabled: true,
                            alpha: 10,
                            depth: 50,
                            viewDistance: 50
                        }
                    },
                    title: {
                        text: 'Relationship between Athletes & ComputerAttacks in 2017'
                    },
                    plotOptions: {
                        series: {
                            dataLabels: {
                                enabled: true,
                                format: '<b>{point.name}</b> ({point.y:,.0f})',
                                allowOverlap: true,
                                x: 10,
                                y: -5
                            },
                            width: '80%',
                            height: '60%',
                            center: ['50%', '30%']
                        }
                    },
                    series: [{
                        name: 'Athletes & ComputerAttacks',
                        data: [
                            [res1.data[0].city, res1.data[0].total * 100],
                            [res1.data[1].city, res1.data[1].total * 100],
                            [res1.data[2].city, res1.data[2].total * 100],
                            [res1.data[3].city, res1.data[3].total * 100],
                            [res1.data[4].city, res1.data[4].total * 100],
                            [res1.data[5].city, res1.data[5].total * 100],
                            [res1.data[6].city, res1.data[6].total * 100],
                            [res1.data[7].city, res1.data[7].total * 100],
                            [res3.data[0].country, res3.data[0].affectedequipments],
                            [res3.data[1].country, res3.data[1].affectedequipments],
                            [res3.data[2].country, res3.data[2].affectedequipments],
                            [res3.data[3].country, res3.data[3].affectedequipments],
                            [res3.data[4].country, res3.data[4].affectedequipments],
                            [res3.data[5].country, res3.data[5].affectedequipments],
                            [res3.data[6].country, res3.data[6].affectedequipments],
                            [res3.data[7].country, res3.data[7].affectedequipments]
                        ]
                    }]
                });

            });
            
            var acum = 0;
            for(var i = 0; i < res1.data.length; i++){
                acum = acum + res1.data[i].total;
            }
            
            $http.get(api4).then(function(res4) {
                google.charts.load('current', {
                    'packages': ['geochart'],
                    'mapsApiKey': 'AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY'
                });
                google.charts.setOnLoadCallback(drawRegionsMap);

                function drawRegionsMap() {
                    var data = google.visualization.arrayToDataTable([
                        ['Country', 'HealthExpense', 'Total'],
                        ['France', res4.data[0].healthExpense, 0],
                        ['Italy', res4.data[1].healthExpense, 0],
                        ['Spain', res4.data[2].healthExpense, acum],
                        ['Germany', res4.data[3].healthExpense, 0],
                        ['US', res4.data[4].healthExpense, 0]
                    ]);

                    var options = {};

                    var chart = new google.visualization.GeoChart(document.getElementById('integrations3'));

                    chart.draw(data, options);
                }


            });

        });

    }]);
