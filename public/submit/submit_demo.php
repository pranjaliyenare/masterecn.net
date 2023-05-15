<?php
$webservice_url = "https://secure.goldenmoney.org/form_api.php";
if (isset($_POST) && !empty($_POST)) {
    $_POST['leadstatus'] = 'Demo Opened';
    $_POST['leadsource'] = 'Demo';
    $_POST['address'] = '';   
    $_POST['state'] = '';   
    $_POST['zipcode'] = '';         
    $_POST['metatrader_type'] = 'MT4';
    $_POST['demo_label_account_type'] = 'Demo';
    $_POST['demo_currency_code'] = 'USD';
    $_POST['web_operation'] = 'WebDemoaccount'; 
    $_POST['module_name'] = 'DemoAccount';    

    $request_data = array('web_operation' => 'WebDemoaccount', 'module_name' => 'DemoAccount', 'value' => json_encode($_POST));

    $postData = '';
    foreach ($request_data as $k => $v) {
        $postData .= $k . '=' . $v . '&';
    }   
        
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