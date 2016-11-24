<?php 

require_once( dirname(__FILE__) . '/wp-load.php' );

$to = array(
	'info@edisonogco.dk',
	'bjarniolsen@gmail.com'
);

$subject = "Edison og Co bestilling af: " . $_POST['url'];

$message = $_POST['name'] . ' har skrevet angående denne vare: ' . $_POST['url'];
$message .= "\r\n\r\n";
if (isset($_POST['message'])) {
	$message .= "\r\n";
	$message .= 'Kunden har denne bemærkning:';
	$message .= "\r\n";
	$message .= "-----------";
	$message .= "\r\n";
	$message .= $_POST['message'];
	$message .= "\r\n";
	$message .= "-----------";
	$message .= "\r\n\r\n";
}
$message .= "\r\n";
$message .= 'Denne email er sendt fra ' . $_POST['url'];

$headers = array('Content-Type: text/plain; charset=UTF-8','From: ' . $_POST['name'] . ' <'. $_POST['email'] .'>');

echo $to . " - " . $subject . " - " . $message . " - " . $headers;

wp_mail( $to, $subject, $message, $headers );

?>
