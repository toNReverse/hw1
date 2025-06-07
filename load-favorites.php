<?php
require_once 'auth.php';
if (!$userid = checkAuth()) {
  echo json_encode(['ok' => false, 'error' => 'Unauthorized']);
  exit;
}

global $dbconfig;
$conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']);

$userid = mysqli_real_escape_string($conn, $userid);
$query = "SELECT * FROM products WHERE user_id = '$userid'";
$res = mysqli_query($conn, $query);

$favorites = array();
while ($row = mysqli_fetch_assoc($res)) {
  $favorites[] = $row;
}

mysqli_close($conn);
echo json_encode($favorites);
?>