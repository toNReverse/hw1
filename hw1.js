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
if (currencySelector && menuValuta) {
  currencySelector.addEventListener("click", () => {
    menuValuta.classList.toggle("hidden");
  });
}

// Quando si seleziona una nuova valuta
if (currencyDropdown && menuValuta) {
  currencyDropdown.addEventListener('change', () => {
    const selectedCurrency = currencyDropdown.value;
    console.log('Valuta selezionata:', selectedCurrency);
    menuValuta.classList.add('hidden');
    updateExchangeRates(selectedCurrency);
  });
}

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
if (selector && menuTraslate) {
  selector.addEventListener('click', () => {
    menuTraslate.classList.toggle('hidden');
  });
}

// Traduzione al cambio lingua
if (languageSelect) {
  languageSelect.addEventListener('change', () => {
    const selectedLang = languageSelect.value;

    const elements = document.querySelectorAll(
      '#linksLEFT a, #gender-tabs a, .menu-content li, #linksRIGHT a, #search-text, .box-text h1, .product-text, .text_wrapper a, .gtl-text-container p, .cta-button, .suggested-text h2, .suggested-product h3, .spam-conto h2, .spam-conto p, .spam-conto a, .footer-container h3, .footer-container #traslate, .footer-container .small-text, .footer-container a, .modal-title, #facebook-access, .privacy-text, .login-options .traslate, .login-submit .traslate, .signup-link, .cart-header h2, .favorites-btn .traslate, .cart-empty-content h3, .cart-empty-content p, .cart-empty-content .discover-btn, .nav-menu a, .top-search-tag .traslate, .top-search-suggest h3, .product-name, .search-input-page'
    );

    elements.forEach(el => {
      const originalText = el.textContent.trim();
      if (!originalText) return;

      if (!el.dataset.original) {
        el.dataset.original = originalText;
      }

      if (selectedLang === 'it') {
        el.textContent = el.dataset.original;
        return;
      }

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

    if (menuTraslate) {
      menuTraslate.classList.add('hidden');
    }
  });
}

// === SEARCH PAGE ===
document.addEventListener("DOMContentLoaded", () => {
  // Recupera l'input di ricerca (può avere classi/ID diversi in base alla pagina)
  const input = document.querySelector(".search-input-page") || document.getElementById("search-input-products");

  // Contenitore dei risultati di ricerca (anche qui supporta due pagine diverse)
  const resultsContainer = document.querySelector("#results") || document.getElementById("results-products");

  // Sezioni opzionali per i suggerimenti visivi da mostrare o nascondere
  const suggestSection = document.querySelector(".top-search-suggest") || document.querySelector(".suggest-section");
  const suggestTitle = document.querySelector(".search-suggest-text") || document.querySelector(".suggest-title");
  const topSearchTags = document.querySelector(".top-search") || document.querySelector(".top-search-tags");

  let timeout = null; // Timer per il debounce (evita troppe richieste in tempo reale)

  // Listener sull'input di ricerca
  input?.addEventListener("input", () => {
    clearTimeout(timeout); // Annulla il timer precedente
    const query = input.value.trim(); // Rimuove spazi extra dalla query

    // Se la query è troppo corta, ripristina i suggerimenti e termina
    if (query.length < 3) {
      resultsContainer.innerHTML = "";
      if (suggestSection) suggestSection.style.display = "block";
      if (suggestTitle) suggestTitle.style.display = "block";
      if (topSearchTags) topSearchTags.style.display = "flex";
      return;
    }

    // Attende 500ms prima di eseguire la ricerca (debounce)
    timeout = setTimeout(() => {
      fetch(`search_content.php?q=${encodeURIComponent(query)}`) // Richiesta alla ricerca
        .then(res => res.json())
        .then(data => {
          resultsContainer.innerHTML = ""; // Svuota i risultati precedenti

          // Nasconde i suggerimenti
          if (suggestSection) suggestSection.style.display = "none";
          if (suggestTitle) suggestTitle.style.display = "none";
          if (topSearchTags) topSearchTags.style.display = "none";

          // Se non ci sono risultati, mostra un messaggio
          if (!data.shopping_results || data.shopping_results.length === 0) {
            resultsContainer.innerHTML = "<p>Nessun risultato trovato.</p>";
            return;
          }

          // Recupera i prodotti già nei preferiti
          fetch("fetch-product.php")
            .then(res => res.json())
            .then(favorites => {
              // Per ogni risultato della ricerca
              data.shopping_results.forEach(item => {
                // Verifica se l'articolo è già nei preferiti
                const isFav = favorites.some(fav => fav.title === item.title);

                // Crea la card HTML del prodotto
                const card = document.createElement("div");
                card.className = "product-card";
                card.dataset.item = JSON.stringify(item); // Salva i dati per uso futuro

                // HTML della card, incluso il cuoricino preferito
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
                    <a class="cart-btn" data-title="${item.title}" data-thumbnail="${item.thumbnail}" data-price="${item.extracted_price || 0}">+</a>
                  </div>
                </div>
              `;

                // Aggiunge la card al contenitore dei risultati
                resultsContainer.appendChild(card);
              });
            });
        })
        .catch(err => {
          console.error("Errore nella ricerca:", err);
          resultsContainer.innerHTML = "<p>Errore nel caricamento dei risultati.</p>";
        });
    }, 500); // 500ms di attesa dopo l’ultimo input
  });

  // === Toggle preferito al click sul cuoricino nei risultati ===
  document.addEventListener("click", (e) => {
    // Verifica se il click è avvenuto su un'icona "fav-icon"
    if (e.target.classList.contains("fav-icon")) {
      const card = e.target.closest(".product-card"); // Trova la card corrispondente
      const item = JSON.parse(card.dataset.item); // Recupera i dati del prodotto

      const isFavorite = e.target.src.includes("filled-hearth-search-page.png");

      if (isFavorite) {
        // Se era già nei preferiti, lo rimuove
        removeFavorite(item.id);
        e.target.src = "img/hearth-search-page.png";
        e.target.title = "Aggiungi ai preferiti";
      } else {
        // Altrimenti lo salva nei preferiti
        saveProduct(item);
        e.target.src = "img/filled-hearth-search-page.png";
        e.target.title = "Rimuovi dai preferiti";
      }
    }
  });

  // === Funzione per rimuovere un preferito dal database ===
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
  }

  // === Funzione per salvare un prodotto nei preferiti ===
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
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("cart-btn")) {
      const btn = e.target;
      const isInCart = btn.textContent === "-";
  
      const title = btn.dataset.title;
      const thumbnail = btn.dataset.thumbnail;
      const price = btn.dataset.price;
  
      if (isInCart) {
        // Rimuove dal carrello
        fetch("remove-from-cart.php", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title })
        })
        .then(res => res.json())
        .then(data => {
          if (data.ok) {
            btn.textContent = "+";
          } else {
            alert("Errore nella rimozione dal carrello");
          }
        });
      } else {
        // Aggiunge al carrello
        const formData = new FormData();
        formData.append("title", title);
        formData.append("thumbnail", thumbnail);
        formData.append("price", price);
  
        fetch("add-to-cart.php", {
          method: "POST",
          body: formData
        })
        .then(res => res.json())
        .then(data => {
          if (data.ok) {
            btn.textContent = "-";
          } else {
            alert("Errore nell'aggiunta al carrello");
          }
        });
      }
    }
  });

});