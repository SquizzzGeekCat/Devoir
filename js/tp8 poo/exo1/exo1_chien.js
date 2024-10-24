class Chien {
  constructor(nom, race, age, mange) {
    this.nom = nom;
    this.race = race;
    this.age = age;
    this.mange = mange; // Correction pour utiliser le paramètre mange passé
  }

  identiter() {
    return `Un chien de race ${this.race}, qui s'appelle ${this.nom} et a ${this.age} ans en âge humain.`;
  }

  parler() {
    return `${this.nom} fait woof!`;
  }

  manger() {
    return `${this.nom} mange ${this.mange} kg de nourriture.`;
  }
  ageChien() {
    return `${this.nom} a ${this.age * 7} ans en age chien !`;
  }
}

let chien1 = new Chien("Max", "Labrador", 2, 5);
let chien2 = new Chien("Hercules", "Berger allemand", 5, 12);

window.onload = function () {
  const section = document.querySelector("section");

  // Div pour chien1
  const div1 = document.createElement("div");
  section.appendChild(div1);
  div1.innerHTML +=
    chien1.identiter() +
    "<br>" +
    chien1.parler() +
    "<br>" +
    chien1.manger() +
    "<br>" +
    chien1.ageChien() +
    "<br>";

  // Div pour chien2
  const div2 = document.createElement("div");
  section.appendChild(div2);
  div2.innerHTML +=
    chien2.identiter() +
    "<br>" +
    chien2.parler() +
    "<br>" +
    chien2.manger() +
    "<br>" +
    chien2.ageChien() +
    "<br>";
};
