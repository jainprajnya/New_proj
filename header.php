<?php ?>
<div id="header-toolbar-div">
<div class="wrapper"></div>
<ul class="header_toolbar my_gradient_grey" >

<?php
// If we submitted the form
error_log("reacj=hed here");
if(isset($_POST['loginSubmit']))
{
?>

<li class="welcome">Hello ! <?php echo $_POST['username'] ?><a href="welcome.php" class="level1"><span>  SignOut</span></a></li>
	<li class="wlecome"><a href="about-us.html" class="level1"><span>About Us</span></a></li>
	<li class="welcome"><a href="contact-us.html/" class="level1"><span>Contact Us</span></a></li></ul>
<?php include("top_pannel.php");} else { ?>
	<li class="welcome"><a href="login.php" class="level1"><span>Login</span></a></li>
	<li class="wlecome"><a href="about-us.html/" class="level1"><span>About Us</span></a></li>
	<li class="welcome"><a href="contact-us.html/" class="level1"><span>Contact Us</span></a></li>
	</ul>
	<?php } ?>
	
</div>
