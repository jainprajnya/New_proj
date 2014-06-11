var chart,graph_id,graph_type,attributeList,filterList,left_pane;
var overview_index=-1;
var rendered_attr_id=[];
var hash_obj = new Object();
var graphsValues;
var series_data=[];
var response;
var graph_type;

	var options = {
					chart: {
						type: 'column',
						renderTo:'container'
							},
						title: {
							text:''
						},
					xAxis: {
						 type: 'category',
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
			                 		   }
			                },
                    series: {
                    	allowPointSelect: true,
			                cursor: 'pointer'			                  
                
           				 }

           				},
			
				series: []

				}
				 
  
			$(document).ready(function() {
				var host = 'http://localhost:8080/feedback-review';
				 // host = 'http://192.168.1.101:8080/feedback-review';
				var graph_c = '/company';
				var company_id = '/1';
				var params ='/graphs?callback=?'
				var uri='';
				var response1= $.ajax({
			          url: uri.concat(host,graph_c,company_id,params),
			          dataType: 'jsonp',
			          type: 'GET',
			          cache: false,
			          jsonp: 'handle_data',
			          crossDomain:true,
			          async:false,
			          success: function( response_g ) {
						response=response_g;
					    renderLayout(response);
				        console.log(response);
				        overview_graph = response[overview_index];
				        graph_id=overview_graph["graphId"];
				        graph_type=overview_graph["type"];
				        attributeList= overview_graph["attributeList"];
				        filterList=overview_graph["filterList"];
				        graph_name=overview_graph["name"]
				        // console.log(graph_type);
				        set_container_id(0);
				        collect_stats_populate_graph(graph_id,attributeList,filterList);
    			}	
			});
				$(".left_pannel_elem").live('click',function (){
					console.log("in trends");
					
					    var params_index= get_params_index(this.id,response);
					    // console.log(params_index);
					    console.log(response[params_index]["type"]);
					    graph_type=response[params_index]["type"];
						collect_stats_populate_graph(this.id,response[params_index]["attributeList"],response[params_index]["filterList"]);

					});


});

			function renderLayout(response)
			{
				var rows='<table id="inerTable">';
				for(var i=0;i<response.length;i++)
					{
						// console.log(response[i]["name"]);
						rows+='<tr><td class="left_pannel_elem" id='+response[i]["graphId"]+' name='+response[i]["name"]+'>'+response[i]["name"]+'</td></tr>';
						if (response[i]["name"]=="overview"){overview_index=i;}
					}
					rows+='</table>'
					$(rows).appendTo( "#left_pannel" );				
			}

			function set_container_id(parent)
			{
				var container_id='';
				// console.log(document.getElementById("container_graph"));
				document.getElementById("container_graph_child").id=container_id.concat(graph_name,'_level_',parent);			
			}
		
			function collect_stats_populate_graph(graph_id,attributeList,filterList)
					{

						options.xAxis.categories=[];
						set_chart_type();
						hash_obj = new Object();
						var host = 'http://localhost:8080/feedback-review/company/1/graph/';
						var uri='';
						populate_filter(filterList);
					 // host = 'http://192.168.1.101:8080/feedback-review';
						params='/statistics?callback=?'
						$.ajax({
						          url: uri.concat(host,graph_id,params),
						          dataType: 'jsonp',
						          type: 'GET',
						          cache: false,
						          jsonp: 'handle_data',
						          crossDomain:true,
						          async:false,
						          success: function( graphsValues ) {
							        console.log(graphsValues);
							        make_graph_obj(graphsValues,attributeList,filterList);
									if(graph_type=="normal")
										set_data_of_series(hash_obj,-1,"listCountPPl_7Days",null);
									else if(graph_type=="trend")
										set_data_of_series(hash_obj,-1,"listDailyAttributeStatisticValues",7);
									set_date("listCountPPl_7Days");
			    			}	
						});
					}
			function make_graph_obj(graphsValues,attributeList,filterList)
					{
						for(var i=0;i<attributeList.length;i++)
						{
							// console.log(attributeList[i]["attributeString"]);
							// console.log(attributeList[i]["parentId"]);
						//	console.log("inside");
						var attr_id=attributeList[i]["attributeId"];
						//console.log(attr_name);
						hash_obj[attr_id]={};
						//console.log(hash_obj);
						hash_obj[attr_id]["name"]=attributeList[i]["attributeString"];
						hash_obj[attr_id]["parent_id"]=attributeList[i]["parentId"];
						hash_obj[attr_id]["type"]=attributeList[i]["type"];
							// set_chart_xaxis(attributeList[i]["attributeString"],attributeList[i]["parentId"],attributeList[i]["attributeId"]);

							// var data =graphsValues[elem][attributes][values]["listDailyAttributeStatisticValues"];
							
							// setDataOfSeries(graphsValues[elem][attributes][values]["name"],data,hash_obj);
						}
						// console.log(graphsValues);
						for(var i=0;i<graphsValues.length;i++){
							attr_id= graphsValues[i]["attributeId"];
							hash_obj[attr_id]["listCountPPl_7Days"]=graphsValues[i]["listCountPPl_7Days"];
							hash_obj[attr_id]["listCountPPl_30Days"]=graphsValues[i]["listCountPPl_30Days"];
							hash_obj[attr_id]["listCountPPl_365Days"]=graphsValues[i]["listCountPPl_365Days"];
							hash_obj[attr_id]["listDailyAttributeStatisticValues"]=graphsValues[i]["listDailyAttributeStatisticValues"];
							hash_obj[attr_id]["listMonthlyAttributeLevelStatisticValues"]=graphsValues[i]["listMonthlyAttributeLevelStatisticValues"];
							// set_chart_xaxis(hash_obj[attr_id]["name"],hash_obj[attr_id]["parent_id"],attr_id);
						}
						 // console.log(graph_type);						
					}		
					
					function set_data_of_series(hash_obj,parent_id,period,days)
					{
						
						var category_ids=[];
						options.xAxis.categories=[];
						series_data=[];
						
						var series_name_array=["POOR","AVG","GOOD"];
						for(var i=0;i<series_name_array.length;i++)
						{
							var temp={data:[],
							showInLegend:true,
							name: series_name_array[i],
							point:{events: { 'click': function(e) {alert(this.category); makeSubGraph(this.category); } }}
                   			 	}
							series_data.push(temp);
						}
						//console.log(array_of_data_date_wise);
						// console.log(hash_obj);
						// console.log(series_data);
						for(attr_id in hash_obj){
							
							if(hash_obj[attr_id]["parent_id"]==parent_id ){
								options.xAxis.categories.push(hash_obj[attr_id]["name"]);
								category_ids.push(parseInt(attr_id));
								// console.log(hash_obj[attr_id][period][0]);
								if(graph_type=="normal")	
									handle_normal_graph(hash_obj,attr_id,period);
							  	else if(graph_type=="trend")
							  		handle_trend_graph(hash_obj,attr_id,period,days);
						  }
						}
						if(category_ids.length!=0)
						{
						set_chartseries_data(category_ids,hash_obj);
						make_chart(options);
					}
						
						
					}
					function handle_normal_graph(hash_obj,attr_id,period){
						var a=0,b=0,c=0;
						if(hash_obj[attr_id]["type"]=="weighted")
								{
								 a+=hash_obj[attr_id][period][0]+hash_obj[attr_id][period][1];
								 b+=hash_obj[attr_id][period][2];
								 c+=hash_obj[attr_id][period][3]+hash_obj[attr_id][period][4];

								 hash_obj[attr_id]["count_of_ppl"]=[a,b,c];

						  		}
					}

					function handle_trend_graph(hash_obj,attr_id,period,days){
						var a=0,b=0,c=0;
						console.log("data_of_series");
						  		console.log(hash_obj[attr_id][period][23]);
						  		var start;
						  		if(days==7)
						  			 start=23;
						  		else
						  			start=0;
						  			for(start;start<hash_obj[attr_id][period].length;start++)
						  				if(hash_obj[attr_id]["type"]=="weighted")
											{
											 a+=hash_obj[attr_id][period][start]["listCountPPL"][0]+hash_obj[attr_id][period][start]["listCountPPL"][1];
											 b+=hash_obj[attr_id][period][start]["listCountPPL"][2];
											 c+=hash_obj[attr_id][period][start]["listCountPPL"][3]+hash_obj[attr_id][period][start]["listCountPPL"][4];
											 hash_obj[attr_id]["count_of_ppl"]=[a,b,c];
									  		}
					}
					function set_chartseries_data(category_ids,hash_obj){
						
						for (var id in category_ids)
						{
							// console.log(series_data);
							for(var i in series_data){
								// console.log("here");
								// console.log(series_data[i]["data"]);
								// console.log(hash_obj[id]["count_of_ppl"]);
							series_data[i]["data"].push(hash_obj[id]["count_of_ppl"][i]);
							// console.log(series_data[i]["data"]);
							}
						}
						console.log(options.xAxis.categories);
						options.series=series_data;

					}
					function make_chart(options)
					{
						 console.log("here");
						chart = new Highcharts.Chart(options);
						populate_summary(options);
					}
					function populate_summary(options){
						var tbl=document.getElementById("summay_table");
						var row='<tr><th class="cell_with_border">'+'Summmary'+'</th>';
						console.log("in summ");
						console.log(options);
						for(var i in options.xAxis.categories)
							row+='<th class="cell_with_border">'+ options.xAxis.categories[i]+'</th>';
						row+='</tr>';
						for(var data in options.series)
						{
							console.log(options.series[data]);
							row+='<tr><td class="cell_with_border">'+options.series[data]["name"]+'</td>';
							for(var i in options.series[data]["data"])
								row+='<td>'+options.series[data]["data"][i]+'</td>';
							row+='</tr>';
						}
						tbl.innerHTML=row;
							
					}

					function populate_filter(filterList){
						var filter = document.getElementById("other_filters");
						var filters='';
						for(var i in filterList)
						{
							filters+=filterList[i]["attributeString"]+': <select id="filter_selcetd"><option>select</option>';
							for(var j in filterList[i]["attributeValues"])
								{filters+='<option>'+filterList[i]["attributeValues"][j]["name"]+'</option>';
								console.log(filterList[i]["attributeValues"][j]["name"]);}
							filters+='</select>';
						}
						console.log(filters);
						filter.innerHTML=filters;
						// $('#filter_selcetd').live('onChange', function(){
						// 	alert(this.value);
						// });


					}
					$(document).on('change', 'select', function () {
    					alert(this.value);
					});
						function get_params_index(id,response)
					{
						console.log
						for(var i=0;i<response.length;i++)
							{
								
								if (response[i]["graphId"]==id){return i;}

							}
							
							return -1;

					}
					function makeSubGraph(whose_subgraph)
					{
						var child_found=-1;
						var my_id=-1;
						for(id in hash_obj)
						{

							if(hash_obj[id]["name"]==whose_subgraph){
								parent_id=id;
							}
						}
						
						set_graph_level(parent_id);
						console.log(parent_id);
						set_data_of_series(hash_obj,parent_id,"listCountPPl_7Days")

					}

					function set_graph_level(child,parent)
			{
				var node= document.getElementById("container_graph");
						var child = node.firstChild;
									
			}

					function set_chart_type()
					{
						console.log("here");
						console.log(graph_type);
						if (graph_type=='normal')
							{
								options.chart.type='column'; 
								var series_names=["POOR","AVG","GOOD"];
							}
						else if (graph_type=='trend')
							{
								options.chart.type='line'; 
							}
					}

					function set_chart_name()
						{
							options.title.text='';
						}

					function set_chart_xaxis(xaxis_category,parent_id,attr_id)
					{
						var node= document.getElementById("container_graph");
						var child = node.firstChild;
						var id_name= child.id;
						// console.log(id_name.split("_")[2]);
						if(parent_id==parseInt(id_name.split("_")[2])-1)
						{options.xAxis.categories.push(xaxis_category);rendered_attr_id.push(attr_id);}
					}	

					function find_in_array(array,value){
						for(var i=0;i<array.length;i++)
						{
							if(value==array[i])
								return true;
						}
						return false;
					}



					function set_date(period)
					{
						var to = new Date();
						//var dateOffset = (24*60*60) * 7;
						var from = new Date();
						var ndays=-1;
						if(period=="listCountPPl_7Days"){ ndays=7;}
						else if(period=="listCountPPl_30Days") {ndays=30;}
						else if(period=="listCountPPl_365Days") {ndays=365;}
						from = new Date(from.setDate(to.getDate()-ndays));
						var from_to = "FROM : " + from.toDateString() + "  TO : "+ to.toDateString();
						document.getElementById("period").innerHTML= from_to;
						// console.log(to.toDateString());
						// console.log(from.toDateString());

					}

					$('.timeline').live('click',function(){
						if(graph_type=="normal")
						{
						if(this.id=="daily"){set_data_of_series(hash_obj,-1,"listCountPPl_7Days",null);set_date("listCountPPl_7Days");}
						else if(this.id=="weekly"){set_data_of_series(hash_obj,-1,"listCountPPl_30Days",null);set_date("listCountPPl_30Days");}
						else if(this.id=="monthly"){set_data_of_series(hash_obj,-1,"listCountPPl_365Days",null);set_date("listCountPPl_365Days");}
						}
						else if(graph_type=="trend")
						{
						if(this.id=="daily"){set_data_of_series(hash_obj,-1,"listDailyAttributeStatisticValues",7);set_date("listCountPPl_7Days");}
						else if(this.id=="weekly"){set_data_of_series(hash_obj,-1,"listDailyAttributeStatisticValues",30);set_date("listCountPPl_30Days");}
						else if(this.id=="monthly"){set_data_of_series(hash_obj,-1,"listMonthlyAttributeLevelStatisticValues",365);set_date("listCountPPl_365Days");}
						}
						
					});


					

					
