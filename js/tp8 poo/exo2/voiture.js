class voiture {
  constructor(marque, modele, annee, cylindree, couleur, gamme) {
    this.marque = marque;
    this.modele = modele;
    this.annee = annee;
    this.cylindree = cylindree;
    this.couleur = couleur;
    this.gamme = gamme;
  }

  proptietes() {
    return `Marque: ${this.marque}, Modèle: ${this.modele}, Année: ${this.annee}, Cylindrée: ${this.cylindree}CV, Couleur: ${this.couleur}, Gamme: ${this.gamme}`;
  }
}

const voitureThibau = new voiture(
  "Audi",
  "A5",
  2024,
  230,
  "Noire",
  "Breack sport"
);

const voitureTimeo = new voiture(
  "Ferrari",
  "F40",
  1987,
  478,
  "Rouge",
  "Hypercar"
);

const voitureLudi = new voiture(
  "Alpine",
  "A110 1600s VB",
  1970,
  138,
  "Bleu alpine",
  "Course de cote"
);

window.onload = function () {
  const section = document.querySelector("section");

  // Div pour chien1
  const div1 = document.createElement("div");
  section.appendChild(div1);
  div1.innerHTML = voitureThibau.proptietes();
  const div2 = document.createElement("div");
  section.appendChild(div2);
  div2.innerHTML = voitureTimeo.proptietes();
  const div3 = document.createElement("div");
  section.appendChild(div3);
  div3.innerHTML = voitureLudi.proptietes();
};
