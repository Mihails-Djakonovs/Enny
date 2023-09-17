<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/src/Exception.php';
require 'phpmailer/src/PHPMailer.php';

$mail = new PHPMailer(true);
$mail->CharSet = 'UTF-8';
$mail->setLanguage('de', 'phpmailer/language/');
$mail->IsHTML(true);

$mail->setFrom('example@site.com', 'New client');
$mail->addAddress('info@enny-beauty.at');
$mail->Subject = 'Hallo! Sie haben eine neue Nachricht';



$body = '<h1>Enny Beauty - feedback</h1>';

if (trim(!empty($_POST['name']))) {
    $body .= '<p><strong>Name:</strong> ' . $_POST['name'] . '</p>';
}
if (trim(!empty($_POST['email']))) {
    $body .= '<p><strong>E-mail:</strong> ' . $_POST['email'] . '</p>';
}
if (trim(!empty($_POST['phone']))) {
    $body .= '<p><strong>Phone:</strong> ' . $_POST['phone'] . '</p>';
}
if (trim(!empty($_POST['message']))) {
    $body .= '<p><strong>Message:</strong> ' . $_POST['message'] . '</p>';
}

$mail->Body = $body;

if (!$mail->send()) {
    $message = 'Fehler';
} else {
    $message = 'Ihre Nachricht wurde erfolgreich versendet!';
}

$response = ['message' => $message];

header('Content-type: application/json');
echo json_encode($response);
