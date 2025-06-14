<?php
    // Verifica che l'utente sia già loggato, in caso positivo va direttamente alla home
    include 'auth.php';
    if (checkAuth()) {
        header('Location: index.php');
        exit;
    }

    
    // login.php (dopo autenticazione corretta)
    session_start();
    $_SESSION['user_id'] = $user['id'];


    if (!empty($_POST["email"]) && !empty($_POST["password"])) {
        // Connessione al DB
        $conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']) 
                or die(mysqli_error($conn));

        $email = mysqli_real_escape_string($conn, $_POST['email']);

        // Query per cercare l'utente tramite email
        $query = "SELECT * FROM users WHERE email = '".$email."'";
        $res = mysqli_query($conn, $query) or die(mysqli_error($conn));
        
        if (mysqli_num_rows($res) > 0) {
            $entry = mysqli_fetch_assoc($res);
            if (password_verify($_POST['password'], $entry['password'])) {
                // Imposto la sessione dell'utente
                $_SESSION["_agora_name"] = $entry['name']; // AGGIUNGI QUESTA
                $_SESSION["_agora_email"] = $entry['email'];
                $_SESSION["_agora_user_id"] = $entry['id'];
                header("Location: index.php");
                mysqli_free_result($res);
                mysqli_close($conn);
                exit;
            }
        }
        // Se l'utente non è stato trovato o la password non ha passato la verifica
        $error = "Email e/o password errati.";
    } else if (isset($_POST["email"]) || isset($_POST["password"])) {
        // Se solo uno dei due è impostato
        $error = "Inserisci email e password.";
    }
?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel='stylesheet' href='login.css'>
    <link rel='stylesheet' href='hw1.css'>
    <script src="hw1.js" defer></script>
    <script src="cart-modal.js" defer></script>
    <title>Accedi - BERSHKA</title>

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
      <div class="model">
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

        <!-- Contenitore prodotti -->
        <div class="cart-items hidden" id="cart-items-container"></div>

        <!-- Stato carrello vuoto -->
        <div class="cart-empty-content" id="cart-empty-content">
          <img src="img/nobg.png" alt="Cuore spezzato" class="broken-heart" />
          <h3>Carrello vuoto</h3>
          <p>Non hai ancora nessun articolo nel carrello: scopri tutto quello che abbiamo in serbo per te</p>
          <a href="wish-list.php" class="discover-btn">VAI AI PREFERITI</a>
        </div>
      </div>
    </div>
  
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

<section class="login-container">
    <div>
      <div id="logo-log"><a href="index.php">BERSHKA</a></div>

        <h5>Per continuare, accedi a BERSHKA.</h5>

        <?php
            // Verifica la presenza di errori
            if (isset($error)) {
                echo "<p class='error'>$error</p>";
            }
        ?>

        <form name="login" method="post">
            <!-- Seleziono il valore di ogni campo sulla base dei valori inviati al server via POST -->
            <div class="email">
                <label for="email">Email</label>
                <input type="text" name="email" <?php if (isset($_POST["email"])) echo 'value="' . $_POST["email"] . '"'; ?>>
            </div>

            <div class="password">
                <label for="password">Password</label>
                <!-- Per motivi di sicurezza, non pre-compiliamo mai i campi password -->
                <input type="password" name="password">
            </div>

            <div class="submit-container">
                <div class="login-btn">
                    <input type="submit" value="ACCEDI">
                </div>
            </div>
        </form>

        <div class="signup">
            <h4>Non hai un account?</h4>
        </div>

        <div class="signup-btn-container">
            <a class="signup-btn" href="signup.php">ISCRIVITI A BERSHKA</a>
        </div>
    </div>
