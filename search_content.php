<?php
header('Content-Type: application/json');

$api_key = '476a4fe57c441aba64f0bcd94b094e5878b15a9b3c3a85b06a68be8418058462'; // Inserisci la tua chiave API di SerpApi
$query = isset($_GET['q']) ? urlencode($_GET['q']) : '';

if (empty($query)) {
    echo json_encode(['error' => 'Query mancante']);
    exit;
}

$url = 'https://serpapi.com/search?' . http_build_query([
    'engine' => 'google_shopping',
    'q' => $query,
    'gl' => 'it',
    'hl' => 'it',
    'api_key' => $api_key
]);

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$response = curl_exec($ch);

if (curl_errno($ch)) {
    echo json_encode(['error' => 'Errore nella richiesta: ' . curl_error($ch)]);
    curl_close($ch);
    exit;
}

$http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($http_code !== 200) {
    echo json_encode(['error' => 'Errore HTTP: ' . $http_code]);
    exit;
}

echo $response;
?>