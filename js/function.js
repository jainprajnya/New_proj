var chart,graph_id,graph_type,left_pane;
var overview_index=-1;
var rendered_attr_id=[];
var series_data=[];
var graph_type;
 var hash_obj={};
 var response;
 var applyFilter=[];
	var options = {
					chart: {
						type: 'column',
						renderTo:'container_data',
						 // backgroundColor: '#3fbf8c'
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
                    	
                pointWidth: 25,
                pointPadding: 0,
			                cursor: 'pointer'			                  
                
           				 }

           				},
			
				series: []

				}
				 
  
			$(document).ready(function() {

				var e = document.getElementById('circle1');
				// console.dir(e);
				var host = 'http://localhost:8080/feedback-review';
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
				        set_graph_level(-1);
						$("div#quick_links").append(' > <a class="back_link" id="-2" href="index_new.php" >overview</a>');
				        plot_graph(response[overview_index]);
    			}	
			});
				$('a.branch_list_1').live('click',function (){
								addFilter(this.id,this.name);
								make_graph_with_filters();
					});

				$('a.top_pannel').live('click',function (){

						var params_index= get_params_index(this.id,response);
					    applyFilter=[];
					    graph_type=response[params_index]["type"];
					    set_graph_level(-1);
					    graph_name=response[params_index]["name"];
						collect_stats_populate_graph(this.id,response[params_index]["attributeList"],response[params_index]["filterList"],applyFilter);

				});


				    $('#net_promoter').highcharts({
	
	    chart: {
	        type: 'gauge',
	        plotBackgroundColor: '#3fbf8c',
	        plotBackgroundImage: null,
	        plotBorderWidth: 0,
	        plotShadow: false,
	        backgroundColor: '#3fbf8c'
	    },
	    
	    title: {
	        text: 'Net Promoter Score'
	    },
	    
	    pane: {
	        startAngle: -150,
	        endAngle: 150
	    },
	       
	    // the value axis
	    yAxis: {
	        min: 0,
	        max: 100,
	        
	        minorTickInterval: 'auto',
	        minorTickWidth: 1,
	        minorTickLength: 10,
	        minorTickPosition: 'outside',
	        minorTickColor: '#666',
	
	        tickPixelInterval: 25,
	        tickWidth: 2,
	        tickPosition: 'ouside',
	        tickLength: 10,
	        tickColor: '#666',
	        labels: {
	            step: 2,
	            rotation: 'auto'
	        },
	        title: {
	            text: ''
	        },
	        plotBands: [{
	            from: 0,
	            to: 25,
	            color: '#55BF3B' // green
	        }, {
	            from: 25,
	            to: 75,
	            color: '#DDDF0D' // yellow
	        }, {
	            from: 75,
	            to: 100,
	            color: '#DF5353' // red
	        }]        
	    },
	
	    series: [{
	        name: 'NPS',
	        data: [40],
	        tooltip: {
	            valueSuffix: ''
	        }
	    }]
	
	} );

