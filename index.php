<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head> 
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/> 

<title>Using Highcharts with PHP and MySQL</title>
<link href="css/desktop.css" rel="stylesheet" type="text/css">
<link href="css/header_footer.css" rel="stylesheet" type="text/css">
<link href="css/main_new.css" rel="stylesheet" type="text/css">
<!-- <link href="css/base.css" rel="stylesheet" type="text/css">
<link href="css/layout.css" rel="stylesheet" type="text/css"> -->
<link href="css/bootstrap.css" rel="stylesheet" type="text/css">
<link href='http://fonts.googleapis.com/css?family=Roboto+Condensed:300,700' rel='stylesheet' type='text/css'>
<link href='http://fonts.googleapis.com/css?family=Oswald:300,700' rel='stylesheet' type='text/css'>
<script type="text/javascript" src="js/jquery-1.7.1.min.js" ></script>
<script type="text/javascript" src="js/highcharts.js" ></script>
<script type="text/javascript" src="js/function.js" ></script>
<!-- <script type="text/javascript" src="js/themes/gray.js"></script> -->

<script type="text/javascript">
</script>
</head>
<!-- <div id="container"> -->
<body>
<div id="header-toolbar-div">
<div class="wrapper"></div>
</div>
	

<table id="body_table">
	<tbody>
		<tr><td  id="dummy_row"></td><td id="timeline_btn">
			<div id="top_pannel_div">
				 <?php include("header.php"); ?>
			</div>
			<button id="daily" class="timeline" style="background-color: #6db3f2;">daily</button>
			<button id="weekly" class="timeline" >weekly</button>
			<button id="monthly" class="timeline">monthly</button>			
			<div id="period"></div>
			<div><?php include('basic_filters.php');?></div>
		</td>
			
		</tr>
	<tr>
	<td id="left_pannel"></td>
	<td id="data" >
		<div id="container_graph_child" name="level_identify_div" style="display:hidden;"></div>
		<div id="container" ></div>
		<div id="summary"><table id="summay_table">
		</table></div>
	</td>

	</tr>
	</tbody>
<table>
</body>
<div id="footer" class="my_gradient_red">
<?php include("footer.php"); ?></div>
<!-- </div> -->
</html>