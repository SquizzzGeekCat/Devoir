/* --- Variables --- */
const buttonAdd = document.getElementById("addItem");
const buttonUpdate = document.getElementById("updateItem");
const buttonDetete = document.getElementById("deleteItem");
const buttonNewList = document.getElementById("newList");
const inputProduct = document.getElementById("prod");
const inputQuantity = document.getElementById("qty");
const tbody = document.querySelector("#shoppingList > tbody");
/* --- Fonction --- */
/**
 * TODO : Commenter le code
 * TODO : Vérifier qu'on ne puisse pas ajouter une ligne vide
 * */
function doSetItem() {
  //recupere les donnees
  let product = inputProduct.value;
  let quantity = inputQuantity.value;
  //condition de stockage que si les valeurs sont pas vide
  if (product != "" && quantity != "") {
    localStorage.setItem(product, quantity);
  }
  //après ajout dans le storage vidage des inputs
  inputProduct.value = "";
  inputQuantity.value = "";
  //appele de la fonction pour afficher la liste
  showShoppingList();
}
/**
 * TODO : Commenter le code
 * TODO : Prévenir dans le cas ou l'élément n'est pas trouver ( alert )
 **/
function doGetItem() {
  //recupere la value de l'input
  let product = inputProduct.value;
  //recupere le produit rechercher dans le local storage
  let quantity = localStorage.getItem(product);
  //si le produit n'est pas trouver on affiche une alerte
  if (quantity === null) {
    alert("Le produit n'est pas trouvé!");
  } else {
    //sinon assigner la valeur du local storage a l'input
    inputQuantity.value = quantity;
  }
}
/**
 * TODO : Commenter le code
 * TODO : Actualiser la liste une fois l'élément supprimer
 **/
function doRemoveItem() {
  //recupere le produit inserer dans l'input
  let product = inputProduct.value;
  //le retire du localstorage
  localStorage.removeItem(product);
  //vider l'input
  inputProduct.value = "";
  // Actualiser la liste
  showShoppingList();
}
/**
 * * TODO : Attacher au DOM les différents éléments
 **/
function showShoppingList() {
  tbody.innerHTML = "";
  for (let i = 0; i <= localStorage.length - 1; i++) {
    let product = localStorage.key(i);
    let quantity = localStorage.getItem(product);
    let tdProduct = document.createElement("td");
    tdProduct.textContent = product;
    let tdQuantity = document.createElement("td");
    tdQuantity.textContent = quantity;
    let row = document.createElement("tr");
    row.appendChild(tdProduct);
    row.appendChild(tdQuantity);
  }
}
/**
 * TODO Vider le local storage
 **/
function doClear() {
  localStorage.clear();
  showShoppingList();
}
/* --- Main --- */
buttonAdd.addEventListener("click", doSetItem);
buttonUpdate.addEventListener("click", doGetItem);
buttonDetete.addEventListener("click", doRemoveItem);
buttonNewList.addEventListener("click", doClear);
