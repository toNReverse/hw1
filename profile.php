<?php 
require_once 'auth.php';

session_start();

$userid = checkAuth();
$isLoggedIn = $userid !== false;

if (!$isLoggedIn) {
    header("Location: login.php");
    exit;
}

    $conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']);
    $userid = mysqli_real_escape_string($conn, $userid);
    $query = "SELECT * FROM users WHERE id = $userid";
    $res_1 = mysqli_query($conn, $query);
    $userinfo = mysqli_fetch_assoc($res_1);
?>


<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <title>Profilo - Bershka Style</title>
    <link rel="stylesheet" href="profile.css">
    <link rel="stylesheet" href="hw1.css">
    <script src="hw1.js" defer></script>

    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
<nav class="navbar-container">
      <div id="linksLEFT">
        <a>Donna</a>
        <a>Uomo</a>
        <a>BSKTEEN</a>
    
        <div id="menu-mobile">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    
      <!-- MENU LATERALE -->
      <div id="side-menu">
        <button id="close-menu">✕</button>

        <div id="gender-tabs">
          <a href="#" class="tab" data-gender="donna">DONNA</a>
          <a href="#" class="tab active" data-gender="uomo">UOMO</a>
          <a href="#" class="tab" data-gender="bskteen">BSK TEEN</a>
        </div>

        <ul class="menu-content" id="menu-donna" style="display: none;">
          <li><strong>COMBO WINS %</strong><br><small>Fino al 10% di sconto</small></li>
          <li>NOVITÀ</li>
          <li>ABBIGLIAMENTO</li>
          <li>SCARPE</li>
          <li>ACCESSORI</li>
          <li>OUT OF CORE</li>
          <li>PERSONALIZZAZIONE 🌈</li>
          <li>THE BERSHKA PRINT SHOP</li>
          <li class="special">SPECIAL PRICES <span class="new">NEW ITEMS</span></li>
        </ul>
        
        <ul class="menu-content" id="menu-uomo">
          <li><strong>COMBO WINS %</strong><br><small>Fino al 10% di sconto</small></li>
          <li>NOVITÀ</li>
          <li>ABBIGLIAMENTO</li>
          <li>SCARPE</li>
          <li>ACCESSORI</li>
          <li>OUT OF CORE</li>
          <li>PERSONALIZZAZIONE 🌈</li>
          <li>THE BERSHKA PRINT SHOP</li>
          <li class="special">SPECIAL PRICES <span class="new">NEW ITEMS</span></li>
        </ul>
        
        <ul class="menu-content" id="menu-bskteen" style="display: none;">
          <li><strong>HELLO KITTY</strong> <span class="new" style="color: blue;">NEW</span></li>
          <li>NOVITÀ</li>
          <li>ABBIGLIAMENTO</li>
          <li>SCARPE</li>
          <li>ACCESSORI</li>
          <li>OUT OF CORE</li>
          <li>PERSONALIZZAZIONE 🌈</li>
          <li>THE BERSHKA PRINT SHOP</li>
          <li class="special">SPECIAL PRICES <span class="new">NEW ITEMS</span></li>
        </ul>
      </div>

      <div id="logo">
        <a href="index.php">BERSHKA</a>
      </div>
      
      <div id="linksRIGHT">
        <div class="search-container">
          <img src="./img/54481.png" alt="Search" class="search-icon"><span id="search-text">CERCA</span>
        </div>
<!-- Se l'utente è loggato ($isLoggedIn è true), il nome dell'utente preso dalla variabile di sessione "_agora_name". -->        <?php if ($isLoggedIn): ?>
    <a href="profile.php" class="user-link"><?php echo $_SESSION["_agora_name"]; ?></a>
        <?php else: ?>
          <a href="login.php" id="login">Accedi</a>
        <?php endif; ?>
        <a>Carrello</a>
      </div>
    </nav>

    <!-- SIDE PAGE (ACCEDI, CARRELLO) **RIMOSSA**-->
  
    <div id="cart-modal" class="modal hidden">
      <div class="model cart-empty">
        <button class="close-btn-cart" aria-label="Chiudi carrello">&times;</button>

        <div class="cart-header">
          <h2>Carrello</h2>
          <div class="cart-actions">
            <a href="wish-list.php" class="favorites-btn">
              <span class="icon"><img src="./img/heart-icon.png" alt="cuoricino"></span> 
              <span class="traslate">Preferiti</span>
            </a>
          </div>
        </div>
      
        <div class="cart-empty-content">
          <img src="img/nobg.png" alt="Cuore spezzato" class="broken-heart" />
          <h3>Carrello vuoto</h3>
          <p>Non hai ancora nessun articolo nel carrello: scopri tutto quello che abbiamo in serbo per te</p>
          <a href="wish-list.php" class="discover-btn">VAI AI PREFERITI</a>
        </div>
      </div>
    </div>
    
