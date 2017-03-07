'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}]).
directive('lineChart', function () {
    return {
        restrict: 'E',
        template: '<div></div>',
        scope: {
            options: '='
        },
        link: function (scope, element) {
            Highcharts.chart(element[0], scope.options);
        }
    };
}).
// Directive for pie charts, pass in title and data only    
directive('barChart', function () {
    return {
        restrict: 'E',
        template: '<div></div>',
        scope: {
            title: '@',
            data: '='
        },
        link: function (scope, element) {
            Highcharts.chart(element[0], {
                chart: {
        			type: 'column',
        			width: 680,
        			height: 289
    			},
			    title: {
			        text: 'Count by zones',
			        style: {
		            color: '#79B3E8',
		        },
		        align: 'left',
			    },
			    xAxis: {
			        categories: [
			            '1',
			            '2',
			            '3',
			            '4',
			            '5',
			            '6',
			            '7',
			            '8'
			        ],
			        crosshair: true
			    },
			    yAxis: {
			        min: 0,
			        title: {
			            text: ''
			        }
			    },
			    tooltip: {
			        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
			        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
			            '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
			        footerFormat: '</table>',
			        shared: true,
			        useHTML: true
			    },
			    plotOptions: {
			        column: {
			            pointPadding: 0.2,
			            borderWidth: 0
			        }
			    },
			    series: [{
			        data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5]

			    }]
			            });
			        }
			    };
})
// Directive for pie charts, pass in title and data only    
.directive('hcPieChart', function () {
    return {
        restrict: 'E',
        template: '<div></div>',
        scope: {
            title: '@',
            data: '='
        },
        link: function (scope, element) {
            Highcharts.chart(element[0], {
                chart: {
                    type: 'pie',
                    width: 240,
                    height: 290
                },
                title: {
                    text: scope.title
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: false,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: false,
                            format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                        }
                    }
                },
                series: [{
                    data: scope.data
                }]
            });
        }
    };
})
.controller('View1Ctrl', ['$scope', function($scope) {
	var data = [
		{"zoneId":"Calle 85", "data":{"count":1,"speed":10,"time":1466781876681}},
		{"zoneId":"Salitre plaza", "data":{"count":2,"speed":8.5,"time":1466781876681}},
		{"zoneId":"Parque 93", "data":{"count":4,"speed":15,"time":1466781876681}},
		{"zoneId":"Calle 80", "data":{"count":3,"speed":13.5,"time":1466781876681}},
		{"zoneId":"Centro", "data":{"count":1,"speed": 9 ,"time":1466781876681}}
	]
	Highcharts.setOptions({
	    colors: ['#589FEE', '#ff0000', '#78D146', '#DE71E0', '#FDAF55']
	});
	var i =0;
	var time = [], speed = [], count = [];
	for(i = 0; i<data.length; i++) {
		var currentDate = new Date(data[i].data.time);
		var currentTime = currentDate.toTimeString();
		time.push(currentTime);
		speed.push(data[i].data.speed);
		count.push(data[i].data.count);
	}

    $scope.chartOptions = {
    	chart: {
    		width: 940,
    		height: 262
    	},
    	legend: {
	        align: 'right',
	        verticalAlign: 'top',
	        layout: 'vertical',
	        x: 0,
	        y: 100
	    },
        title: {
            text: 'Speed zones',
            style: {
		            color: '#79B3E8',
		        },
		        align: 'left',
        },
        xAxis: {
            categories: currentTime
        },
        yAxis: {
        	categories: speed,
        	title: {
	            text: ''
	        }
        },
        // series: [{count}]

        series: [{
            data: [29.9, 71.5, 16.4, 19.2, 44.0, 76.0, 35.6, 90]
        }, 
        {
            data: [60, 30, 80, 10, 40, 64, 65, 93]
        },
        {
            data: [65, 35, 85, 15, 45, 65, 61, 90]
        },
        {
            data: [69, 36, 20, 30, 90, 54, 75, 83]
        }, {
            data: [32, 50, 34, 17, 42, 24, 62, 13]
        }]
    };

    // Sample data for pie chart
    $scope.pieData = [{
        name: "Zone 1",
        y: 24.03,
        sliced: true,
        selected: true
    }, {
        name: "Zone 2",
        y: 10.38
    }, {
        name: "Zone 3",
        y: 4.77
    }, {
        name: "Zone 4",
        y: 0.91
    }]
}]);