<?php
if(isset($_POST['submit'])) {
    // Honeypot check: if the hidden field is filled, treat as spam and exit silently
    if (!empty($_POST['website'])) {
        // Optionally log or ignore silently
        exit;
    }

    // retrived data from the form
    $name = $_POST['name'];
    $email = $_POST['email'];
    $message = $_POST['message'];
    $phonenumber = $_POST['phonenumber'];
    $contactmethod = $_POST['contactmethod'];
    $subscribe = isset($_POST['subscribe']) ? "Yes" : "No";
    $referredfrom = $_POST['referredfrom'];

    // set the header variables
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";

    // method to send to email
    if(mail("michaelangelo@paperpatches.ca", "New Contact Form Submission", $message, $headers)) {
        echo "Thank you for contacting us, $name! We will get back to you shortly.";
    } else {
        echo "Sorry, there was an error sending your message. Please try again later.";
    }
}
?>