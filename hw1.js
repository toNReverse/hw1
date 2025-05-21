// funzione per chiudere tutte le finestre di navigazione tranne quella attiva
function chiudiAltriModaliNav(activeModalId) {
<<<<<<< HEAD
    const navModals = ['#nav-donna', '#nav-uomo', '#nav-bskteen'];
    
    navModals.forEach(modalId => {
        if (modalId !== activeModalId) {
            const modal = document.querySelector(modalId);
            if (modal) {
                modal.classList.remove('show');
                modal.classList.add('hidden');
            }
        }
    });
=======
  const navModals = ['#nav-donna', '#nav-uomo', '#nav-bskteen'];
  
  navModals.forEach(modalId => {
      if (modalId !== activeModalId) {
          const modal = document.querySelector(modalId);
          if (modal) {
              modal.classList.remove('show');
              modal.classList.add('hidden');
          }
      }
  });
>>>>>>> 8198595 (lettura non completa di index.php)
}

// Funzione per aprire una modale
function apriModale(triggerSelector, modalSelector) {
<<<<<<< HEAD
  document.querySelector(triggerSelector).addEventListener('click', () => {
    chiudiAltriModaliNav(modalSelector); // chiudi gli altri prima di aprire il nuovo
    const modale = document.querySelector(modalSelector);
    modale.classList.remove('hidden');
    modale.classList.add('show');
  });
=======
document.querySelector(triggerSelector).addEventListener('click', () => {
  chiudiAltriModaliNav(modalSelector); // chiudi gli altri prima di aprire il nuovo
  const modale = document.querySelector(modalSelector);
  modale.classList.remove('hidden');
  modale.classList.add('show');
});
>>>>>>> 8198595 (lettura non completa di index.php)
}

// Funzione per chiudere una modale
function chiudiModale(closeBtnSelector, modalSelector) {
<<<<<<< HEAD
  document.querySelector(closeBtnSelector).addEventListener('click', () => {
    const modale = document.querySelector(modalSelector);
    modale.classList.remove('show');
    modale.classList.add('hidden');
  });
=======
document.querySelector(closeBtnSelector).addEventListener('click', () => {
  const modale = document.querySelector(modalSelector);
  modale.classList.remove('show');
  modale.classList.add('hidden');
});
>>>>>>> 8198595 (lettura non completa di index.php)
}

// Apertura e chiusura modale "Accedi"
apriModale('#linksRIGHT a:nth-child(2)', '#login-modal');
chiudiModale('.close-btn-log', '#login-modal');

<<<<<<< HEAD
=======
//Apertura modale "Registrati" da "Accedi"
chiudiModale('#log-to-reg', '#login-modal');
apriModale('#log-to-reg', '#signup-modal');
chiudiModale('.close-btn-signup', '#signup-modal');

//Apertura modale "Accedi" da "Registrati"
chiudiModale('#reg-to-log', '#signup-modal');
apriModale('#reg-to-log', '#login-modal');


>>>>>>> 8198595 (lettura non completa di index.php)
// Apertura e chiusura modale "Carrello"
apriModale('#linksRIGHT a:nth-child(3)', '#cart-modal');
chiudiModale('.close-btn-cart', '#cart-modal');

function chiudiNavModale(modalSelector) {
<<<<<<< HEAD
  const navModale = document.querySelector(modalSelector);

  navModale.addEventListener('mouseleave', () => {
    navModale.classList.remove('show');
    navModale.classList.add('hidden');
  });
=======
const navModale = document.querySelector(modalSelector);

navModale.addEventListener('mouseleave', () => {
  navModale.classList.remove('show');
  navModale.classList.add('hidden');
});
>>>>>>> 8198595 (lettura non completa di index.php)
}

// Apertura modali Navbar
apriModale('#linksLEFT a:nth-child(1)', '#nav-donna');
apriModale('#linksLEFT a:nth-child(2)', '#nav-uomo');
apriModale('#linksLEFT a:nth-child(3)', '#nav-bskteen');

// Chiusura modali Navbar al mouseleave
chiudiNavModale('#nav-donna');
chiudiNavModale('#nav-uomo');
chiudiNavModale('#nav-bskteen');

let isSearchOpen = false;

