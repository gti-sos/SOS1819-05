/*global angular*/
/*global Highcharts*/
/*global google*/
/*global FusionCharts*/
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

            var acum = 0;
            for (var i = 0; i < res.data.length; i++) {
                acum = acum + res.data[i].total;
            }

            google.charts.load('current', {
                'packages': ['geochart'],
                'mapsApiKey': 'AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY'
            });
            google.charts.setOnLoadCallback(drawRegionsMap);

            function drawRegionsMap() {
                var data = google.visualization.arrayToDataTable([
                    ['Country', 'Total'],
                    ['Spain', acum]
                ]);

                var options = {};

                var chart = new google.visualization.GeoChart(document.getElementById('analytics2'));

                chart.draw(data, options);
            }

            const dataSource = {
                chart: {
                    caption: "Athletes Performance Sport",
                    subcaption: "By province",
                    yaxisname: "Number of athletes",
                    labeldisplay: "rotate",
                    scrollheight: "10",
                    numvisibleplot: "10",
                    drawcrossline: "1",
                    theme: "fusion"
                },
                categories: [{
                    category: [{
                        label: res.data[0].city
                    }, {
                        label: res.data[1].city
                    }, {
                        label: res.data[2].city
                    }, {
                        label: res.data[3].city
                    }, {
                        label: res.data[4].city
                    }, {
                        label: res.data[5].city
                    }, {
                        label: res.data[6].city
                    }, {
                        label: res.data[7].city
                    }]
                }],
                dataset: [{
                        seriesname: "Total",
                        plottooltext: "Total: $dataValue",
                        data: [{
                                value: res.data[0].total
                            }, {
                                value: res.data[1].total
                            }, {
                                value: res.data[2].total
                            }, {
                                value: res.data[3].total
                            }, {
                                value: res.data[4].total
                            }, {
                                value: res.data[5].total
                            }, {
                                value: res.data[6].total
                            }, {
                                value: res.data[7].total
                            }
                        ]
                    },
                    {
                        seriesname: "Woman",
                        renderas: "area",
                        showanchors: "0",
                        plottooltext: "Woman: $dataValue",
                        data: [{
                                value: res.data[0].woman
                            }, {
                                value: res.data[1].woman
                            }, {
                                value: res.data[2].woman
                            }, {
                                value: res.data[3].woman
                            }, {
                                value: res.data[4].woman
                            }, {
                                value: res.data[5].woman
                            }, {
                                value: res.data[6].woman
                            }, {
                                value: res.data[7].woman
                            }
                        ]
                    },
                    {
                        seriesname: "Man",
                        renderas: "line",
                        plottooltext: "Man: $dataValue",
                        showvalues: "0",
                        data: [{
                                value: res.data[0].man
                            }, {
                                value: res.data[1].man
                            }, {
                                value: res.data[2].man
                            }, {
                                value: res.data[3].man
                            }, {
                                value: res.data[4].man
                            }, {
                                value: res.data[5].man
                            }, {
                                value: res.data[6].man
                            }, {
                                value: res.data[7].man
                            }
                        ]
                    }
                ]
            };

            FusionCharts.ready(function() {
                var myChart = new FusionCharts({
                    type: "scrollcombidy2d",
                    renderAt: "analytics3",
                    width: "100%",
                    height: "100%",
                    dataFormat: "json",
                    dataSource
                }).render();
            });




        });
    }]);
