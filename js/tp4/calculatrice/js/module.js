import { Calculator } from "./Calculator.js";
import operations from "../script.js";

const cal = new Calculator();

document.querySelectorAll(".chiffre").forEach((nb) => {
  nb.addEventListener("click", function () {
    let value = Number(nb.innerHTML);
    operations.ShowValue(value);
  });
});
