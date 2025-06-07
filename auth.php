<?php
require_once 'dbconfig.php';

// Avvia la sessione solo se non è già attiva
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

function checkAuth() {
    if(isset($_SESSION['_agora_user_id'])) {
        return $_SESSION['_agora_user_id'];
    } else {
        return 0;
    }
}
?>