class Article {
  constructor(id, titre, imageName, prix, description, qts) {
    this.id = id;
    this.imageName = imageName;
    this.titre = titre;
    this.prix = prix;
    this.description = description;
    this.qts = qts;
  }

  // Méthode pour créer la carte dans le DOM
  createCard(productContainer) {
    // Créer le conteneur de la carte
    let card = document.createElement("div");
    card.classList.add("card");
    card.id = `article-${this.id}`;

    // Ajouter le titre
    let title = document.createElement("h2");
    title.classList.add("titleCard");
    title.textContent = this.titre;

    // Ajouter l'image
    let img = document.createElement("img");
    img.classList.add("imgCard");
    img.src = `./assets/${this.imageName}`;
    img.alt = this.titre;

    // Ajouter le prix
    let price = document.createElement("p");
    price.classList.add("prix");
    price.textContent = `${this.prix} €`;

    // Ajouter la quantité affichée
    let qts = document.createElement("p");
    qts.classList.add("qts_achat");
    qts.textContent = `${this.qts}`;

    // Ajouter la description
    let description = document.createElement("p");
    description.classList.add("description");
    description.textContent = this.description;

    // Ajouter la section pour la quantité
    let quantitySection = document.createElement("div");
    quantitySection.classList.add("qts");

    let label = document.createElement("label");
    label.setAttribute("for", `how_many_${this.id}`);
    label.textContent = "Quantity:";

    let input = document.createElement("input");
    input.type = "text";
    input.name = `how_many_${this.id}`;
    input.id = `how_many_${this.id}`;
    input.classList.add("how_many");
    input.value = this.qts;

    let btnPlus = document.createElement("button");
    btnPlus.type = "button";
    btnPlus.classList.add("more");
    btnPlus.textContent = "+";

    let btnMoins = document.createElement("button");
    btnMoins.type = "button";
    btnMoins.classList.add("less");
    btnMoins.textContent = "-";

    // Ajouter les événements aux boutons
    this.addEventListeners(
      btnPlus,
      btnMoins,
      input,
      qts,
      card,
      document.getElementById("totalPrice").querySelector("span"),
      document.getElementById("ttc").querySelector("span")
    );

    // Ajouter les éléments à la section quantité
    quantitySection.appendChild(label);
    quantitySection.appendChild(input);
    quantitySection.appendChild(qts);
    quantitySection.appendChild(btnPlus);
    quantitySection.appendChild(btnMoins);

    // Ajouter tous les éléments à la carte
    card.appendChild(title);
    card.appendChild(img);
    card.appendChild(price);
    card.appendChild(description);
    card.appendChild(quantitySection);

    // Ajouter la carte au conteneur principal
    productContainer.appendChild(card);
  }

  // Méthode pour ajouter les événements aux boutons
  addEventListeners(
    btnPlus,
    btnMoins,
    input,
    qts,
    card,
    totalPriceElement,
    ttcElement
  ) {
    // Gestion du bouton +
    btnPlus.addEventListener("click", () => {
      this.incrementQuantity();
      input.value = this.qts;
      qts.textContent = `Quantité: ${this.qts}`;
      this.qts = parseInt(input.value);
      this.updateCart(card);
      this.updateTotaux(totalPriceElement, ttcElement);
    });

    // Gestion du bouton -
    btnMoins.addEventListener("click", () => {
      this.decrementQuantity();
      input.value = this.qts;
      qts.textContent = `Quantité: ${this.qts}`;
      if (this.qts === 0) {
        this.qts = parseInt(input.value);
        this.removeFromCart(card); // Supprimer du panier si la quantité est 0
      } else {
        this.qts = parseInt(input.value);
        this.updateCart(card);
        // Mettre à jour le panier
      }
      this.updateTotaux(totalPriceElement, ttcElement);
    });
  }

  // Méthode pour incrémenter la quantité
  incrementQuantity() {
    this.qts += 1;
  }

  // Méthode pour décrémenter la quantité
  decrementQuantity() {
    if (this.qts > 0) {
      this.qts -= 1;
    }
  }

  // Méthode pour mettre à jour le panier
  updateCart(card) {
    const list_panier = document.getElementById("listPanier");
    const title = card.querySelector(".titleCard").textContent;
    const totalPrice = this.qts * this.prix;
    const totalSsTva = document.getElementById("totalPrice").innerText;
    const tva = 0.2;
    const Ttc = document.getElementById("ttc").innerText;

    let existingArticle = Array.from(list_panier.children).find(
      (li) => li.dataset.title === title
    );

    if (existingArticle) {
      existingArticle.textContent = `${title}, quantity: ${this.qts}, price: ${totalPrice} €`;
    } else {
      let article = document.createElement("li");
      article.dataset.title = title;
      article.textContent = `${title}, quantity: ${this.qts}, price: ${totalPrice} €`;
      list_panier.appendChild(article);
      //TODO: ici mettre a jour total et ttc
    }
  }

  // Méthode pour retirer un article du panier
  removeFromCart(card) {
    const list_panier = document.getElementById("listPanier");
    const title = card.querySelector(".titleCard").textContent;

    let existingArticle = Array.from(list_panier.children).find(
      (li) => li.dataset.title === title
    );

    if (existingArticle) {
      list_panier.removeChild(existingArticle);
    }
  }
  updateTotaux(showTt, showTTC) {
    // Récupère le total actuel
    let totalSsTva = parseFloat(showTt.textContent);
    let totalTTC = parseFloat(showTTC.textContent);

    // Réinitialise les totaux
    totalSsTva = 0;
    totalTTC = 0;
    let tva = 0.2;

    // Parcourir chaque article pour recalculer le total
    const listeArticles = document.getElementById("listPanier").children; // Adaptation selon ta structure
    for (let article of listeArticles) {
      let quantity = parseInt(this.qts);
      console.log(quantity);
      let article_price = parseFloat(this.price);
      console.log(price);
      let totalPrice = quantity * article_price; // Total sans TVA
      let ttc = totalPrice * (1 + tva); // Total avec TVA

      // Ajouter au total cumulé
      totalSsTva += totalPrice;
      totalTTC += ttc;
    }

    // Mettre à jour le DOM
    showTt.textContent = totalSsTva.toFixed(2);
    showTTC.textContent = totalTTC.toFixed(2);
  }
}
