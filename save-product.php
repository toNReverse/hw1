<?php
require_once 'auth.php';
if (!$userid = checkAuth()) {
    echo json_encode(['ok' => false, 'error' => 'Utente non autenticato']);
    exit;
}

if (!isset($_POST['title']) || !isset($_POST['thumbnail'])) {
    echo json_encode(['ok' => false, 'error' => 'Dati mancanti']);
    exit;
}

global $dbconfig;
$conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']);

$title = mysqli_real_escape_string($conn, $_POST['title']);
$snippet = isset($_POST['snippet']) ? mysqli_real_escape_string($conn, $_POST['snippet']) : '';
$price = isset($_POST['price']) ? mysqli_real_escape_string($conn, $_POST['price']) : '';
$thumbnail = mysqli_real_escape_string($conn, $_POST['thumbnail']);

$query = "INSERT INTO products (user_id, title, snippet, price, thumbnail)
          VALUES ('$userid', '$title', '$snippet', '$price', '$thumbnail')";

if (mysqli_query($conn, $query)) {
    echo json_encode(['ok' => true]);
} else {
    echo json_encode(['ok' => false, 'error' => mysqli_error($conn)]);
}

mysqli_close($conn);
?>