</section>
<!-- SEARCH BAR -->
<div id="search-page">
    <div class="search-container-page-log-sign ">
    <img src="img/54481.png" alt="Search" class="search-icon">
      <input type="text" placeholder="CERCA" class="search-input-page">
    </div>
    <div class="top-search">
      <div class="top-search-tag">🔥 <span class="traslate">Body</span></div>
      <div class="top-search-tag">🔥 <span class="traslate">Top</span></div>
      <div class="top-search-tag">🔥 <span class="traslate">Felpe</span></div>
      <div class="top-search-tag">🔥 <span class="traslate">Camicia</span></div>
      <div class="top-search-tag">🔥 <span class="traslate">Borse</span></div>
    </div>
    <div class="top-search-suggest">
      <h3>Possiamo consigliarti</h3>
      <div class="product-container"> <!-- contenitore flex -->
        <div class="product-card">
          <img src="img/top-s-1.jpg" alt="Jeans baggy">
          <div class="product-info">
            <div class="left-info">
              <p class="product-name">Jeans baggy</p>
              <div class="price-line">
                <span class="price-red">17,99 €</span>
                <span class="discount">-50%</span>
              </div>
              <p class="price-old">35,99 €</p>
            </div>
            <div class="right-icon">
              <img src="img/hearth-search-page.png" alt="cuoricino">
            </div>
          </div>
        </div>
        <div class="product-card">
          <img src="img/top-s-2.jpg" alt="Jeans baggy">
          <div class="product-info">
            <div class="left-info">
              <p class="product-name">Jeans baggy</p>
              <div class="price-line">
                <span class="price-red">17,99 €</span>
                <span class="discount">-50%</span>
              </div>
              <p class="price-old">35,99 €</p>
            </div>
            <div class="right-icon">
              <img src="img/hearth-search-page.png" alt="cuoricino">
            </div>
          </div>
        </div>
        <div class="product-card">
          <img src="img/top-s-3.jpg" alt="Jeans baggy">
          <div class="product-info">
            <div class="left-info">
              <p class="product-name">Jeans baggy</p>
              <div class="price-line">
                <span class="price-red">17,99 €</span>
                <span class="discount">-50%</span>
              </div>
              <p class="price-old">35,99 €</p>
            </div>
            <div class="right-icon">
              <img src="img/hearth-search-page.png" alt="cuoricino">
            </div>
          </div>
        </div>
        <div class="product-card">
          <img src="img/top-s-4.jpg" alt="Jeans baggy">
          <div class="product-info">
            <div class="left-info">
              <p class="product-name">Jeans baggy</p>
              <div class="price-line">
                <span class="price-red">17,99 €</span>
                <span class="discount">-50%</span>
              </div>
              <p class="price-old">35,99 €</p>
            </div>
            <div class="right-icon">
              <img src="img/hearth-search-page.png" alt="cuoricino">
            </div>
          </div>
        </div>
        <div class="product-card">
          <img src="img/top-s-5.jpg" alt="Jeans baggy">
          <div class="product-info">
            <div class="left-info">
              <p class="product-name">Jeans baggy</p>
              <div class="price-line">
                <span class="price-red">17,99 €</span>
                <span class="discount">-50%</span>
              </div>
              <p class="price-old">35,99 €</p>
            </div>
            <div class="right-icon">
              <img src="img/hearth-search-page.png" alt="cuoricino">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
<footer>
        <div class="footer-container">
          <div class="footer-column">
            <h3>Ti serve una mano?</h3>
            <p><img class="wa-icon" src="img/whatsapp.png"><strong id = "traslate">WhatsApp</strong></p>
            <p>💻 <strong id = "traslate">Accedi alla chat</strong></p>
            <p class="small-text">Da lunedì a venerdì dalle 10:00 alle 16:00.</p>  
            <p>📞 <strong id = "traslate">Chiama 800 875 613</strong></p>
            <p class="small-text">Da lunedì a venerdì dalle 10:00 alle 16:00.</p>
          </div>
      
          <div class="footer-column">
            <h3>Aiuto</h3>
            <ul>
              <li><a href="#">Acquistare online</a></li>
              <li><a href="#">Pagamento</a></li>
              <li><a href="#">Invio</a></li>
              <li><a href="#">Resituzioni</a></li>
              <li><a href="#">Carta Regalo</a></li>
              <li><a href="#">Scontrino Regalo</a></li>
              <li><a href="#">Cerca scontrino</a></li>
              <li><a href="#">Acquista come ospite</a></li>
              <li><a href="#">Scontrino elettronico</a></li>
              <li><a href="#">Cancella la mia iscrizione</a></li>
            </ul>
          </div>
      
          <div class="footer-column">
            <h3>We are BERSHKA</h3>
            <ul>
              <li><a href="#">Guida all’imballaggio</a></li>
              <li><a href="#">Informazioni su BERSHKA</a></li>
              <li><a href="#">Sostenibilità</a></li>
              <li><a href="#">Lavora con noi</a></li>
              <li><a href="#">Stampa</a></li>
              <li><a href="#">I nostri negozi</a></li>
            </ul>
          </div>
      
          <div class="footer-column">
            <h3>Possiamo consigliarti</h3>
            <ul>
              <li><a href="#">Giubbotti donna</a></li>
              <li><a href="#">Vestiti donna</a></li>
              <li><a href="#">Top e body donna</a></li>
              <li><a href="#">Jeans donna</a></li>
              <li><a href="#">Pantaloni donna</a></li>
            </ul>
          </div>
          
          <div class="footer-column social">
            <h3>Seguici su</h3>
            <div class="social-icons">
              <a href="#"><img src="./img/instagram.svg"><i class="fab fa-instagram"></i></a>
              <a href="#"><img src="./img/facebook.svg"><i class="fab fa-facebook"></i></a>
              <a href="#"><img src="./img/twitter.svg"><i class="fab fa-twitter"></i></a>
              <a href="#"><img src="./img/tiktok.svg"><i class="fab fa-tiktok"></i></a>
              <a href="#"><img src="./img/snapchat.svg"><i class="fab fa-snapchat"></i></a>
              <a href="#"><img src="./img/youtube.svg"><i class="fab fa-youtube"></i></a>
              <a href="#"><img src="./img/pinterest.svg"><i class="fab fa-pinterest"></i></a>
              <a href="#"><img src="./img/spotify.svg"><i class="fab fa-spotify"></i></a>
            </div>
          </div>
        </div>
      
        <div class="footer-bottom">
          <p>🇮🇹 Italy | Italiano | © 2025 BERSHKA</p>
        </div>
      </footer>
</body>
</html>