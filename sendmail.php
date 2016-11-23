<?php 

require_once( dirname(__FILE__) . '/wp-load.php' );

$to = "bjarniolsen@gmail.com";
$subject = "Edison og Co bestilling af: " . $_POST['url'];
$message = $_POST['message'];
$message .= "\r\n";
$message .= $_POST['url'];
$headers = array('Content-Type: text/plain; charset=UTF-8','From: ' . $_POST['name'] . ' <'. $_POST['email'] .'>');

echo $to . " - " . $subject . " - " . $message . " - " . $headers;

wp_mail( $to, $subject, $message, $headers );

?>
