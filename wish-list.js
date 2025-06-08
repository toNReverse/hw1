document.addEventListener('DOMContentLoaded', () => {
  fetch('load-favorites.php')
    .then(response => response.json())
    .then(json => {
      const container = document.getElementById('wl-favorites-container');

      if (json.length === 0) {
        container.innerHTML = "<p>Nessun prodotto nei preferiti.</p>";
        return;
      }

      json.forEach(product => {
        const card = document.createElement('div');
        card.classList.add('wl-card');

        card.innerHTML = `
          <div class="wl-image-wrapper">
            <img src="${product.thumbnail}" alt="${product.title}" class="wl-product-image" />
            <a href="#" class="wl-add-btn">+</a>
          </div>
          <div class="wl-info">
            <div class="wl-name">${product.title}</div>
            <div class="wl-price-heart">
              <div class="wl-price">${product.price} €</div>
              <img src="img/filled-hearth-search-page.png" alt="Cuore" class="wl-heart" />
            </div>
          </div>
        `;

        container.appendChild(card);
      });

      const hearts = document.querySelectorAll('.wl-heart');
      hearts.forEach(heart => {
        heart.addEventListener('click', () => {
          const title = heart.closest('.wl-card').querySelector('.wl-name').textContent;
          removeFavorite(title);
          heart.closest('.wl-card').remove();
        });
      });

    })
    .catch(error => {
      console.error('Errore nel caricamento dei preferiti:', error);
    });
});