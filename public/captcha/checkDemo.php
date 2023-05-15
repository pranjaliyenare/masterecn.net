<?php
	session_start();

	if(isset($_REQUEST['code'])) {
	    echo json_encode($_REQUEST['code'] == $_SESSION['sessionCaptchaDemo']);
	} else {
	    echo 0;
	}
?>