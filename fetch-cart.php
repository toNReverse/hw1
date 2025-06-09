<?php
require_once 'auth.php';
if (!$userid = checkAuth()) {
    echo json_encode([]);
    exit;
}

global $dbconfig;
$conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']);

$userid = mysqli_real_escape_string($conn, $userid);
$query = "SELECT * FROM cart WHERE user_id = '$userid'";
$res = mysqli_query($conn, $query);

$products = [];
while ($row = mysqli_fetch_assoc($res)) {
    $products[] = $row;
}

echo json_encode($products);
mysqli_close($conn);
?>