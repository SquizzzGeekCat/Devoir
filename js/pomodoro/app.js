const date = new Date();
const time = date.getTime();
const hours = date.getHours();
const minutes = date.getMinutes();
const seconds = date.getSeconds();
const now = `${hours}:${minutes}:${seconds}`;
console.log(now);

const timer = document.getElementById("minuteur");
timer.innerText = now;