document.querySelector('.search-container').addEventListener('click', function() {
<<<<<<< HEAD
    const searchText = document.querySelector('#search-text');
    const searchIcon = document.querySelector('.search-icon');
    const navbar = document.querySelector('.navbar-container');
    const elementsToToggle = [
        document.querySelector('section'),
        document.querySelector('#linksLEFT'),
    ];

    isSearchOpen = !isSearchOpen;

    // Toggle elements visibility
    elementsToToggle.forEach(el => {
        if (el) {
            el.style.display = isSearchOpen ? 'none' : '';
        }
    });

    // Toglie il bordo da navbar 
    navbar.style.borderBottom = isSearchOpen ? 'none' : '1px solid black';


    // Attiva/disattiva la visibilità dell'input di ricerca
    searchText.textContent = isSearchOpen ? "CHIUDI" : "CERCA";
    searchIcon.src = isSearchOpen ? "./img/close-icon.png" : "./img/54481.png";
    
    // Cambia il colore del testo dell'input di ricerca
    document.querySelector('#search-page').style.display = isSearchOpen ? 'block' : 'none';
=======
  const searchText = document.querySelector('#search-text');
  const searchIcon = document.querySelector('.search-icon');
  const navbar = document.querySelector('.navbar-container');
  const elementsToToggle = [
      document.querySelector('section'),
      document.querySelector('#linksLEFT'),
  ];

  isSearchOpen = !isSearchOpen;

  // Toggle elements visibility
  elementsToToggle.forEach(el => {
      if (el) {
          el.style.display = isSearchOpen ? 'none' : '';
      }
  });

  // Toglie il bordo da navbar 
  navbar.style.borderBottom = isSearchOpen ? 'none' : '1px solid black';


  // Attiva/disattiva la visibilità dell'input di ricerca
  searchText.textContent = isSearchOpen ? "CHIUDI" : "CERCA";
  searchIcon.src = isSearchOpen ? "./img/close-icon.png" : "./img/54481.png";
  
  // Cambia il colore del testo dell'input di ricerca
  document.querySelector('#search-page').style.display = isSearchOpen ? 'block' : 'none';
>>>>>>> 8198595 (lettura non completa di index.php)


});
document.querySelectorAll('.right-icon img').forEach(heartIcon => {
<<<<<<< HEAD
  heartIcon.addEventListener('click', function() {
      // Toggle between filled and empty heart
      const isFilled = this.src.includes('filled-hearth');
      this.src = isFilled ? './img/hearth-search-page.png' : './img/filled-hearth-search-page.png';
  });
=======
heartIcon.addEventListener('click', function() {
    // Toggle between filled and empty heart
    const isFilled = this.src.includes('filled-hearth');
    this.src = isFilled ? './img/hearth-search-page.png' : './img/filled-hearth-search-page.png';
});
>>>>>>> 8198595 (lettura non completa di index.php)
});

/* MENU MOBILE */
const openBtn = document.getElementById('menu-mobile');
const closeBtn = document.getElementById('close-menu');
const menu = document.getElementById('side-menu');

openBtn.addEventListener('click', () => {
<<<<<<< HEAD
  menu.classList.add('open');
});

closeBtn.addEventListener('click', () => {
  menu.classList.remove('open');
=======
menu.classList.add('open');
});

closeBtn.addEventListener('click', () => {
menu.classList.remove('open');
>>>>>>> 8198595 (lettura non completa di index.php)
});

// Tabs attivi
const tabs = document.querySelectorAll('#gender-tabs .tab');
const contents = document.querySelectorAll('.menu-content');

tabs.forEach(tab => {
<<<<<<< HEAD
  tab.addEventListener('click', function (e) {
    e.preventDefault();

    // Aggiorna tab attivo
    tabs.forEach(t => t.classList.remove('active'));
    this.classList.add('active');

    // Mostra il contenuto corretto
    const gender = this.getAttribute('data-gender');
    contents.forEach(content => content.style.display = 'none');
    document.getElementById('menu-' + gender).style.display = 'block';
  });
=======
tab.addEventListener('click', function (e) {
  e.preventDefault();

  // Aggiorna tab attivo
  tabs.forEach(t => t.classList.remove('active'));
  this.classList.add('active');

  // Mostra il contenuto corretto
  const gender = this.getAttribute('data-gender');
  contents.forEach(content => content.style.display = 'none');
  document.getElementById('menu-' + gender).style.display = 'block';
});
>>>>>>> 8198595 (lettura non completa di index.php)
});

/* API CONVERSIONE VALUTA */
// Selettori DOM
const currencySelector = document.getElementById('currency-selector');
const menuValuta = document.getElementById('currency-menu');
const currencyDropdown = document.getElementById('currency');

// Mappa simboli-valuta
const symbols = {
<<<<<<< HEAD
  EUR: '€',
  USD: '$',
  GBP: '£',
  JPY: '¥',
  CAD: 'C$',
  AUD: 'A$',
  CHF: 'CHF'
=======
EUR: '€',
USD: '$',
GBP: '£',
JPY: '¥',
CAD: 'C$',
AUD: 'A$',
CHF: 'CHF'
>>>>>>> 8198595 (lettura non completa di index.php)
};

// Mappa inversa simbolo -> codice
const reverseSymbols = {};
for (const code in symbols) {
<<<<<<< HEAD
  reverseSymbols[symbols[code]] = code;
=======
reverseSymbols[symbols[code]] = code;
>>>>>>> 8198595 (lettura non completa di index.php)
}

