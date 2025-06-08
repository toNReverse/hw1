<?php
// Imposta l'header per il JSON
header('Content-Type: application/json');

// Prendi i parametri GET
$fromCurrency = $_GET['from'] ?? null;
$toCurrency = $_GET['to'] ?? null;
$amount = $_GET['amount'] ?? null;

// Verifica che tutti i dati siano presenti
if (!$fromCurrency || !$toCurrency || !$amount) {
    echo json_encode(['error' => 'Dati mancanti']);
    exit;
}

// Inserisci la tua API Key
$apiKey = '524b278bae218fb72665a5b7'; // Sostituisci con la tua chiave API

// URL della API
$apiUrl = "https://v6.exchangerate-api.com/v6/$apiKey/latest/$fromCurrency";

// Inizializza la richiesta cURL
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $apiUrl);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$response = curl_exec($ch);
curl_close($ch);

// Controlla se ci sono errori
if (!$response) {
    echo json_encode(['error' => 'Errore nella richiesta API']);
    exit;
}

// Decodifica la risposta
$data = json_decode($response, true);

// Verifica presenza del tasso di cambio
if (!isset($data['conversion_rates'][$toCurrency])) {
    echo json_encode(['error' => 'Valuta non supportata']);
    exit;
}

// Calcola l'importo convertito
$rate = $data['conversion_rates'][$toCurrency];
$convertedAmount = round($amount * $rate, 2);

// Restituisci il risultato
echo json_encode([
    'converted' => $convertedAmount,
    'rate' => $rate,
    'symbol' => $toCurrency
]);