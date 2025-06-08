// funzione per chiudere tutte le finestre di navigazione tranne quella attiva
function chiudiAltriModaliNav(activeModalId) {
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
}

// Funzione per aprire una modale
function apriModale(triggerSelector, modalSelector) {
document.querySelector(triggerSelector).addEventListener('click', () => {
  chiudiAltriModaliNav(modalSelector); // chiudi gli altri prima di aprire il nuovo
  const modale = document.querySelector(modalSelector);
  modale.classList.remove('hidden');
  modale.classList.add('show');
});
}

// Funzione per chiudere una modale
function chiudiModale(closeBtnSelector, modalSelector) {
document.querySelector(closeBtnSelector).addEventListener('click', () => {
  const modale = document.querySelector(modalSelector);
  modale.classList.remove('show');
  modale.classList.add('hidden');
});
}

// Apertura e chiusura modale "Carrello"
apriModale('#linksRIGHT a:nth-child(3)', '#cart-modal');
chiudiModale('.close-btn-cart', '#cart-modal');

function chiudiNavModale(modalSelector) {
const navModale = document.querySelector(modalSelector);

navModale.addEventListener('mouseleave', () => {
  navModale.classList.remove('show');
  navModale.classList.add('hidden');
});
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


});
/* MENU MOBILE */
const openBtn = document.getElementById('menu-mobile');
const closeBtn = document.getElementById('close-menu');
const menu = document.getElementById('side-menu');

openBtn.addEventListener('click', () => {
menu.classList.add('open');
});

closeBtn.addEventListener('click', () => {
menu.classList.remove('open');
});

// Tabs attivi
const tabs = document.querySelectorAll('#gender-tabs .tab');
const contents = document.querySelectorAll('.menu-content');

tabs.forEach(tab => {
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
});

/* API CONVERSIONE VALUTA */
// Selettori DOM
const currencySelector = document.getElementById('currency-selector');
const menuValuta = document.getElementById('currency-menu');
const currencyDropdown = document.getElementById('currency');

// Mappa simboli-valuta
const symbols = {
  EUR: '€',
  USD: '$',
  GBP: '£',
  JPY: '¥',
  CAD: 'C$',
  AUD: 'A$',
  CHF: 'CHF'
};

// Mappa inversa simbolo -> codice
const reverseSymbols = {};
for (const code in symbols) {
  reverseSymbols[symbols[code]] = code;
}

// Mostra/nasconde il menu valuta
currencySelector.addEventListener('click', () => {
  menuValuta.classList.toggle('hidden');
});

// Quando si seleziona una nuova valuta
currencyDropdown.addEventListener('change', () => {
  const selectedCurrency = currencyDropdown.value;
  console.log('Valuta selezionata:', selectedCurrency);
  menuValuta.classList.add('hidden');
  updateExchangeRates(selectedCurrency);
});

// Funzione per aggiornare i prezzi in base alla valuta selezionata
function updateExchangeRates(toCurrency) {
  const priceSelectors = ['.price', '.price-red', '.price-old'];
  const priceElements = document.querySelectorAll(priceSelectors.join(', '));

  priceElements.forEach(priceElement => {
    const text = priceElement.textContent.trim();

    // Trova il simbolo alla fine
    let matchedSymbol = null;
    let symbolLength = 0;

    for (const symbol of Object.values(symbols)) {
      if (text.endsWith(symbol)) {
        matchedSymbol = symbol;
        symbolLength = symbol.length;
        break;
      }
    }

    if (!matchedSymbol) return;

    // Estrai e converti l'importo
    const amountText = text.slice(0, -symbolLength).trim().replace(',', '.');
    const amount = parseFloat(amountText);
    if (isNaN(amount)) return;

    const fromCurrency = reverseSymbols[matchedSymbol];
    if (fromCurrency === toCurrency) return;

    // Chiamata al file PHP per la conversione
    fetch(`convert_currency.php?from=${fromCurrency}&to=${toCurrency}&amount=${amount}`)
      .then(response => {
        if (!response.ok) throw new Error('Errore nella richiesta al server PHP');
        return response.json();
      })
      .then(data => {
        if (data.error) throw new Error(data.error);
        const converted = parseFloat(data.converted).toFixed(2);
        const newSymbol = symbols[toCurrency] || toCurrency;
        priceElement.textContent = `${converted} ${newSymbol}`;
      })
      .catch(error => {
        console.error('Errore:', error);
      });
  });
}
const selector = document.getElementById('language-selector');
const menuTraslate = document.getElementById('language-menu');
const languageSelect = document.getElementById('language');