<div class="profile-container">
    <aside class="sidebar">
        <h2>Ciao, <?php echo htmlspecialchars($userinfo['name']); ?>!</h2>
        <p class="email"><?php echo htmlspecialchars($userinfo['email']); ?></p>
        <ul>
            <li>I miei acquisti</li>
            <li>Resi online</li>
            <li>Dati personali</li>
            <li>Indirizzi salvati</li>
            <li>I tuoi vantaggi MMBRS</li>
            <li>Saldo MMBRSS e movimenti</li>
        </ul>
        <a href="logout.php" class="logout">Chiudi la sessione</a>
    </aside>

    <main class="main-content">
        <h3>I miei acquisti</h3>

        <div class="order-box">
            <p class="status">Consegnato</p>
            <p class="date">Lo hai ricevuto giorno 24/01</p>
            <p class="price">45,98 €</p>
            <div class="order-images">
                <img src="img/img-cart1.jpg" alt="Prodotto 1">
                <img src="img/img-cart2.jpg" alt="Prodotto 2">
            </div>
        </div>

        <div class="guest-box">
            <h4>Hai effettuato l'acquisto come ospite?</h4>
            <p>Se non trovi il tuo ordine, probabilmente hai effettuato l'acquisto senza essere registrato.</p>
            <a href="#" class="find-order">Trovare un ordine &rarr;</a>
        </div>
    </main>
</div>
<!-- NAV -->
  <div id="nav-donna" class="modal-nav hidden">  
    <div class="nav-content">
      <ul class="nav-menu">
        <li><a href="#">Combo wins % <span id = "off-txt">Fino al 10% di sconto</span></li></a>
        <li><a href="#">Novità</a></li>
        <li><a href="#">Abbigliamento <span class="arrow">→</span></a></li>
        <li><a href="#">Scarpe<span class="arrow">→</span></a></li>
        <li><a href="#">Accessori<span class="arrow">→</span></a></li>
        <li><a href="#">Out of core</a></li>
        <li><a href="#">Personalizzazione <span class="emoji">🎨</span></a></li>
        <li><a href="#">The BERSHKA Print Shop</a></li>
        <li><a href="#">Get the look<span id = "off-txt">#BERSHKASTYLE</span></li></a>
        <li><a href="#" class="special-link">Special prices <span class="badge badge-pink">New Items</span></a></li>
      </ul>
      <div class="get-the-look-nav">
        <h3>GET THE LOOK</h3>
        <div class="look-grid">
          <div class="look-item">
            <img src="./img/1donna-gtl-nav.webp" alt="Streetwear" />
            <p>Streetwear</p>
          </div>
          <div class="look-item">
            <img src="./img/2donna-gtl-nav.webp" alt="Casual" />
            <p>Casual</p>
          </div>
          <div class="look-item">
            <img src="./img/3donna-gtl-nav.webp" alt="Basic" />
            <p>Basic</p>
          </div>
          <div class="look-item">
            <img src="./img/4donna-gtl-nav.webp" alt="Trendy" />
            <p>Trendy</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div id="nav-uomo" class="modal-nav hidden">  
    <div class="nav-content">
      <ul class="nav-menu">
        <li><a href="#">Combo wins % <span id = "off-txt">Fino al 10% di sconto</span></li></a>
        <li><a href="#">Novità</a></li>
        <li><a href="#">Abbigliamento <span class="arrow">→</span></a></li>
        <li><a href="#">Scarpe<span class="arrow">→</span></a></li>
        <li><a href="#">Accessori<span class="arrow">→</span></a></li>
        <li><a href="#">Out of core</a></li>
        <li><a href="#">Personalizzazione <span class="emoji">🎨</span></a></li>
        <li><a href="#">The BERSHKA Print Shop</a></li>
        <li><a href="#">Get the look<span id = "off-txt">#BERSHKASTYLE</span></li></a>
        <li><a href="#" class="special-link">Special prices <span class="badge badge-pink">New Items</span></a></li>
      </ul>
      <div class="get-the-look-nav">
        <h3>GET THE LOOK</h3>
        <div class="look-grid">
          <div class="look-item">
            <img src="./img/1uomo-gtl-nav.webp" alt="Streetwear" />
            <p>Streetwear</p>
          </div>
          <div class="look-item">
            <img src="./img/2uomo-gtl-nav.webp" alt="Casual" />
            <p>Casual</p>
          </div>
          <div class="look-item">
            <img src="./img/3uomo-gtl-nav.webp" alt="Basic" />
            <p>Basic</p>
          </div>
          <div class="look-item">
            <img src="./img/4uomo-gtl-nav.webp" alt="Trendy" />
            <p>Trendy</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <div id="nav-bskteen" class="modal-nav hidden"> 
    <div class="nav-content">
      <ul class="nav-menu">
        <li><a href="#">HELLO KITTY <span class="badge badge-blue">NEW</span></a></li>
        <li><a href="#">NOVITÀ</a></li>
        <li><a href="#">ABBIGLIAMENTO <span class="arrow">→</span></a></li>
        <li><a href="#">SCARPE</a></li>
        <li><a href="#">ACCESSORI</a></li>
        <li><a href="#">OUT OF CORE</a></li>
        <li><a href="#">PERSONALIZZAZIONE <span class="emoji">🎨</span></a></li>
        <li><a href="#">THE BERSHKA PRINT SHOP</a></li>
        <li><a href="#" class="special-link">SPECIAL PRICES <span class="badge badge-pink">NEW ITEMS</span></a></li>
      </ul>
    </div>
  </div>
  
</body>
</html>

<?php mysqli_close($conn); ?>