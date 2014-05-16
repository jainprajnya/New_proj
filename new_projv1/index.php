<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head> 
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/> 

<title>Using Highcharts with PHP and MySQL</title>
<link href="css/desktop.css" rel="stylesheet" type="text/css">
<script type="text/javascript" src="js/jquery-1.7.1.min.js" ></script>
<script type="text/javascript" src="js/highcharts.js" ></script>
<!-- <script type="text/javascript" src="js/themes/gray.js"></script> -->

<script type="text/javascript">
	var chart;
			$(document).ready(function() {
				var options = {
					chart: {
						renderTo: 'container',
						type: 'column'
					
					},
					title: {
						text:'PJ' 		
					},
					subtitle: {
						text: 'customized'
					},
					xAxis: {
						categories: []
					},
					yAxis: {
						min :0,
						title: {
							text: 'Number of people',
							align:'high'
						}
					},
					tooltip: {
                valueSuffix: ' number of people'
            },
            plotOptions: {
                column: {
                	pointPadding: 0.2,
                    borderWidth: 0,
                    pointWidth: 15,
                    dataLabels: {
                        enabled: true
                    },
                    series: {

                    }
                  
                }
            },

				series: [{
						name:'Poor',data:[]
					},{ name: 'Average',data:[]},{name:'Good',data:[]}]
				}
				 

				
				var response = [{"name":"overview1","graphId":"b1d1feb2-007f-4179-a4d4-db150b2d262b","attributeList":[0,1,2],"filterList":[3]},
								{"name":"overview2","graphId":"b1d1feb2-007f-4179-a4d4-db150b2d262b","attributeList":[0,1,2],"filterList":[3]},
								{"name":"overview3","graphId":"b1d1feb2-007f-4179-a4d4-db150b2d262b","attributeList":[0,1,2],"filterList":[3]},
								{"name":"overview4","graphId":"b1d1feb2-007f-4179-a4d4-db150b2d262b","attributeList":[0,1,2],"filterList":[3]},
								{"name":"overview5","graphId":"b1d1feb2-007f-4179-a4d4-db150b2d262b","attributeList":[0,1,2],"filterList":[3]},
								{"name":"overview6","graphId":"b1d1feb2-007f-4179-a4d4-db150b2d262b","attributeList":[0,1,2],"filterList":[3]}							
										];
	 

					// console.log(typeof response);
					// alert(response.length);
					var rows='<table id="inerTable">';
					options.title.text=response[0]["name"];
					for(var i=0;i<response.length;i++)
					{
						console.log(response[i]["name"]);
						rows+='<tr><td class="left_pannel_elem">'+response[i]["name"]+'</td></tr>';

					}
					rows+='</table>'
					$( rows ).appendTo( "#left_pannel" );
					var graphsValues=[{"b1d1feb2-007f-4179-a4d4-db150b2d262b":[
						{
						"attributeId":0,
						"name":"food",
						"listAttributeValue":[
						{"name":"poor", "value":1, "maxValue":5},
						{"name":"ok", "value":2, "maxValue":5},
						{"name":"good", "value":3, "maxValue":5},
						{"name":"better", "value":4, "maxValue":5},
						{"name":"best", "value":5, "maxValue":5}
						],
						"listDailyAttributeStatisticValues":[
						{"date":20140501, "listCountPPL":[0,1,2,3,4]},
						{"date":20140502, "listCountPPL":[0,1,2,3,4]},
						{"date":20140503, "listCountPPL":[0,1,2,3,4]},
						{"date":20140504, "listCountPPL":[0,1,2,3,4]},
						{"date":20140505, "listCountPPL":[0,1,2,3,4]},
						{"date":20140506, "listCountPPL":[0,1,2,3,4]},
						]
						},
						{
						"attributeId":1,
						"name":"service",
						"listAttributeValue":[
						{"name":"poor", "value":1, "maxValue":5},
						{"name":"ok", "value":2, "maxValue":5},
						{"name":"good", "value":3, "maxValue":5},
						{"name":"better", "value":4, "maxValue":5},
						{"name":"best", "value":5, "maxValue":5}
						],
						"listDailyAttributeStatisticValues":[
						{"date":20140501, "listCountPPL":[0,1,2,3,4]},
						{"date":20140502, "listCountPPL":[0,1,2,3,4]},
						{"date":20140503, "listCountPPL":[0,1,2,3,4]},
						{"date":20140504, "listCountPPL":[0,1,2,3,4]},
						{"date":20140505, "listCountPPL":[0,1,2,3,4]},
						{"date":20140506, "listCountPPL":[0,1,2,3,4]},
						]
						},
						{
						"attributeId":2,
						"name":"ambience",
						"listAttributeValue":[
						{"name":"poor", "value":1, "maxValue":5},
						{"name":"ok", "value":2, "maxValue":5},
						{"name":"good", "value":3, "maxValue":5},
						{"name":"better", "value":4, "maxValue":5},
						{"name":"best", "value":5, "maxValue":5}
						],
						"listDailyAttributeStatisticValues":[
						{"date":20140501, "listCountPPL":[0,1,2,3,4]},
						{"date":20140502, "listCountPPL":[0,1,2,3,4]},
						{"date":20140503, "listCountPPL":[0,1,2,3,4]},
						{"date":20140504, "listCountPPL":[0,1,2,3,4]},
						{"date":20140505, "listCountPPL":[0,1,2,3,4]},
						{"date":20140506, "listCountPPL":[0,1,2,3,4]},
						]
						},
						{
						"attributeId":3,
						"name":"Experience",
						"listAttributeValue":[
						{"name":"poor", "value":1, "maxValue":5},
						{"name":"ok", "value":2, "maxValue":5},
						{"name":"good", "value":3, "maxValue":5},
						{"name":"better", "value":4, "maxValue":5},
						{"name":"best", "value":5, "maxValue":5}
						],
						"listDailyAttributeStatisticValues":[
						{"date":20140501, "listCountPPL":[0,1,2,3,4]},
						{"date":20140502, "listCountPPL":[0,1,2,3,4]},
						{"date":20140503, "listCountPPL":[0,1,2,3,4]},
						{"date":20140504, "listCountPPL":[0,1,2,3,4]},
						{"date":20140505, "listCountPPL":[0,1,2,3,4]},
						{"date":20140506, "listCountPPL":[0,1,2,3,4]},
						]
						}
						]}];			 	
				// response=JSON.parse(response);
				
				var a= response.data;
				// console.log(typeof a);
			var basic_attributes = new Array();
			var graphId="";
			 
				// for(elem in response)
				//  {
					 	 
			// 		 	basic_attributes[elem]=response.data[elem];
							for(innerElem in response[0])
							{
								
								if (innerElem=="graphId")
									{graphId=response[0][innerElem];}
								if(innerElem=="attributeList")
								{
									// sconsole.log(response[elem][innerElem]);
										makeGraph(response[0][innerElem],graphId);
										//console.log(response[elem][innerElem][attribute]);
									}
					 	// console.log(typeof elem);
					 			}
			 		 		
			 		 // }
					
					function makeGraph(graphId)
					{
						// api call to that graph_id
						for(elem in graphsValues)
						{
							for (attributes in graphsValues[elem])
								{
									// console.log(graphsValues[elem][attributes]);
									// options.xAxis.categories.push();
								for(values in graphsValues[elem][attributes])
									{
											// console.log(graphsValues[elem][attributes][values]["name"]);
											 options.xAxis.categories.push(graphsValues[elem][attributes][values]["name"]);
											 //if attribute_id in filterList setFilters/createFilters
											 setDataOfSeries(graphsValues[elem][attributes][values]["listDailyAttributeStatisticValues"]);
											 // console.log(graphsValues[elem][attributes][values]["listDailyAttributeStatisticValues"]);
											// return graphsValues[elem][attributes][values];
										}

								}
							}
						// console.log(options.xAxis.categories);
						 //options.xAxis.categories.push('Food','Service');
						 options.series[0].data.push(3,4,6,7);
						options.series[1].data.push(5,6,3,4);
					 options.series[2].data.push(7,8,1,5);
						// console.log(options.series);
						 // 

					}

					function setDataOfSeries(array_of_data_date_wise)
					{
						setDate(array_of_data_date_wise[0]["date"],array_of_data_date_wise[array_of_data_date_wise.length-1]["date"]);
						for(values in array_of_data_date_wise)
						{
						
						}

					}

					function setDate(from_date, to_date)
					{

						var from_year = parseInt(from_date/10000);
						var from_month = parseInt((from_date%10000) / 100);
						var from_day = parseInt(from_date%100);
						var from = new Date();
						from.setDate(from_day);
						from.setMonth(from_month);
						from.setFullYear(from_year);
						// console.log(from);
						// from = from_day + "/" + from_month +"/" +from_year;
						console.log(from);
						$('#from_date').attr('value', from);
						document.getElementById("from_date").valueAsDate = from;

						var to_year = to_date/10000;
						var to_month = (to_date%10000) / 100;
						var to_day = (to_date%100);
						var to = new Date();
						// console.log(to);
						document.getElementById("to_date").valueAsDate = to;


					}

				chart = new Highcharts.Chart(options);
				
			});
</script>
</head>
<?php include("header.php"); ?>

<body>
	<?php include('basic_filters.php');	?>
<table id="body_table">
	<tbody>
	<tr>
	<td id="left_pannel"></td>
	<td id="data"><div id="container" style="width: 80%; height: 300px; margin: 0 auto;" ></div></td>
	<tr>
		</tbody>
<table>
</body>
<?php include("footer.php"); ?>
</html>