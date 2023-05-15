<?php
	session_start();

	if(isset($_REQUEST['code'])) {
	    echo json_encode($_REQUEST['code'] == $_SESSION['sessionCaptchaLive']);
	} else {
	    echo 0;
	}
?>