var gaugeOptions = {
	
	    chart: {
	        type: 'solidgauge',
	        backgroundColor: '#3fbf8c',
	        style: {
            fontFamily: 'serif',
            fontSize: 18
        	}
	    },
	    
	    title: null,
	    
	    pane: {
	    	center: ['50%', '85%'],
	    	size: '100%',
	        startAngle: -90,
	        endAngle: 90,
            background: {
                backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || '#EEE',
                innerRadius: '60%',
                outerRadius: '100%',
                shape: 'arc'
            }
	    },

	    tooltip: {
	    	enabled: false
	    },
	       
	    // the value axis
	    yAxis: {
			stops: [
				[0.1, '#55BF3B'], // green
	        	[0.5, '#DDDF0D'], // yellow
	        	[0.9, '#DF5353'] // red
			],
			lineWidth: 0,
            minorTickInterval: null,
            tickPixelInterval: 400,
            tickWidth: 0,
	        title: {
                y: -95
	        },
            labels: {
                y: 10
            }        
	    },
        
        plotOptions: {
            solidgauge: {
                dataLabels: {
                    y: 5,
                    borderWidth: 0,
                    useHTML: true
                }
            }
        }
    };
    
    // The speed gauge
    $('#avg_rating').highcharts(Highcharts.merge(gaugeOptions, {
        yAxis: {
	        min: 0,
	        max: 5,
	        title: {
	            text: 'Rating'
	        }       
	    },

	    credits: {
	    	enabled: false
	    },
	
	    series: [{
	        name: 'Rating',
	        data: [3.5],
	        dataLabels: {
	        	format: '<div style="text-align:center"><span style="font-size:25px;color:' + 
                    ((Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black') + '">{y}</span><br/>' + 
                   	'<span style="font-size:12px;color:silver"></span></div>'
	        },
	        tooltip: {
	            valueSuffix: ''
	        }
	    }]
	
	}));
    



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
						rows+='<a class="top_pannel fancy-font" id='+response[i]["graphId"]+' name='+response[i]["name"]+'>'+response[i]["name"]+'</a>';
						if (response[i]["name"]=="overview"){overview_index=i;}
					}
					
					$('div#left_pannel').append(rows);			
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
					 	console.log("in stats"+applyFilter);
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
						var color_array=['#D0112A','#CDD011','#41168D'];
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
								series_data[i]["data"].push(hash_obj[id]["count_of_ppl"][i]);
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
						var filter = document.getElementById("other_filters");
						var filters='';

						for(var i in filterList)
						{
							filters+=' <ul class="style_dropdown"><li class="branch_list_first">'+filterList[i]["attributeString"]+'</li>';
							for(var j in filterList[i]["attributeValues"])
								{filters+='<li class="branch_list"><a class="branch_list_1" name='+filterList[i]["attributeString"]+' id='+filterList[i]["attributeValues"][j]["name"]+'>'+filterList[i]["attributeValues"][j]["name"]+'</a></li>';
						}
							filters+='</ul>';
						}
						
						$('div#basic_filter').append(filters);
						
						$('a.branch_list_1').live('mouseover',function(){
							
							if(document.getElementById(this.id).className === "branch_list_1")
							{
								this.style.backgroundColor = "red";
							}
						});
						$('a.branch_list_1').live('mouseout',function(){
								this.style.backgroundColor = "black";
						});
				
					}
					$(document).on('change', 'select', function () {
    					// alert(this.value);
					});

					$('.style_dropdown').live('click',function(){
						var elements= this.children;
						for (var i = 0; i < elements.length; i++) {
						        elements[i].style.visibility="visible";
						    }

					});

					$('.branch_list').live('click',function(){


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

						var child_found=-1;
						var my_id=-1;
						for(id in hash_obj)
						{

							if(hash_obj[id]["name"]==whose_subgraph){
								parent_id=id;
							}
						}
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
						if(this.id=="daily"){set_data_of_series_normal(hash_obj,-1,"listCountPPl_7Days",null);set_date("listCountPPl_7Days");}
						else if(this.id=="weekly"){set_data_of_series_normal(hash_obj,-1,"listCountPPl_30Days",null);set_date("listCountPPl_30Days");}
						else if(this.id=="monthly"){set_data_of_series_normal(hash_obj,-1,"listCountPPl_365Days",null);set_date("listCountPPl_365Days");}
						}
						else if(graph_type=="trend")
						{
						if(this.id=="daily"){set_data_of_series_trends(hash_obj,-1,"listDailyAttributeStatisticValues",7);set_date("listCountPPl_7Days");}
						else if(this.id=="weekly"){set_data_of_series_trends(hash_obj,-1,"listDailyAttributeStatisticValues",30);set_date("listCountPPl_30Days");}
						else if(this.id=="monthly"){set_data_of_series_trends(hash_obj,-1,"listMonthlyAttributeLevelStatisticValues",365);set_date("listCountPPl_365Days");}
						}
						
					});



					

					
