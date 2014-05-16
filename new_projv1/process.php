<?php
//If we submitted the form
if(isset($_POST['loginSubmit']))
{
	$start="<!DOCTYPE html><html><head><meta http-equiv='Content-Type' content='text/html; charset=utf-8'>";
	$start.="<meta name='viewport' content='width=device-width'><title>ABC-XYZ</title>";
	$start.="<link href='css/desktop.css' rel='stylesheet' type='text/css'><!--[if lte IE 8]><script type='text/javascript' src='javascript/html5.js'></script><![endif]--></head>";
	
     $header= "<?php include(\"header.php\"); ?>";
     $footer="<?php include(\"footer.php\"); ?>";
     $end="</html>";
     $body= "<body>Hello, " . $_POST['username'] . ", we submitted your form!</body>";

     $wholePart=$start . $header . $body . $footer . $end;
     echo($wholePart);
     error_log("---here".$wholePart);
     
}
//If we haven't submitted the form


?>