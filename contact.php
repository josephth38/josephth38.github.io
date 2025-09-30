<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $name = htmlspecialchars($_POST["name"]);
    $email = htmlspecialchars($_POST["email"]);
    $subject = htmlspecialchars($_POST["subject"]);
    $msg = htmlspecialchars($_POST["msg"]);

    $to = "ton_email@exemple.com";
    $headers = "From: $email\r\n";
    $message = "Nom: $name\nEmail: $email\nSujet: $subject\n\nMessage:\n$msg";

    if (mail($to, $subject, $message, $headers)) {
        echo "Message envoyé avec succès ✅";
    } else {
        echo "Erreur lors de l'envoi ❌";
    }
}
?>
