/*global angular*/
/*global am4core*/
/*global am4themes_animated*/
/*global am4charts*/
angular
    .module("app")
    .controller("usosAthletesCtrl", ["$scope", "$http", function($scope, $http) {
        console.log("usosAthletesCtrl initialized");

        var api = "/api/v1/athletes-performance-sport/proxy";
        var api2 = "/api/v1/athletes-performance-sport/proxy5";
        var api3 = "https://parallelum.com.br/fipe/api/v1/motos/marcas";

        $http.get(api).then(function(res) {
            $http.get(api2).then(function(res2) {

                am4core.ready(function() {

                    // Themes begin
                    am4core.useTheme(am4themes_animated);
                    // Themes end

                    var chart = am4core.create("uso1", am4charts.XYChart);
                    chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

                    chart.maskBullets = false;

                    var xAxis = chart.xAxes.push(new am4charts.CategoryAxis());
                    var yAxis = chart.yAxes.push(new am4charts.CategoryAxis());

                    xAxis.dataFields.category = "city";
                    yAxis.dataFields.category = "model";

                    xAxis.renderer.grid.template.disabled = true;
                    xAxis.renderer.minGridDistance = 40;

                    yAxis.renderer.grid.template.disabled = true;
                    yAxis.renderer.inversed = true;
                    yAxis.renderer.minGridDistance = 30;

                    var series = chart.series.push(new am4charts.ColumnSeries());
                    series.dataFields.categoryX = "city";
                    series.dataFields.categoryY = "model";
                    series.dataFields.value = "value";
                    series.sequencedInterpolation = true;
                    series.defaultState.transitionDuration = 3000;

                    // Set up column appearance
                    var column = series.columns.template;
                    column.strokeWidth = 2;
                    column.strokeOpacity = 1;
                    column.stroke = am4core.color("#ffffff");
                    column.tooltipText = "{city}, {model}: {value.workingValue.formatNumber('#.')}";
                    column.width = am4core.percent(100);
                    column.height = am4core.percent(100);
                    column.column.cornerRadius(6, 6, 6, 6);
                    column.propertyFields.fill = "color";

                    // Set up bullet appearance
                    var bullet1 = series.bullets.push(new am4charts.CircleBullet());
                    bullet1.circle.propertyFields.radius = "value";
                    bullet1.circle.fill = am4core.color("#000");
                    bullet1.circle.strokeWidth = 0;
                    bullet1.circle.fillOpacity = 0.7;
                    bullet1.interactionsEnabled = false;

                    var bullet2 = series.bullets.push(new am4charts.LabelBullet());
                    bullet2.label.text = "{value}";
                    bullet2.label.fill = am4core.color("#fff");
                    bullet2.zIndex = 1;
                    bullet2.fontSize = 11;
                    bullet2.interactionsEnabled = false;

                    // define colors
                    var colors = {
                        "critical": chart.colors.getIndex(0).brighten(-0.8),
                        "bad": chart.colors.getIndex(1).brighten(-0.6),
                        "medium": chart.colors.getIndex(1).brighten(-0.4),
                        "good": chart.colors.getIndex(1).brighten(-0.2),
                        "verygood": chart.colors.getIndex(1).brighten(0)
                    };

                    chart.data = [{
                            "model": res2.data.results[0].model,
                            "city": res.data[0].city,
                            "color": colors.bad,
                            "value": res2.data.results[0].cost_in_credits / 2000
                        }, {
                            "model": res2.data.results[1].model,
                            "city": res.data[1].city,
                            "color": colors.critical,
                            "value": res2.data.results[1].cost_in_credits / 2000
                        }, {
                            "model": res2.data.results[2].model,
                            "city": res.data[2].city,
                            "color": colors.medium,
                            "value": res2.data.results[2].cost_in_credits / 2000
                        }, {
                            "model": res2.data.results[3].model,
                            "city": res.data[3].city,
                            "color": colors.good,
                            "value": res2.data.results[3].cost_in_credits / 2000
                        }, {
                            "model": res2.data.results[4].model,
                            "city": res.data[4].city,
                            "color": colors.verygood,
                            "value": res2.data.results[4].cost_in_credits / 2000
                        },
                        {
                            "model": res2.data.results[5].model,
                            "city": res.data[5].city,
                            "color": colors.medium,
                            "value": res2.data.results[5].cost_in_credits / 2000
                        }, {
                            "model": res2.data.results[6].model,
                            "city": res.data[6].city,
                            "color": colors.bad,
                            "value": res2.data.results[6].cost_in_credits / 2000
                        }, {
                            "model": res2.data.results[7].model,
                            "city": res.data[7].city,
                            "color": colors.critical,
                            "value": res2.data.results[7].cost_in_credits / 2000
                        }
                    ];

                });

            });

            $http.get(api3).then(function(res3) {

                am4core.ready(function() {

                    // Themes begin
                    am4core.useTheme(am4themes_animated);
                    // Themes end

                    let chart = am4core.create("uso2", am4charts.SlicedChart);
                    chart.data = [{
                        "name": res3.data[0].nome,
                        "value": res3.data[0].codigo
                    }, {
                        "name": res3.data[1].nome,
                        "value": res3.data[1].codigo
                    }, {
                        "name": res3.data[2].nome,
                        "value": res3.data[2].codigo
                    }, {
                        "name": res3.data[3].nome,
                        "value": res3.data[3].codigo
                    }, {
                        "name": res3.data[4].nome,
                        "value": res3.data[4].codigo
                    }, {
                        "name": res3.data[5].nome,
                        "value": res3.data[5].codigo
                    }, {
                        "name": res3.data[6].nome,
                        "value": res3.data[6].codigo
                    }, {
                        "name": res3.data[7].nome,
                        "value": res3.data[7].codigo
                    }];

                    var series = chart.series.push(new am4charts.PictorialStackedSeries());
                    series.dataFields.value = "value";
                    series.dataFields.category = "name";
                    series.alignLabels = true;
                    series.orientation = "horizontal";
                    series.maskSprite.path = "M511.82,329.991c-0.256-1.212-1.064-2.244-2.192-2.784l-24.396-11.684c17.688-29.776,11.804-68.912-15.58-91.88 c-53.756-45.084-131.696-70.936-213.828-70.936c-82.128,0-160.068,25.856-213.82,70.936c-27.416,22.992-33.28,62.18-15.524,91.972 L2.276,327.203c-1.128,0.54-1.936,1.572-2.192,2.792c-0.256,1.22,0.08,2.496,0.896,3.436l21.204,24.388 c0.764,0.88,1.868,1.376,3.02,1.376c0.084,0,0.172,0,0.26-0.008c1.244-0.084,2.384-0.74,3.072-1.776l14.852-22.376 c12.648,10.112,28.392,15.776,44.916,15.776c16.872,0,33.284-5.98,46.232-16.836c27.828-23.34,73.172-37.272,121.288-37.272 c48.12,0,93.464,13.932,121.296,37.272c12.944,10.856,29.36,16.836,46.228,16.836c16.596,0,32.4-5.724,45.08-15.916l14.94,22.512 c0.692,1.04,1.824,1.696,3.076,1.776c0.084,0.008,0.172,0.008,0.256,0.008c1.156,0,2.256-0.496,3.02-1.376l21.2-24.388C511.74,332.487,512.068,331.211,511.82,329.991z";

                });

            });
        });



    }]);
