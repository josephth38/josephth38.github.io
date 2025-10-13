<?php
// ============================
// 📨 Script de traitement du formulaire de contact
// ============================

// Vérifier si le formulaire a été soumis
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Nettoyer les données reçues
    $nom = htmlspecialchars(trim($_POST["nom"]));
    $email = htmlspecialchars(trim($_POST["email"]));
    $message = htmlspecialchars(trim($_POST["message"]));

    // Vérifier les champs
    if (!empty($nom) && !empty($email) && !empty($message)) {
        if (filter_var($email, FILTER_VALIDATE_EMAIL)) {

            // Adresse mail où le message doit être envoyé
            $to = "thomasjoseph@free.fr"; // <-- remplace par ton adresse réelle
            $subject = "📩 Nouveau message de ton portfolio - $nom";
            $body = "Nom : $nom\nEmail : $email\n\nMessage :\n$message";
            $headers = "From: $email\r\nReply-To: $email\r\nX-Mailer: PHP/" . phpversion();

            // Envoi du mail
            if (mail($to, $subject, $body, $headers)) {
                echo "<p style='color: #3b82f6; text-align:center; margin-top:20px;'>✅ Message envoyé avec succès ! Merci $nom.</p>";
            } else {
                echo "<p style='color: #f87171; text-align:center; margin-top:20px;'>❌ Erreur lors de l'envoi du message.</p>";
            }

        } else {
            echo "<p style='color: #f87171; text-align:center; margin-top:20px;'>⚠️ Adresse e-mail invalide.</p>";
        }
    } else {
        echo "<p style='color: #f87171; text-align:center; margin-top:20px;'>⚠️ Tous les champs sont obligatoires.</p>";
    }
}
?>
