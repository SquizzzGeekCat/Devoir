const quantityInput = document.querySelectorAll(".how_many");
const moreButton = document.getElementById("more");
const lessButton = document.getElementById("less");

// Fonction pour ajouter
moreButton.addEventListener("click", (event) => {
  event.preventDefault(); // Empêcher le rechargement de la page
  let currentQuantity = parseInt(quantityInput.value);
  quantityInput.value = currentQuantity + 1; // Incrémentation
});

// Fonction pour retirer
lessButton.addEventListener("click", (event) => {
  event.preventDefault(); // Empêcher le rechargement de la page
  let currentQuantity = parseInt(quantityInput.value);

  if (currentQuantity > 0) {
    quantityInput.value = currentQuantity - 1; // Décrémentation
  }
});

document.querySelector("#dress .more");