// Mostra/nasconde il menu a tendina
selector.addEventListener('click', () => {
  menuTraslate.classList.toggle('hidden');
});

// Traduzione al cambio lingua
languageSelect.addEventListener('change', () => {
  const selectedLang = languageSelect.value;

  // Seleziona solo i tag da tradurre
  const elements = document.querySelectorAll(
    '#linksLEFT a, #gender-tabs a, .menu-content li, #linksRIGHT a, #search-text, .box-text h1, .product-text, .text_wrapper a, .gtl-text-container p, .cta-button, .suggested-text h2, .suggested-product h3, .spam-conto h2, .spam-conto p, .spam-conto a, .footer-container h3, .footer-container #traslate, .footer-container .small-text, .footer-container a, .modal-title, #facebook-access, .privacy-text, .login-options .traslate, .login-submit .traslate, .signup-link, .cart-header h2, .favorites-btn .traslate, .cart-empty-content h3, .cart-empty-content p, .cart-empty-content .discover-btn, .nav-menu a, .top-search-tag .traslate, .top-search-suggest h3, .product-name, .search-input-page'
  );

  elements.forEach(el => {
    const originalText = el.textContent.trim();
    if (!originalText) return;

    // Salva testo originale solo una volta
    if (!el.dataset.original) {
      el.dataset.original = originalText;
    }

    // Se torna a italiano, ripristina
    if (selectedLang === 'it') {
      el.textContent = el.dataset.original;
      return;
    }

    // Chiama PHP per tradurre
    fetch(`translate.php?text=${encodeURIComponent(originalText)}&to=${selectedLang}`)
      .then(res => res.json())
      .then(data => {
        if (data && data.responseData && data.responseData.translatedText) {
          el.textContent = data.responseData.translatedText;
        }
      })
      .catch(err => {
        console.error('Errore nella traduzione:', err);
      });
  });

  // Chiude il menu
  menuTraslate.classList.add('hidden');
});


