//liste des constantes
const titre = document.getElementById("titre_note");
const contenu = document.getElementById("new_note");
const btnAddNote = document.getElementById("btnAddNote");
const btnRefreash = document.getElementById("refreash");
const notesSection = document.getElementById("notes");
const Notes = JSON.parse(localStorage.getItem("notes")) || [];

//class
class Note {
  constructor(titre, contenu) {
    this.titre = titre;
    this.contenu = contenu;
  }
  btnAddNote() {
    return Notes.push(this);
  }
}

//action au clique
btnAddNote.addEventListener("click", function () {
  const note = new Note(titre.value, contenu.value);
  Notes.push(note);
  console.log(Notes);
  addToLocalStorrage(Notes);
  eraseInputs();
  uploadList();
});

btnRefreash.addEventListener("click", function () {
  localStorage.removeItem("notes");
  console.log(localStorage.getItem("notes"));
  notesSection.innerHTML = `
          <p>Toutes les notes ont été supprimer</p>
      `;
});

//fonctions
function eraseInputs() {
  titre.value = "";
  contenu.value = "";
}

function addToLocalStorrage(Notes) {
  localStorage.setItem("notes", JSON.stringify(Notes));
  console.log(localStorage.getItem("notes"));
}

function deleteNote(index) {
  Notes.splice(index, 1);
  addToLocalStorrage(Notes);
  uploadList();
}

function uploadList() {
  notesSection.innerHTML = "";
  Notes.forEach((note, index) => {
    notesSection.innerHTML += `
        <div class="note">
          <h2>${note.titre}</h2>
          <p>${note.contenu}</p>
          <button onclick="deleteNote(${index})">Supprimer</button>
        </div>
      `;
  });
}

window.onload = () => {
  uploadList();
};
