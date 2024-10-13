class Calculator {
  constructor() {
    this.add = function (a, b) {
      return a + b;
    };
    this.sub = function (a, b) {
      return a - b;
    };
    this.multyply = function (a, b) {
      return a * b;
    };
    this.divide = function (a, b) {
      return a / b;
    };
    this.expo = function (a) {
      return Math.exp(a);
    };
    this.logarithme = function (a) {
      return Math.log(a);
    };
    this.carre = function (a) {
      return a * a;
    };
  }
}

const CAL = new Calculator();
var ecran = document.getElementById("ecran");
var operande1 = "";
var operande2 = "";
var operation = "";

function ShowValue(valeur) {
  // Ajouter la valeur au premier ou au deuxième opérande
  if (operation === "") {
    operande1 += valeur;
    ecran.textContent = operande1;
  } else {
    operande2 += valeur;
    ecran.textContent = `${operande1} ${operation} ${operande2}`;
  }
}

document.querySelectorAll(".chiffre").forEach((nb) => {
  nb.addEventListener("click", function () {
    let value = Number(nb.innerHTML);
    ShowValue(value);
  });
});

document.querySelectorAll(".ope").forEach((op) => {
  op.addEventListener("click", function () {
    operation = op.innerHTML;
    ecran.textContent = `${operande1} ${operation}`;
  });
});

function RunOperation() {
  let result = 0;
  switch (operation) {
    case "+":
      result = CAL.add(Number(operande1), Number(operande2));
      ecran.textContent = result;
      break;
    case "-":
      result = CAL.sub(operande1, operande2);
      ecran.textContent = result;
      break;
    case "*":
      result = CAL.multyply(operande1, operande2);
      ecran.textContent = result;
      break;
    case "/":
      result = CAL.divide(operande1, operande2);
      ecran.textContent = result;
      break;
    case "**":
      result = CAL.carre(operande1);
      ecran.textContent = result;
      break;
    case "log":
      result = CAL.logarithme(operande1);
      ecran.textContent = result;
      break;
    case "exp":
      result = CAL.expo(operande1);
      ecran.textContent = result;
      break;
  }
}

document.getElementById("egale").addEventListener("click", function () {
  RunOperation();
});

function Erase() {
  operande1 = "";
  operande2 = "";
  operation = "";
  ecran.textContent = "";
}

document.getElementById("effacer").addEventListener("click", function () {
  Erase();
});