document.addEventListener("DOMContentLoaded", () => {
  // === FUNZIONI === 
  /*
  function removeFavorite(id) {
    fetch("remove-product.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    })
    .then(r => r.json())
    .then(data => {
      if (!data.ok) alert("Errore nella rimozione: " + (data.error || "sconosciuto"));
    })
    .catch(() => alert("Errore nella rimozione"));
  } */

  function saveProduct(product) {
    const formData = new FormData();
    formData.append("title", product.title || "");
    formData.append("snippet", product.snippet || "");
    formData.append("price", product.extracted_price || "");
    formData.append("thumbnail", product.thumbnail || "");

    fetch("save-product.php", {
      method: "POST",
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
        if (!data.ok) alert("Errore nel salvataggio");
      })
      .catch(() => alert("Errore nel salvataggio"));
  }

  // === WISHLIST PAGE ===
  const container = document.getElementById("wl-favorites-container");
  if (container) {
    fetch("load-favorites.php")
      .then(response => response.json())
      .then(favorites => {
        if (!favorites || favorites.length === 0) {
          container.innerHTML = "<p>Non hai ancora aggiunto preferiti.</p>";
          return;
        }

        favorites.forEach(product => {
          const card = document.createElement("div");
          card.className = "wl-card";

          card.innerHTML = `
            <div class="wl-image-wrapper">
              <img class="wl-product-image" src="${product.thumbnail}" alt="${product.title}">
            </div>
            <div class="wl-info">
              <p class="wl-name">${product.title}</p>
              <div class="wl-price-heart">
                <span class="wl-price">${parseFloat(product.price).toFixed(2)} €</span>
                <img class="wl-heart" src="img/filled-hearth-search-page.png" title="Rimuovi dai preferiti" alt="Rimuovi" data-id="${product.id}">
              </div>
            </div>
          `;

          card.querySelector(".wl-heart").addEventListener("click", () => {
            removeFavorite(product.id);
            card.remove();
            if (container.children.length === 0) {
              container.innerHTML = "<p>Non hai più preferiti.</p>";
            }
          });

          container.appendChild(card);
        });
      })
      .catch(err => {
        console.error("Errore nel caricamento dei preferiti:", err);
        container.innerHTML = "<p>Errore nel caricamento dei preferiti.</p>";
      });
  }

  // === SEARCH PAGE ===
  const input = document.querySelector(".search-input-page") || document.getElementById("search-input-products");
  const resultsContainer = document.querySelector("#results") || document.getElementById("results-products");
  const suggestSection = document.querySelector(".top-search-suggest") || document.querySelector(".suggest-section");
  const suggestTitle = document.querySelector(".search-suggest-text") || document.querySelector(".suggest-title");
  const topSearchTags = document.querySelector(".top-search") || document.querySelector(".top-search-tags");

  let timeout = null;

  input?.addEventListener("input", () => {
    clearTimeout(timeout);
    const query = input.value.trim();

    if (query.length < 3) {
      resultsContainer.innerHTML = "";
      if (suggestSection) suggestSection.style.display = "block";
      if (suggestTitle) suggestTitle.style.display = "block";
      if (topSearchTags) topSearchTags.style.display = "flex";
      return;
    }

    timeout = setTimeout(() => {
      fetch(`search_content.php?q=${encodeURIComponent(query)}`)
        .then(res => res.json())
        .then(data => {
          resultsContainer.innerHTML = "";

          if (suggestSection) suggestSection.style.display = "none";
          if (suggestTitle) suggestTitle.style.display = "none";
          if (topSearchTags) topSearchTags.style.display = "none";

          if (!data.shopping_results || data.shopping_results.length === 0) {
            resultsContainer.innerHTML = "<p>Nessun risultato trovato.</p>";
            return;
          }

          fetch("fetch-product.php")
            .then(res => res.json())
            .then(favorites => {
              data.shopping_results.forEach(item => {
                const isFav = favorites.some(fav => fav.title === item.title);

                const card = document.createElement("div");
                card.className = "product-card";
                card.dataset.item = JSON.stringify(item);

                card.innerHTML = `
                  <img class="product-image" src="${item.thumbnail}" alt="${item.title}">
                  <div class="product-info">
                    <div class="left-info">
                      <p class="product-name">${item.title}</p>
                      <div class="price-line">
                        <span class="product-price">${item.extracted_price ? item.extracted_price.toFixed(2) + " €" : ""}</span>
                        ${item.discount ? `<span class="discount">${item.discount}</span>` : ""}
                      </div>
                      ${item.previous_price ? `<p class="price-old">${item.previous_price.toFixed(2)} €</p>` : ""}
                    </div>
                    <div class="right-icon">
                      <img class="fav-icon" src="${isFav ? 'img/filled-hearth-search-page.png' : 'img/hearth-search-page.png'}" alt="cuoricino">
                    </div>
                  </div>
                `;

                resultsContainer.appendChild(card);
              });
            });
        })
        .catch(err => {
          console.error("Errore nella ricerca:", err);
          resultsContainer.innerHTML = "<p>Errore nel caricamento dei risultati.</p>";
        });
    }, 500);
  });

  // === Toggle preferito al click sul cuoricino nei risultati ===
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("fav-icon")) {
      const card = e.target.closest(".product-card");
      const item = JSON.parse(card.dataset.item);

      const isFavorite = e.target.src.includes("filled-hearth-search-page.png");

      if (isFavorite) {
        removeFavorite(item.id); // usa item.id se disponibile
        e.target.src = "img/hearth-search-page.png";
        e.target.title = "Aggiungi ai preferiti";
      } else {
        saveProduct(item);
        e.target.src = "img/filled-hearth-search-page.png";
        e.target.title = "Rimuovi dai preferiti";
      }
    }
  });
});