// Mostra/nasconde il menu valuta
currencySelector.addEventListener('click', () => {
<<<<<<< HEAD
  menuValuta.classList.toggle('hidden');
=======
menuValuta.classList.toggle('hidden');
>>>>>>> 8198595 (lettura non completa di index.php)
});

// Quando si seleziona una nuova valuta
currencyDropdown.addEventListener('change', () => {
<<<<<<< HEAD
  const selectedCurrency = currencyDropdown.value;
  console.log('Valuta selezionata:', selectedCurrency); // Viene stampato il codice in console.
  menuValuta.classList.add('hidden'); // Il menu viene chiuso.
  updateExchangeRates(selectedCurrency); // Viene chiamata updateExchangeRates per convertire i prezzi.
=======
const selectedCurrency = currencyDropdown.value;
console.log('Valuta selezionata:', selectedCurrency); // Viene stampato il codice in console.
menuValuta.classList.add('hidden'); // Il menu viene chiuso.
updateExchangeRates(selectedCurrency); // Viene chiamata updateExchangeRates per convertire i prezzi.
>>>>>>> 8198595 (lettura non completa di index.php)

});

// Funzione per aggiornare i prezzi in base alla valuta selezionata
function updateExchangeRates(toCurrency) {
<<<<<<< HEAD
  const priceSelectors = ['.price', '.price-red', '.price-old'];
  const priceElements = document.querySelectorAll(priceSelectors.join(', '));

  priceElements.forEach(priceElement => {
    const text = priceElement.textContent.trim(); // Per ogni prezzo ottiene il testo e lo ripulisce.


    // Trova il simbolo alla fine della stringa
    let matchedSymbol = null;
    let symbolLength = 0;

    /* Cerca quale simbolo di valuta è presente nel testo, una volta trovato separa l’importo (amountText) dal simbolo 
    e converte il testo in numero (parseFloat). */
    for (const symbol of Object.values(symbols)) {
      if (text.endsWith(symbol)) {
        matchedSymbol = symbol;
        symbolLength = symbol.length;
        break;
      }
    }

    if (!matchedSymbol) return;

    // Ottieni l'importo come numero
    const amountText = text.slice(0, -symbolLength).trim().replace(',', '.');
    const amount = parseFloat(amountText);
    if (isNaN(amount)) return;

    // Codice valuta di partenza
    const fromCurrency = reverseSymbols[matchedSymbol]; // Determina da quale valuta stai convertendo.
    if (fromCurrency === toCurrency) return;  // Se la valuta selezionata è la stessa di quella attuale, non fa nulla.


    // API di conversione
    const apiKey = 'INSERISCI API KEY :P';
    const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCurrency}`;

    fetch(apiUrl)
      .then(response => {
        if (!response.ok) throw new Error('Errore nella risposta API');
        return response.json();
      })
      .then(json => {
        const rate = json.conversion_rates[toCurrency];
        if (!rate) return;

        const converted = (amount * rate).toFixed(2); // Moltiplica l’importo originale per il tasso di cambio e arrotonda a due decimali.
        const newSymbol = symbols[toCurrency] || toCurrency;  //Cerca il simbolo associato al codice valuta scelto, se non trovato -> fallback 
        priceElement.textContent = `${converted} ${newSymbol}`;
      })
      .catch(error => {
        console.error('Errore:', error);
      });
  });
=======
const priceSelectors = ['.price', '.price-red', '.price-old'];
const priceElements = document.querySelectorAll(priceSelectors.join(', '));

priceElements.forEach(priceElement => {
  const text = priceElement.textContent.trim(); // Per ogni prezzo ottiene il testo e lo ripulisce.


  // Trova il simbolo alla fine della stringa
  let matchedSymbol = null;
  let symbolLength = 0;

  /* Cerca quale simbolo di valuta è presente nel testo, una volta trovato separa l’importo (amountText) dal simbolo 
  e converte il testo in numero (parseFloat). */
  for (const symbol of Object.values(symbols)) {
    if (text.endsWith(symbol)) {
      matchedSymbol = symbol;
      symbolLength = symbol.length;
      break;
    }
  }

  if (!matchedSymbol) return;

  // Ottieni l'importo come numero
  const amountText = text.slice(0, -symbolLength).trim().replace(',', '.');
  const amount = parseFloat(amountText);
  if (isNaN(amount)) return;

  // Codice valuta di partenza
  const fromCurrency = reverseSymbols[matchedSymbol]; // Determina da quale valuta stai convertendo.
  if (fromCurrency === toCurrency) return;  // Se la valuta selezionata è la stessa di quella attuale, non fa nulla.


  // API di conversione
  const apiKey = 'INSERISCI API KEY :P';
  const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCurrency}`;

  fetch(apiUrl)
    .then(response => {
      if (!response.ok) throw new Error('Errore nella risposta API');
      return response.json();
    })
    .then(json => {
      const rate = json.conversion_rates[toCurrency];
      if (!rate) return;

      const converted = (amount * rate).toFixed(2); // Moltiplica l’importo originale per il tasso di cambio e arrotonda a due decimali.
      const newSymbol = symbols[toCurrency] || toCurrency;  //Cerca il simbolo associato al codice valuta scelto, se non trovato -> fallback 
      priceElement.textContent = `${converted} ${newSymbol}`;
    })
    .catch(error => {
      console.error('Errore:', error);
    });
});
>>>>>>> 8198595 (lettura non completa di index.php)
}
/* API TRADUZIONE */
const selector = document.getElementById('language-selector');
const menuTraslate = document.getElementById('language-menu');
const languageSelect = document.getElementById('language');

