var chart,graph_id,graph_type,left_pane;
var overview_index=-1;
var rendered_attr_id=[];
var series_data=[];
var graph_type;
 var hash_obj={};
 var response;
 var applyFilter=[];
 response_d={}
 var active_div="statistics"
	var options = {
					chart: {
						type: 'column',
						renderTo:'container_data',
						 // backgroundColor: '#30D5C8'
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
							text: 'Number of feedbacks',
							// align:'left'
						}
					},
					tooltip: {
                		valueSuffix: ' number of feedbacks'
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
                    	
                pointWidth: 25,
                pointPadding: 0,
			                cursor: 'pointer'			                  
                
           				 }

           				},
			
				series: []

				}
				 
  
			$(document).ready(function() {


				// console.dir(e);
				var host = 'http://localhost:8080/feedback-review';
				var graph_c = '/company';
				var company_id = '/1';
				var params ='/graphs?callback=?'
				var uri='';
				var dashboard_stats = $.ajax({
					  url: uri.concat(host,graph_c,company_id,"/dashboard?callback=?"),
			          dataType: 'jsonp',
			          type: 'GET',
			          cache: false,
			          jsonp: 'handle_data',
			          crossDomain:true,
			          async:false,
					  success: function(response){
					  	response_d=response;
					  	dashboard_details('today');
					  }
				});
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
					    // console.log(response);
				        overview_graph = response[overview_index];
				        graph_id=overview_graph["graphId"];
				        graph_type=overview_graph["type"];
				        attributeList= overview_graph["attributeList"];
				        filterList=overview_graph["filterList"];
				        graph_name=overview_graph["name"]
				        set_graph_level(-1);
						$("div#quick_links").append(' > <a class="back_link" id="-2" href="index_new.php" >overview</a>');
				        plot_graph(response[overview_index]);
    			}	
			});
				$('a.filter_list_input').live('click',function (){
								addFilter(this.id,this.name);
								make_graph_with_filters();
					});

				$('.label').live('click',function (){

						var params_index= get_params_index(this.id,response);
					    applyFilter=[];
					    graph_type=response[params_index]["type"];
					    set_graph_level(-1);
					    graph_name=response[params_index]["name"];
						collect_stats_populate_graph(this.id,response[params_index]["attributeList"],response[params_index]["filterList"],applyFilter);

				});
		});
			function make_graph_with_filters(){
				applyFilter=[];
				var param=(document.getElementsByName("id_identify_div")[0].id).split("_")[1];								
				var params_index= get_params_index(param,response);								
				setFilter(applyFilter);
				collect_stats_populate_graph(param,response[params_index]["attributeList"],response[params_index]["filterList"],applyFilter);

			}
			function renderLayout(response)
			{
				var rows='';
				for(var i=0;i<response.length;i++)
					{
						rows+='<a class="top_pannel fancy-font" style="float: center;" id='+response[i]["graphId"]+' name='+response[i]["name"]+'>'+response[i]["name"]+'</a>';
						if (response[i]["name"]=="overview"){overview_index=i;}
					}
				// 	rows+='<a class="top_pannel fancy-font" style="float: center;" id="fake1" name="fake11"> Fake1</a>';
				// 	rows+='<a class="top_pannel fancy-font" style="float: center;" id="fake2" name="fake12"> Fake2</a>';
					// rows+='<a class="top_pannel fancy-font" style="float: center;" id="fake3" name="fake13"> Fake3</a>';
					// rows+='<a class="top_pannel fancy-font" style="float: center;" id="fake4" name="fake14"> Fake4</a>';
					// rows+='<a class="top_pannel fancy-font" style="float: center;" id="fake5" name="fake15"> Fake5</a>';
					// rows+='<a class="top_pannel fancy-font" style="float: center;" id="fake6" name="fake16"> Fake6</a>';
					// rows+='<a class="top_pannel fancy-font" style="float: center;" id="fake7" name="fake17"> Fake7</a>';
					// rows+='<a class="top_pannel fancy-font" style="float: center;" id="fake8" name="fake18"> Fake8</a>';
					// rows+='<a class="top_pannel fancy-font" style="float: center;" id="fake9" name="fake19"> Fake9</a>';
					// rows+='<a class="top_pannel fancy-font" style="float: center;" id="fake10" name="fake110"> Fake10</a>';
					// rows+='<a class="top_pannel fancy-font" style="float: center;" id="fake11" name="fake111"> Fake11</a>';
					// rows+='<a class="top_pannel fancy-font" style="float: center;" id="fake12" name="fake112"> Fake12</a>';
					// $('div.top_pannel_div').append(rows);			
			}

			function plot_graph(main_graph)
			{
				populate_filter(main_graph["filterList"]);
				collect_stats_populate_graph(main_graph["graphId"],main_graph["attributeList"],main_graph["filterList"],applyFilter);

			}

			function set_graph_level(parent)
			{
				var container_parentid='';
				var container_graphid='';
				document.getElementsByName("level_identify_div")[0].id=container_parentid.concat(graph_name,'_level_',parent);
				document.getElementsByName("id_identify_div")[0].id=container_graphid.concat(graph_name+"_"+graph_id);
			}
		    
			function collect_stats_populate_graph(graph_id,attributeList,filterList,applyFilter)
					{						
						options.xAxis.categories=[];
						set_chart_type();
						
						var host = 'http://localhost:8080/feedback-review/company/1/graph/';
						var uri='';
						graphsValues={};
					 	var response11;
					 	filters_g='';
					 	// console.log("in stats"+applyFilter);
					 	for(var i=0;i< applyFilter.length;i++)
					 	{
					 		filters_g+=applyFilter[i]+"="+applyFilter[i+1]+"&";
					 		i++;
					 	}
					
						params='/statistics?'+filters_g+'callback=?'
						$.ajax({
						          url: uri.concat(host,graph_id,params),
						          dataType: 'jsonp',
						          type: 'GET',
						          cache: false,
						          jsonp: 'handle_data',
						          crossDomain:true,
						          async: false,
						          
						          success: function( pass ) {
							        // console.log("query to  graph id "+ graph_id+" : ");
							         response11=pass;
							         var graphsValues= '';
							          // console.log(response11);
							        
									make_graph_obj(response11,attributeList,filterList,hash_obj);
									if(graph_type=="normal")
										set_data_of_series_normal(hash_obj,-1,"listCountPPl_7Days",null);
									else if(graph_type=="trend")
										set_data_of_series_trends(hash_obj,-1,"listDailyAttributeStatisticValues",7);
									set_date("listCountPPl_7Days");
							         
			    			}	
						});
						  
					}
			function make_graph_obj(uff,attributeList,filterList,hash_obj)
					{
						
						for(var i=0;i< attributeList.length;i++)
						{						  
						var attr_id=attributeList[i]["attributeId"];
						hash_obj[attr_id]=new Object();
						hash_obj[attr_id].name=attributeList[i]["attributeString"];
						hash_obj[attr_id]["parent_id"]=attributeList[i]["parentId"];
						hash_obj[attr_id]["type"]=attributeList[i]["type"];							
						}
						
						for(var i=0;i<uff.length;i++){	
							attr_id= uff[i]["attributeId"];
							hash_obj[attr_id]["listCountPPl_7Days"]=uff[i]["listCountPPl_7Days"];
							hash_obj[attr_id]["listCountPPl_30Days"]=uff[i]["listCountPPl_30Days"];
							hash_obj[attr_id]["listCountPPl_365Days"]=uff[i]["listCountPPl_365Days"];
							hash_obj[attr_id]["listDailyAttributeStatisticValues"]=uff[i]["listDailyAttributeStatisticValues"];
							hash_obj[attr_id]["listMonthlyAttributeLevelStatisticValues"]=uff[i]["listMonthlyAttributeLevelStatisticValues"];
						}
						 				
					}		
					
					function set_data_of_series_normal(hash_obj,parent_id,period,days)
					{
						
						var category_ids=[];
						options.xAxis.categories=[];
						series_data=[];
						var series_name_array=["POOR","AVG","GOOD"];
						// var color_array=[];
						var color_array=['#00B233','#FF7400','#FFCE00'];
						var child_found=-1;
						for(var i=0;i<series_name_array.length;i++)
						{
							var temp={data:[],
							showInLegend:true,
							name: series_name_array[i],
							color: color_array[i],
							point:{events: { 'click': function(e) {  makeSubGraph(this.category); } }}
                   			 	}
							series_data.push(temp);							
						}

						for(attr_id in hash_obj){
							
							if(hash_obj[attr_id]["parent_id"]==parent_id ){
								child_found=1;
								set_graph_level(parent_id);								
								handle_normal_graph(hash_obj,attr_id,period);
								options.xAxis.categories.push(hash_obj[attr_id]["name"]);
								category_ids.push(parseInt(attr_id));  	
						  }
						}
						// console.log(category_ids);
						if(category_ids.length!=0)
						{
						if(graph_type=="normal")	
							set_chartseries_data_normal(category_ids,hash_obj);
					    else
					    	set_chartseries_data_trends(category_ids,hash_obj,series_name_array);
						make_chart(options);
					}
						
						
					}

					function set_chartseries_data_normal(category_ids,hash_obj){
						
						for (var id in category_ids)
						{
							
							for(var i in series_data)
							{
								series_data[i]["data"].push(hash_obj[category_ids[id]]["count_of_ppl"][i]);
							}
						}
						options.series=series_data;
					}

					function set_data_of_series_trends(hash_obj,parent_id,period,days)
					{
						var child_found=-1;
						var category_ids=[];
						options.xAxis.categories=[];
						series_data=[];
						
						var series_name_array=[];
						var start;
						  		if(days==7)
						  			 start=23;
						  		else
						  			start=0;

						for(start;start<hash_obj[0][period].length;start++)
						{
							options.xAxis.categories.push(hash_obj[0][period][start]["date"]);
							series_name_array.push(hash_obj[0][period][start]["date"]);
						}

						for(attr_id in hash_obj)
						{
							if(hash_obj[attr_id]["parent_id"]==parent_id ){
								child_found=1;
								set_graph_level(parent_id);
								var temp={data:[],
							showInLegend:true,
							name: hash_obj[attr_id]["name"],
							point:{events: { 'click': function(e) {makeSubGraph(this.category); } }}
                   			 	}
								series_data.push(temp);
								handle_trend_graph(hash_obj,attr_id,period,days);
								category_ids.push(parseInt(attr_id));
										
									}
							  	
						  }
						
						
						if(category_ids.length!=0)
						{
							set_chartseries_data_trends(category_ids,hash_obj,series_name_array);
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

					function handle_trend_graph(hash_obj,attr_id,period,days)
					{
						var a=0;var b=0;var c=0;var n=0;var avg=0;
						var start;
						if(days==7)
						  	start=23;
						else
						  	start=0;

						  		for(start;start<hash_obj[attr_id][period].length;start++)
						  				{
						  					if(hash_obj[attr_id]["type"]=="weighted")
											{
												hash_obj[attr_id][hash_obj[attr_id][period][start]["date"]]= {} ;
												for(var i =1; i<=hash_obj[attr_id][period][start]["listCountPPL"].length;i++)
											     {
											     a+=(i*(hash_obj[attr_id][period][start]["listCountPPL"][i-1]));
											     n+=hash_obj[attr_id][period][start]["listCountPPL"][i-1];


											     if (n!=0)
											     	hash_obj[attr_id][hash_obj[attr_id][period][start]["date"]]["count_of_ppl"]= parseInt(a/n) ;
											     else
											     	hash_obj[attr_id][hash_obj[attr_id][period][start]["date"]]["count_of_ppl"]=0;
											     
												}
												
												
											     a=0;n=0;
									  		}
									  	}
					}

					function set_chartseries_data_trends(category_ids,hash_obj,series_name_array,subgraph_name)
					{
						for(var j=0 ;j< series_name_array.length;j++)
						{
						for (var id=0; id<category_ids.length;id++)
							{
								if(graph_type=="normal")						
									series_data[id]["data"].push(hash_obj[category_ids[id]]["count_of_ppl"][j]);
								else
									series_data[id]["data"].push(hash_obj[category_ids[id]][series_name_array[j]]["count_of_ppl"]);
							}
						}
						options.series=series_data;

					}
					
					function make_chart(options)
					{
						chart = new Highcharts.Chart(options);
					}

					function populate_summary(options){
						var tbl=document.getElementById("summay_table");
						var row='<tr><th class="cell_with_border">'+'Summmary'+'</th>';
						for(var i in options.xAxis.categories)
							row+='<th class="cell_with_border">'+ options.xAxis.categories[i]+'</th>';
						row+='</tr>';
						for(var data in options.series)
						{
							row+='<tr><td class="cell_with_border">'+options.series[data]["name"]+'</td>';
							for(var i in options.series[data]["data"])
								row+='<td>'+options.series[data]["data"][i]+'</td>';
							row+='</tr>';
						}
						tbl.innerHTML=row;
							
					}

					function populate_filter(filterList){
						console.log(filterList);
						a = [{"a" : 1}]
						filterList = [{"type":"non-weighted","attributeString":"sex","parentId": -1,"attributeId":3,"attributeValues":[{"name":"male","value":1,"maxValue":-1},{"name":"female","value":2,"maxValue":-1}]},
{"type":"non-weighted","attributeString":"branch","parentId":-1,"attributeId":3,"attributeValues":[{"name":"a","value":1,"maxValue":-1},{"name":"b","value":2,"maxValue":-1},{"name":"c","value":1,"maxValue":-1}]},
{"type":"non-weighted","attributeString":"city","parentId":-1,"attributeId":3,"attributeValues":[{"name":"male","a1":1,"maxValue":-1},{"name":"b1","value":2,"maxValue":-1}]}];
						var row = document.getElementById("filter_row");
						var filters='';

						for(var i in filterList)
						{
							filters+='<td><a class="filter_dropdown_style">'+filterList[i]["attributeString"]+'</a><ul class="filter_dropdown_list" style="visibility: hidden;"> ';
							for(var j in filterList[i]["attributeValues"])
								{
									filters+='<li class="filter_list_elements"><input type="checkbox" class="filter_list_input" name='+filterList[i]["attributeString"]+' id='+filterList[i]["attributeValues"][j]["name"]+'>&nbsp;&nbsp;'+filterList[i]["attributeValues"][j]["name"]+'</input></li>';
								}
							filters+='<li class="filter_list_elements" ><a style="font-size: 11px; color: blue; float: right;"> clear </a></li></ul></td>';
							var x = row.insertCell(-1);
							x.innerHTML=filters;
							filters='';
						}
						
						
						
						$('a.filter_list_input').live('mouseover',function(){
							
							if(document.getElementById(this.id).className === "filter_list_input")
							{
								this.style.backgroundColor = "red";
							}
						});
						$('a.filter_list_input').live('mouseout',function(){
								this.style.backgroundColor = "black";
						});
				
					}
					$(document).on('change', 'select', function () {
    					// alert(this.value);
					});

					$('.filter_dropdown_style').live('click',function(){
						var elements= this.parentNode.children;
						// document.getElementsByClassName("filter_dropdown_list");
						elements[1].style.visibility=elements[1].style.visibility=="visible"?"hidden":"visible";
						for (var i = 0; i < elements[1].children.length; i++) {
						        elements[1].children[i].style.visibility=elements[1].children[i].style.visibility=="visible"?"hidden":"visible";
						    }

					});

					$('.filter_list_elements').live('click',function(){


					});

					function get_params_index(id,response)
					{
						for(var i=0;i<response.length;i++)
							{
								
								if (response[i]["graphId"]==id){return i;}

							}
							
							return -1;

					}

					function addFilter(name,value)
					{
						var element = document.getElementById(value);
						if(typeof (element) != undefined && element != null && typeof (element) != 'undefined')
						{
							element.name=name;
							element.parentNode.innerHTML=name+'<a class="display_filters_graph" id='+value+' name='+name+' >x</a>';
						}
						else
						{
							var filter='<span class="timeline">'+name+'<a class="display_filters_graph" id='+value+' name='+name+' >x</a></span>'
							$('div#display_filters').append(filter);
						}
					}
					
					function makeSubGraph(whose_subgraph)
					{

						console.log(whose_subgraph);
						for(id in hash_obj)
						{

							if(hash_obj[id]["name"]==whose_subgraph){
								parent_id=id;
							}
						}
						console.log(parent_id);
						setQuickLink(whose_subgraph);
						if (graph_type=="normal")
							set_data_of_series_normal(hash_obj,parent_id,"listCountPPl_7Days",hash_obj);
						else
							set_data_of_series_trends(hash_obj,parent_id,"listCountPPl_7Days",hash_obj);						
					}

			

					function set_chart_type()
					{
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
					}

					function setFilter(applyFilter)
					{
						
						var element= document.getElementById("display_filters");
						var filters= element.getElementsByTagName('a');
						for(var i=0;i < filters.length;i++)
						{
							applyFilter.push(filters[i].id,filters[i].name);

						}

						
					}

					function setQuickLink(category)
					{
						var level = ((document.getElementsByName("level_identify_div")[0]).id.split("_"))[2];
						if(document.getElementById("quick_links").lastChild.id!=level && document.getElementById("quick_links").lastChild.innerHTML!=category)
							$("div#quick_links").append(' > <a class="back_link" id='+level+'>'+category+'</a>');
						else 
								document.getElementById("quick_links").lastChild.innerHTML = category;
					}

					function updateFilter(filter_name)
					{
						for(var i=0;i<applyFilter.length;i=i+2)
						{
							if(applyFilter[i]==filter_name)
							{
								applyFilter.splice(i,2);
							}
						}
					}

					function dashboard_details(stats_period)
					{
						// console.log(response_d);
						if(stats_period =="today")
						{
						document.getElementById('avg_rating').innerHTML=response_d.avgRating;
					  	document.getElementById('feedbacks').innerHTML=response_d.countResponsesToday ;
					  	document.getElementById('nps').innerHTML=5 ;
					  	document.getElementById('positive').innerHTML='<span style="float:left; margin-left: 10px">positives</span><span>' + response_d.countResponsesPositiveToday+'</span><span><img src="/images/plus.png" style="height: 20px;width: 20px;float: right;margin-right: 10px;"></img></span>';
					  	document.getElementById('negative').innerHTML='<span style="float:left; margin-left: 10px">negatives</span><span >' + response_d.countResponsesNegativeToday+'</span><span><img src="/images/minus.png" style="height: 20px;width: 20px;float: right;margin-right: 10px;"></img></span>';
					  	document.getElementById('neutral').innerHTML='<span style="float:left; margin-left: 10px">neutral</span><span style="float:center;">'+ (response_d.countResponsesToday-(response_d.countResponsesPositiveToday+response_d.countResponsesNegativeToday))+'</span><span><img src="/images/plus_minus.jpeg" style="height: 20px;width: 20px;margin-right: 10px;float: right;"></img></span>';
					  	document.getElementById('promoters').innerHTML='<span style="float:left; margin-left: 10px">promoters</span><span>'  + response_d.npsPositive+'</span><span><img src="/images/like_thumnail.png" style="height: 20px;width: 20px;float: right;margin-right: 10px;"></img></span>';
					  	document.getElementById('detractors').innerHTML='<span style="float:left; margin-left: 10px">detractors</span><span>' + response_d.npsNegative+'</span><span><img src="/images/dislike_thumnail.png" style="height: 20px;width: 20px;float: right;margin-right: 10px;"></img></span>';
					  	document.getElementById('passive').innerHTML ='<span style="float:left; margin-left: 10px">passive</span><span>' + (response_d.countResponsesToday- (response_d.npsPositive+response_d.npsNegative))+'</span><span><img src="/images/neutral_thumbnail.png" style="height: 20px;width: 20px;margin-right: 10px;float: right;"></img></span>';
						}
						else
						{
						document.getElementById('avg_rating').innerHTML=response_d.avgRating;
					  	document.getElementById('feedbacks').innerHTML=response_d.countResponsesTotal ;
					  	document.getElementById('nps').innerHTML=5 ;
					  	document.getElementById('positive').innerHTML='<span style="float:left; margin-left: 5px">positives</span><span>' + response_d.countResponsesPositiveTotal+'</span><span><img src="/images/plus.png" style="height: 20px;width: 20px;float: right;margin-right: 10px;"></img></span>';
					  	document.getElementById('negative').innerHTML='<span style="float:left; margin-left: 5px">negatives</span><span>' + response_d.countResponsesNegativeTotal+'</span><span><img src="/images/minus.png" style="height: 20px;width: 20px;float: right;margin-right: 10px;"></img></span>';
					  	document.getElementById('neutral').innerHTML='<span style="float:left; margin-left: 5px">neutral</span><span style="float:center;">' + (response_d.countResponsesTotal-(response_d.countResponsesPositiveTotal+response_d.countResponsesNegativeTotal))+'</span><span><img src="/images/plus_minus.jpeg" style="height: 20px;margin-right: 10px;width: 20px;float: right;"></img></span>';
					  	document.getElementById('promoters').innerHTML='<span style="float:left; margin-left: 5px">promoters</span><span>' + response_d.npsPositive+'</span><span><img src="/images/like_thumnail.png" style="height: 20px;width: 20px;float: right;margin-right: 10px;"></img></span>';
					  	document.getElementById('detractors').innerHTML='<span style="float:left; margin-left: 5px">detractors</span><span>' + response_d.npsNegative+'</span><span><img src="/images/dislike_thumnail.png" style="height: 20px;width: 20px;float: right;margin-right: 10px;"></img></span>';
					  	document.getElementById('passive').innerHTML ='<span style="float:left; margin-left: 5px">passive</span><span>' + (response_d.countResponsesTotal- (response_d.npsPositive+response_d.npsNegative))+'</span><span><img src="/images/neutral_thumbnail.png" style="height: 20px;width: 20px;margin-right: 10px;float: right;"></img></span>';
						}
					}
					$('a.back_link').live('click',function(){
						var to_b_removed = document.getElementById("quick_links").childNodes.length - 2;
						for(var i=0;i< to_b_removed;i++)
						if(document.getElementById("quick_links").lastChild.innerHTML!=this.innerHTML)
						{
							var node=document.getElementById("quick_links").lastChild;
							var parent_node=document.getElementById("quick_links");
							parent_node.removeChild(node);
						}
						makeSubGraph(this.innerHTML);
						
					});

					$('a.display_filters_graph').live('click',function(){
						var current_node=this.parentNode;
						var parent_node=current_node.parentNode;
						parent_node.removeChild(current_node);
						updateFilter(current_node.getElementsByTagName('a')[0].id);
						make_graph_with_filters();						
					})
					$('.timeline').live('click',function(){
						elements = document.getElementsByClassName('timeline');
						    for (var i = 0; i < elements.length; i++) {
						        elements[i].style.backgroundColor="black";
						    }
						this.style.backgroundColor="#c4c71c";
						if(graph_type=="normal")
						{
						if(this.id=="week"){set_data_of_series_normal(hash_obj,-1,"listCountPPl_7Days",null);set_date("listCountPPl_7Days");}
						else if(this.id=="month"){set_data_of_series_normal(hash_obj,-1,"listCountPPl_30Days",null);set_date("listCountPPl_30Days");}
						else if(this.id=="year"){set_data_of_series_normal(hash_obj,-1,"listCountPPl_365Days",null);set_date("listCountPPl_365Days");}
						}
						else if(graph_type=="trend")
						{
						if(this.id=="week"){set_data_of_series_trends(hash_obj,-1,"listDailyAttributeStatisticValues",7);set_date("listCountPPl_7Days");}
						else if(this.id=="month"){set_data_of_series_trends(hash_obj,-1,"listDailyAttributeStatisticValues",30);set_date("listCountPPl_30Days");}
						else if(this.id=="year"){set_data_of_series_trends(hash_obj,-1,"listMonthlyAttributeLevelStatisticValues",365);set_date("listCountPPl_365Days");}
						}
						
					});

					$('a.dashboard_heading').live('click', function(){
						elements = document.getElementsByClassName('dashboard_heading');
						    for (var i = 0; i < elements.length; i++) {
						        elements[i].style.backgroundColor="#CCCCCC";
						        elements[i].style.borderBottom="";
						    }
						    this.style.backgroundColor="black";

						    this.style.marginBottom ="5px" ;
						    this.style.borderBottom ="solid 5px #00d8ff";
						    dashboard_details(this.id);
					});

					$('a#dashboard_close').live('click',function(){
						if (this.innerHTML=='hide')
						{
						document.getElementById('dashboard').style.display="none";
						document.getElementsByClassName('opaque')[0].style.height='90px';
						this.innerHTML='show';
						}
						else if(this.innerHTML='show'){
							document.getElementsByClassName('opaque')[0].style.height='400px';
						document.getElementById('dashboard').style.display="block";
						this.innerHTML='hide';
						}
					});

					$('a.marketing').live('click', function(){
						var offers='';
						header_navigation(this.className);
						console.log("in offers");
						show_offers(offers);
					});


					function show_offers(offers){
						var rows='<form><button class="marketing_btn" type="button">Add New Offer</button><button type="button" class="marketing_btn">Submit</button>'
						rows+='<table class="marketing_offers">';
						rows+='<tr>'
						rows+='<th>Select All</th>';
						rows+='<th>Category</th>';
						rows+='<th>Offer Details</th>';
						rows+='<th>Start Date/Time</th>';
						rows+='<th>End Date/Time</th>';
						rows+='<th>Recurrence</th>';
						rows+='<th>Disable</th>';
						rows+='</tr>';
							var host = 'http://localhost:8080/feedback-review';
				var graph_c = '/company';
				var company_id = '/1';
				var params ='/offersAndInfo?callback=?'
				var uri='';
						var offers_res = $.ajax({
					  url: uri.concat(host,graph_c,company_id,"/offersAndInfo?callback=?"),
			          dataType: 'jsonp',
			          type: 'GET',
			          cache: false,
			          jsonp: 'handle_data',
			          crossDomain:true,
			          async:false,
					  success: function(response){
					  	offersRes=response;
					  	for(var i in offersRes){
					  		console.log(offersRes[i]);
							rows+='<tr>'
							rows+='<td class="offers_row"><input type="checkbox">Select</input></td>';
							rows+='<td class="offers_row">'+offersRes[i]["type"]+'</td>';
							rows+='<td class="offers_row">'+offersRes[i]["details"]+'</td>';
							rows+='<td class="offers_row">'+offersRes[i]["start"]+'</td>';
							rows+='<td class="offers_row">'+offersRes[i]["end"]+'</td>';
							rows+='<td class="offers_row">'+offersRes[i]["recurrence"]+'</td>';
							rows+='<td class="offers_row"><img></img></textarea></td>';
							rows+='</tr>';
						}
						rows+='</table>';
						$('div#body_table').html(rows);
					  	console.log(response);
					  }
				});
						
						

					}

					$('a.profile').live('click', function(){
						console.log("in profile");
						header_navigation(this.className);
					});

					$('a.followup').live('click', function(){
						console.log(active_div);
						header_navigation(this.className);
						console.log("in followup");
						var rows='<p class="followup_title">Negative Followup</p><form><button class="profile_btn" type="button">Followup Email-id</button><button type="button" class="profile_btn">Branch - 5</button>'
						rows+='<table class="followup">';
						rows+='<tr>'
						rows+='<th>Name</th>';
						rows+='<th>Email-id/contact no.</th>';
						rows+='<th>Rating</th>';
						rows+='<th>Comment</th>';
						rows+='<th>Status</th>';
						rows+='<th>Customer response</th>';
						rows+='<th>Action taken</th>';
						rows+='</tr>';

						followupRes = [{"Name":"abc","email":"mayaj@gmail.com","contact": 1234567,"rating":[{"food":2,"service":2,"ambience":2}],"comment":"service was good", "status" : "pending", "customer_response" : "abcdefg", "action_taken" : "done from our side"},
										{"Name":"xyz","email":"indravadhanj@gmail.com","contact": 1234567,"rating":[{"food":2,"service":2,"ambience":2}],"comment":"service was good", "status" : "pending", "customer_response" : "abcdefg", "action_taken" : "done from our side"},
										{"Name":"pqr","email":"rosheshj@gmail.com","contact": 1234567,"rating":[{"food":2,"service":2,"ambience":2}],"comment":"service was good", "status" : "pending", "customer_response" : "abcdefg", "action_taken" : "done from our side"},
										{"Name":"lmn","email":"monishaj@gmail.com","contact": 1234567,"rating":[{"food":2,"service":2,"ambience":2}],"comment":"service was good", "status" : "pending", "customer_response" : "abcdefg", "action_taken" : "done from our side"},
										{"Name":"ooo","email":"sahilj@gmail.com","contact": 1234567,"rating":[{"food":2,"service":2,"ambience":2}],"comment":"service was good", "status" : "pending", "customer_response" : "abcdefg", "action_taken" : "done from our side"}];
						;
						for(var i in followupRes){
							rows+='<tr>'
							rows+='<td class="profile_row">'+followupRes[i]["Name"]+'</td>';
							rows+='<td class="profile_row">'+followupRes[i]["email"]+'</td>';
							rows+='<td class="profile_row">'+followupRes[i]["rating"]+'</td>';
							rows+='<td class="profile_row">'+followupRes[i]["comment"]+'</td>';
							rows+='<td class="profile_row">'+followupRes[i]["status"]+'</td>';
							rows+='<td class="profile_row"><textarea>'+followupRes[i]["customer_response"]+'</textarea></td>';
							rows+='<td class="profile_row"><textarea>'+followupRes[i]["action_taken"]+'</textarea></td>';
							rows+='</tr>';
						}

						rows+='</table></form>';
						rows+='<div class="more_followup"> Load more followups</div>';
						$('div#body_table').html(rows);


						
					});

					$('a.analysis').live('click', function(){
						console.log("in analysis");
						header_navigation(this.className);
					});

					$('a.marketing').click(function(){
						header_navigation(this.className);
   						


    });

					function header_navigation(current_div)
					{
						document.getElementsByClassName(active_div)[0].style.backgroundColor="#00d8ff";
						document.getElementsByClassName(active_div)[0].style.color='';
						active_div=current_div;
						document.getElementsByClassName(active_div)[0].style.backgroundColor='white';
						document.getElementsByClassName(active_div)[0].style.color="#00d8ff";
					}

		


					

					
