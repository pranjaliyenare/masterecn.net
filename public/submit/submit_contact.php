<?php
$webservice_url = "https://secure.goldenmoney.org/form_api.php";
if (isset($_POST) && !empty($_POST)) {
    $_POST['leadstatus'] = "New";
    $_POST['leadsource'] = "Contact us Form";
    $_POST['method'] = "WebContactUs";
    $_POST['web_operation'] = "WebContactUs";
    $_POST['module_name'] = "Contacts";
    
    $request_data = array('web_operation' => 'WebContactUs', 'module_name' => 'Contacts', 'value' => json_encode($_POST));
    
    $postData = '';
    foreach ($request_data as $k => $v) {
        $postData .= $k . '=' . $v . '&';
    }
     
    $postData = rtrim($postData, '&');
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $webservice_url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HEADER, false);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 2);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $postData);
    $output = curl_exec($ch);
    curl_close($ch);
    echo $output;exit;
}
?>