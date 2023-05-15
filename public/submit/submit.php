<?php
$webservice_url = "https://secure.goldenmoney.org/form_api.php";
if (isset($_POST) && !empty($_POST) && $_POST['method'] != 'is_contact_exist') {
    $postData = '';
    $_POST['sales_stage'] = "New";
    $_POST['leadsource'] = "Live";
    $request_data = array('web_operation' => 'WebLiveaccount', 'module_name' => 'LiveAccount', 'value' => json_encode($_POST));
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
} else {
    $postData = '';
    $_POST['web_operation'] = $_POST['method'];
    $request_data = array('web_operation' => 'is_contact_exist', 'module_name' => 'Contacts', 'email' => $_POST['email'], 'value' => json_encode($_POST));
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
    // echo json_decode($output);
    echo $output;exit;
}
?>