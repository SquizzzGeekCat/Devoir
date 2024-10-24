class Horloge {
  constructor(heure, minute, seconde) {
    this.heure = heure;
    this.minute = minute;
    this.seconde = seconde;
  }

  afficherHeure(now) {
    this.heure = now.getHours();
    this.minute = now.getMinutes();
    this.seconde = now.getSeconds();

    return `Il est actuellement ${this.heure}h ${this.minute}m ${this.seconde}s`;
  }

  addTime() {
    this.minute += 21; // Ajoute 21 minutes
    this.seconde += 28; // Ajoute 28 secondes

    // Gérer les dépassements des secondes
    if (this.seconde >= 60) {
      this.seconde -= 60;
      this.minute += 1;
    }

    // Gérer les dépassements des minutes
    if (this.minute >= 60) {
      this.minute -= 60;
      this.heure += 1;
    }

    // Gérer le dépassement des heures
    if (this.heure >= 24) {
      this.heure -= 24;
    }

    return `Nouvelle heure : ${this.heure}h ${this.minute}m ${this.seconde}s`;
  }
}

const section = document.querySelector("section");

// Afficher l'heure actuelle
const now = new Date();
const horloge = new Horloge(now.getHours(), now.getMinutes(), now.getSeconds());

const div = document.createElement("div");
section.appendChild(div);

const horlogeTime = document.createElement("p");
horlogeTime.textContent = horloge.afficherHeure(now);
div.appendChild(horlogeTime);

// Bouton pour ajouter du temps
const btn = document.createElement("button");
btn.type = "button";
btn.textContent = "Ajouter 21 minutes et 28 secondes";
div.appendChild(btn);

// Événement au clic
btn.addEventListener("click", function () {
  const timeAdded = horloge.addTime();
  horlogeTime.textContent = timeAdded;
});
