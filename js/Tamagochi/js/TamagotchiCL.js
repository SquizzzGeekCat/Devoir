class Tamagotchi {
  constructor(
    nom,
    gender,
    faim = 50,
    bonheur = 100,
    energie = 50,
    level = 1,
    vivant = true
  ) {
    this.nom = nom;
    this.gender = gender;
    this.level = level;
    this.faim = faim;
    this.bonheur = bonheur;
    this.energie = energie;
    this.vivant = vivant;
    // this.tempsQuiPasse();
    this.vieilir();
    this.randomEvent();
  }
  manger() {
    if (this.faim > 0 && this.vivant == true && this.energie < 100) {
      this.faim -= 10;
      this.energie += 5;
      console.log(`${this.nom} à manger un fruits !`);
    } else if (this.faim > 0 && this.vivant == true && this.energie == 100) {
      this.faim -= 10;
      console.log(`${this.nom} à manger du chocolat !`);
    } else {
      console.log(`${this.nom} n'a pas faim pour le moment`);
    }

    this.verifierStats();
  }
  jouer() {
    if (this.vivant == true && this.energie > 0 && this.bonheur < 100) {
      this.energie -= 5;
      this.bonheur += 10;
      console.log(`${this.nom} à jouer à la balle !`);
    } else if (this.vivant == true && this.energie > 0 && this.bonheur == 100) {
      this.energie -= 5;
      console.log(`${this.nom} à jouer a cache cache!`);
    } else {
      console.log(`${this.nom} ne veut pas jouer pour le moment`);
    }
    this.verifierStats();
  }
  dormir() {
    if (this.vivant == true && this.energie <= 50) {
      this.energie += 50;
      this.faim += 20;
      console.log(`${this.nom} a fait un gros dodo!`);
    }
    if (this.vivant == true && this.energie < 100) {
      this.energie += 10;
      this.faim += 5;
      console.log(`${this.nom} à fait un petit somme !`);
    } else {
      console.log(`${this.nom} n'est pas fatigué pour le moment`);
    }
    this.verifierStats();
  }
  infos() {
    return `Nom : ${this.nom}\nSexe : ${this.gender}\nNiveau : ${this.level}`;
  }
  status() {
    return `${this.nom} a pour stats :\n => Faim : ${this.faim}\n => Bonheur : ${this.bonheur}\n => Energie : ${this.energie}\n => Niveau : ${this.level}`;
  }
  verifierStats() {
    if (this.faim >= 100) {
      this.vivant = false;
      console.log(this.nom + " est mort(e) de faim !");
    }

    if (this.energie <= 0) {
      this.vivant = false;
      console.log(this.nom + " est mort(e) de fatigue !");
    }
    if (this.bonheur <= 0) {
      this.vivant = false;
      console.log(this.nom + " est mort(e) de tristesse !");
    }
  }
  //TODO: remettre le timer pour le temps qui passe mais avec un intervale de 5minute (300000)
  //   tempsQuiPasse() {
  //     const timeGoesBy = setInterval(() => {
  //       if (this.vivant) {
  //         this.faim += 5;
  //         this.bonheur -= 5;
  //         this.energie -= 5;
  //         this.verifierStats();
  //         console.log(this.status());
  //       } else {
  //         clearInterval(timeGoesBy);
  //       }
  //     }, 5000);
  //   }
  //TODO: écrire la fonction vieillir qui compte le numbre d'action effectuer et qui déclare la mort au bout de 1000 actions
  vieilir() {}

  levelUp() {
    this.level += 1;
  }
  //TODO: ajouter un timer aleatoire pour ajouter des events lors du jeu
  async randomEvent() {
    if (this.vivant) {
      const randomNumEvent = Math.floor(Math.random() * 15) + 1;
      const event = await getEvent(randomNumEvent);

      if (event) {
        this.faim = this.faim + event.faim;
        this.bonheur = this.bonheur + event.bonheur;
        this.energie = this.energie + event.energie;
        this.level = this.level + event.levelup;
        console.log("Évenement Time !!!" + this.nom + event.message);
        this.verifierStats();
        console.log(this.status());
      } else {
        console.log("Événement introuvable");
      }
    }
  }
}
//TODO: utiliser la fonction pour stocker dans le local storage
// fonction pour lancer le jeu
async function startGame(name, sexe) {
  await setJsonInLocalStorage();
  const tamagotchi = new Tamagotchi(name, sexe);
  console.log(tamagotchi.status());
}

//function pour recupéré un event du json
async function getEvent(id) {
  const response = await fetch("../assets/events.json");
  const events = await response.json();
  const eventSelected = events.find((event) => event.id == id);
  console.log(eventSelected);
  return eventSelected;
}

//TODO: faire le front !!!!

//stocker le json dans le localstorage
function setJsonInLocalStorage() {
  fetch("../assets/events.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération du fichier JSON");
      }
      return response.json();
    })
    .then((json) => {
      localStorage.setItem("event", JSON.stringify(json));
      console.log("le json a été enregistré avec sucès dans le local storage");
    })
    .catch((error) => {
      console.error(
        "Erreur lors de l'enregistrement du json dans le local storage",
        error
      );
    });
}
//recupéré le json quan on en a besoin
function getJsonFromLocalStorage() {
  try {
    const jsonString = localStorage.getItem("event");
    const json = JSON.parse(jsonString);
    console.log("le fichier a été récupéré avec sucèss");
    return json;
  } catch (error) {
    console.error(
      "Erreur lors de la récupération du json dans le local storage",
      error
    );
    return null;
  }
}
