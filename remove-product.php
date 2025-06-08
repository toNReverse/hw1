<?php
require_once 'auth.php';
if (!$userid = checkAuth()) exit;

$data = json_decode(file_get_contents("php://input"), true);
if (!isset($data['id'])) {
    echo json_encode(["ok" => false, "error" => "ID mancante"]);
    exit;
}

global $dbconfig;
$conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']);

$id = intval($data['id']);
$userid = mysqli_real_escape_string($conn, $userid);

$query = "DELETE FROM products WHERE user_id = '$userid' AND id = $id";
if (mysqli_query($conn, $query)) {
    echo json_encode(["ok" => true]);
} else {
    echo json_encode(["ok" => false, "error" => mysqli_error($conn)]);
}

mysqli_close($conn);
?>