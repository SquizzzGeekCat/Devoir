//constante
const TableContact = [];
const inputNom = document.getElementById("nom");
const inputTel = document.getElementById("telephone");
const inputEmail = document.getElementById("email");
const btnAjouter = document.getElementById("btnAdd");
const tableBody = document.querySelector("tbody");

//fonction ajouter contact

function ajouterContact() {
  const contact = {
    nom: inputNom.value,
    telephone: inputTel.value,
    email: inputEmail.value
  };

  TableContact.push(contact);

  //effacer les champs
  inputNom.value = "";
  inputTel.value = "";
  inputEmail.value = "";

  //ajouter les contactes
  afficherContacts(contact);
}

//evenement click sur le bouton ajouter

btnAjouter.addEventListener("click", ajouterContact);

//afficher les contactes

function afficherContacts(contact) {
  //parcourir la tableau et afficher les contacts

  const tr = document.createElement("tr");
  const tdNom = document.createElement("td");
  const tdTel = document.createElement("td");
  const tdAction = document.createElement("td");

  //ajouter boutons
  const btnModifier = document.createElement("button");
  btnModifier.textContent = "Modifier";
  btnModifier.addEventListener("click", () => modifierContact(contact));

  const btnSupprimer = document.createElement("button");
  btnSupprimer.textContent = "Supprimer";
  btnSupprimer.addEventListener("click", () => supprimerContact(contact));

  const btnDetail = document.createElement("button");
  btnDetail.textContent = "Détail";
  btnDetail.addEventListener("click", () => afficherDetailContact(contact));

  tdNom.textContent = contact.nom;
  tdTel.textContent = contact.telephone;
  tdAction.appendChild(btnModifier);
  tdAction.appendChild(btnSupprimer);
  tdAction.appendChild(btnDetail);

  tr.appendChild(tdNom);
  tr.appendChild(tdTel);
  tr.appendChild(tdAction);

  tableBody.appendChild(tr);
}

// function modifier contact
function modifierContact(contact) {
  // Préremplir les champs avec les informations du contact à modifier
  inputNom.value = contact.nom;
  inputTel.value = contact.telephone;
  inputEmail.value = contact.email;

  // Remplacer le bouton "Ajouter" par un bouton "Sauvegarder"
  btnAjouter.textContent = "Sauvegarder";

  // Quand l'utilisateur clique sur "Sauvegarder", mettre à jour le contact
  btnAjouter.onclick = function () {
    contact.nom = inputNom.value;
    contact.telephone = inputTel.value;
    contact.email = inputEmail.value;

    // Réinitialiser le bouton et les champs
    btnAjouter.textContent = "Ajouter";
    btnAjouter.onclick = ajouterContact;
    inputNom.value = "";
    inputTel.value = "";
    inputEmail.value = "";

    // Rafraîchir l'affichage des contacts dans le tableau
    rafraichirContacts();
  };
}

function rafraichirContacts() {
  // Effacer les lignes du tableau
  tableBody.innerHTML = "";

  // Réafficher tous les contacts
  TableContact.forEach((contact) => {
    afficherContacts(contact);
  });
}

// function modifier contact
function supprimerContact(contact) {
  // Trouver l'index du contact dans le tableau
  const index = TableContact.indexOf(contact);
  if (index !== -1) {
    // Retirer le contact du tableau
    TableContact.splice(index, 1);

    // Rafraîchir l'affichage des contacts
    rafraichirContacts();
  }
}

//section afficher contact
const divDetail = document.getElementById("detail");

function afficherDetailContact(contact) {
  const pNom = document.createElement("p");
  pNom.textContent = `Nom: ${contact.nom}`;
  const pTel = document.createElement("p");
  pTel.textContent = `Téléphone: ${contact.telephone}`;
  const pEmail = document.createElement("p");
  pEmail.textContent = `Email: ${contact.email}`;
  divDetail.appendChild(pNom);
  divDetail.appendChild(pTel);
  divDetail.appendChild(pEmail);
}
