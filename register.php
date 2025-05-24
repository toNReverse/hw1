<?php
require_once 'auth.php';
require_once 'dbconfig.php';

header('Content-Type: application/json'); // fondamentale!

$response = ['success' => false];
$error = [];

if (checkAuth()) {
    echo json_encode(['success' => false, 'message' => 'Sei già autenticato.']);
    exit;
}

if (!empty($_POST["name"]) && !empty($_POST["email"]) && !empty($_POST["password"]) && !empty($_POST["confirm_password"]) && isset($_POST["privacy"])) {
    $conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name'])
    or die(json_encode(['success' => false, 'message' => 'Errore di connessione.']));

    if (strlen($_POST["password"]) < 8) {
        $error[] = "La password deve contenere almeno 8 caratteri.";
    }

    if ($_POST["password"] !== $_POST["confirm_password"]) {
        $error[] = "Le password non coincidono.";
    }

    if (!filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
        $error[] = "Email non valida.";
    } else {
        $email = mysqli_real_escape_string($conn, strtolower($_POST['email']));
        $res = mysqli_query($conn, "SELECT email FROM users WHERE email = '$email'");
        if (mysqli_num_rows($res) > 0) {
            $error[] = "Utente già registrato con questa email.";
        }
    }

    if (count($error) === 0) {
        $name = mysqli_real_escape_string($conn, $_POST['name']);
        $password = password_hash($_POST['password'], PASSWORD_BCRYPT);

        $query = "INSERT INTO users(name, email, password) VALUES('$name', '$email', '$password')";
        if (mysqli_query($conn, $query)) {
            session_start();
            $_SESSION["_agora_user_email"] = $email;
            $_SESSION["_agora_user_id"] = mysqli_insert_id($conn);

            $response['success'] = true;
            $response['message'] = "Registrazione completata.";
        } else {
            $response['message'] = "Errore durante la registrazione.";
        }
    } else {
        $response['message'] = implode(" ", $error);
    }

    mysqli_close($conn);
} else {
    $response['message'] = "Compila tutti i campi obbligatori.";
}

echo json_encode($response);
exit;