// Mostra/nasconde il menu a tendina
selector.addEventListener('click', () => {
<<<<<<< HEAD
  menuTraslate.classList.toggle('hidden');
=======
menuTraslate.classList.toggle('hidden');
>>>>>>> 8198595 (lettura non completa di index.php)
});

// Traduzione al cambio lingua
languageSelect.addEventListener('change', () => {
<<<<<<< HEAD
    const selectedLang = languageSelect.value;

    // Seleziona solo tag specifici per la traduzione    
    const elements = document.querySelectorAll('#linksLEFT a, #gender-tabs a, .menu-content li, #linksRIGHT a, #search-text, .box-text h1, .product-text, .text_wrapper a, .gtl-text-container p, .cta-button, .suggested-text h2, .suggested-product h3, .spam-conto h2, .spam-conto p, .spam-conto a, .footer-container h3, .footer-container #traslate, .footer-container .small-text, .footer-container a, .modal-title, #facebook-access, .privacy-text, .login-options .traslate, .login-submit .traslate, .signup-link, .cart-header h2, .favorites-btn .traslate, .cart-empty-content h3, .cart-empty-content p, .cart-empty-content .discover-btn, .nav-menu a, .top-search-tag .traslate, .top-search-suggest h3, .product-name, .search-input-page'); //continua side page

    elements.forEach(el => {
        const originalText = el.textContent.trim();

        // Ignora gli elementi vuoti
        if (!originalText) return;

        // Salva il testo originale se non è già stato salvato
        if (!el.dataset.original) {
            el.dataset.original = originalText;
        }

        // Se la lingua selezionata è l'italiano, ripristina il testo originale
        if (selectedLang === 'it') {
            el.textContent = el.dataset.original;
            return;
        }

        // Fetch la traduzione
        fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(originalText)}&langpair=it|${selectedLang}`)
            .then(res => res.json())
            .then(data => {
                el.textContent = data.responseData.translatedText;
            })
            .catch(err => {
                console.error('Errore nella traduzione:', err);
            });
    });

    // Chiudi il menu dopo la selezione
    menuTraslate.classList.add('hidden');
});
=======
  const selectedLang = languageSelect.value;

  // Seleziona solo tag specifici per la traduzione    
  const elements = document.querySelectorAll('#linksLEFT a, #gender-tabs a, .menu-content li, #linksRIGHT a, #search-text, .box-text h1, .product-text, .text_wrapper a, .gtl-text-container p, .cta-button, .suggested-text h2, .suggested-product h3, .spam-conto h2, .spam-conto p, .spam-conto a, .footer-container h3, .footer-container #traslate, .footer-container .small-text, .footer-container a, .modal-title, #facebook-access, .privacy-text, .login-options .traslate, .login-submit .traslate, .signup-link, .cart-header h2, .favorites-btn .traslate, .cart-empty-content h3, .cart-empty-content p, .cart-empty-content .discover-btn, .nav-menu a, .top-search-tag .traslate, .top-search-suggest h3, .product-name, .search-input-page'); //continua side page

  elements.forEach(el => {
      const originalText = el.textContent.trim();

      // Ignora gli elementi vuoti
      if (!originalText) return;

      // Salva il testo originale se non è già stato salvato
      if (!el.dataset.original) {
          el.dataset.original = originalText;
      }

      // Se la lingua selezionata è l'italiano, ripristina il testo originale
      if (selectedLang === 'it') {
          el.textContent = el.dataset.original;
          return;
      }

      // Fetch la traduzione
      fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(originalText)}&langpair=it|${selectedLang}`)
          .then(res => res.json())
          .then(data => {
              el.textContent = data.responseData.translatedText;
          })
          .catch(err => {
              console.error('Errore nella traduzione:', err);
          });
  });

  // Chiudi il menu dopo la selezione
  menuTraslate.classList.add('hidden');
});
/* SIGN UP MODAL */
>>>>>>> 8198595 (lettura non completa di index.php)
