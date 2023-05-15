<?php 

session_start();

function generateRandomString($length = 6) {
    $characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $charactersLength = strlen($characters);
    $randomString = '';
    for ($i = 0; $i < $length; $i++) {
        $randomString .= $characters[rand(0, $charactersLength - 1)];
    }
    return $randomString;
}

$_SESSION['sessionCaptchaLive'] = generateRandomString();

header('Content-Type: image/jpeg');
$im = imagecreatetruecolor(100, 35);
$text_color = imagecolorallocate($im, 255, 255, 255);
imagestring($im, 7, 15, 10,  $_SESSION['sessionCaptchaLive'], $text_color);
imagesetthickness ( $im, 5 );
imagepng($im);
imagedestroy($im);

?>