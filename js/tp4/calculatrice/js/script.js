var ecran = document.getElementById("ecran");
var operande1 = "";
var operande2 = "";
var operation = "";

export function ShowValue(valeur) {
  // Ajouter la valeur au premier ou au deuxième opérande
  if (operation === "") {
    operande1 += valeur;
    ecran.textContent = operande1;
  } else {
    operande2 += valeur;
    ecran.textContent = operande2;
  }
}

export function SelectOperation(this) {
    operation = this.innerText;
}

export function RunOperation() {
  let result = 0;
  switch (operation) {
    case "+":
      result = CAL.add(operande1, operande2);
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
      result = CAL.carre(operande1, operande2);
      ecran.textContent = result;
      break;
    case "log":
      result = CAL.logarithme(operande1, operande2);
      ecran.textContent = result;
      break;
    case "exp":
      result = CAL.expo(operande1, operande2);
      ecran.textContent = result;
      break;
  }
}

export function Erase() {
  operande1 = "";
  operande2 = "";
  operation = "";
  ecran.textContent = "";
}

export default{ Erase, RunOperation, SelectOperation, ShowValue};