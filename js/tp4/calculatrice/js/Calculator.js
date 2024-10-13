export class Calculator {
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
