<?php
require_once 'auth.php';
if (!$userid = checkAuth()) exit;

$data = json_decode(file_get_contents("php://input"), true);
if (!isset($data['title'])) {
    echo json_encode(["ok" => false, "error" => "Titolo mancante"]);
    exit;
}

global $dbconfig;
$conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']);

$title = mysqli_real_escape_string($conn, $data['title']);
$userid = mysqli_real_escape_string($conn, $userid);

$query = "DELETE FROM cart WHERE user_id = '$userid' AND title = '$title'";
if (mysqli_query($conn, $query)) {
    echo json_encode(["ok" => true]);
} else {
    echo json_encode(["ok" => false, "error" => mysqli_error($conn)]);
}

mysqli_close($conn);
?>