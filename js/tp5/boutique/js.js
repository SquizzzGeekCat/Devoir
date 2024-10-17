<script>
// Sélectionner toutes les cartes
const cards = document.querySelectorAll(".card");
const list_panier = document.getElementById("listPanier");

// Fonction pour mettre à jour ou ajouter un article dans le panier
function addToCard(card) {
  const title = card.querySelector(".titleCard").textContent;
  const quantity = parseInt(card.querySelector(".how_many").value);
  const unitPrice = parseFloat(card.querySelector(".prix").innerText);

  let totalPrice = quantity * unitPrice;

  // Vérifier si l'article est déjà dans le panier
  let existingArticle = Array.from(list_panier.children).find(
    (li) => li.dataset.title === title
  );

  // Si la quantité est 0, retirer l'article du panier
  if (quantity == 0) {
    if (existingArticle) {
      list_panier.removeChild(existingArticle);
    }
    return;
  }

  if (existingArticle) {
    // Mettre à jour la quantité et le prix
    existingArticle.textContent = `${title}, quantity: ${quantity}, price: ${totalPrice}`;
  } else {
    // Créer un nouvel article dans le panier
    let article = document.createElement("li");
    article.dataset.title = title;
    article.textContent = `${title}, quantity: ${quantity}, price: ${totalPrice}`;
    list_panier.appendChild(article);
  }
}

// Fonction pour retirer un article du panier (utilisée directement lorsque la quantité atteint zéro)
function removeFromCard(card) {
  const title = card.querySelector(".titleCard").textContent;
  let existingArticle = Array.from(list_panier.children).find(
    (li) => li.dataset.title === title
  );

  if (existingArticle) {
    list_panier.removeChild(existingArticle);
  }
}

cards.forEach(function (card) {
  const input = card.querySelector(".how_many");
  let qts_achat = card.querySelector(".qts_achat").innerText;
  const btn_plus = card.querySelector(".more");
  const btn_moins = card.querySelector(".less");

  btn_moins.addEventListener("click", function () {
    let value = parseInt(input.value);
    if (value > 0) {
      input.value = value - 1;
      qts_achat.textContent = value - 1;
      addToCard(card);
    } else {
      input.value = 0;
      qts_achat.textContent = 0;
      addToCard(card);
    }
  });

  btn_plus.addEventListener("click", function () {
    let value = parseInt(input.value);
    if (value >= 0) {
      input.value = value + 1;
      qts_achat.textContent = value + 1;
      addToCard(card);
    }
  });
});
</script>