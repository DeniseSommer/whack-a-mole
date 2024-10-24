const squares = document.querySelectorAll(".square");
const mole = document.querySelector(".mole");
const timeLeft = document.querySelector("#time-left");
const score = document.querySelector("#score");

let result = 0;
let hitPosition;
let currentTime = 60;
let timerId = null;

function randomSquare() {
  // Borro cualquier topo que esté en un cuadrado
  squares.forEach((square) => {
    square.classList.remove("mole");
  });

  // Elijo un recuadro random entre los 9 disponibles
  let randomSquare = squares[Math.floor(Math.random() * 9)];
  // Test añadir random mole, añadirlos por set timer interval
  randomSquare.classList.add("mole");

  hitPosition = randomSquare.id;
}

squares.forEach((square) => {
  square.addEventListener("click", () => {
    if (square.id === hitPosition) {
      result++;
      score.textContent = result;
      hitPosition = null;
    }
  });
});

function moveMole() {
  timerId = setInterval(randomSquare, 1000);
}

moveMole();

function countDown() {
  currentTime--;
  timeLeft.textContent = currentTime;

  if (currentTime == 0) {
    clearInterval(countDownTimerId);
    clearInterval(timerId);
    alert("GAME OVER, YOUR FINAL SCORE IS " + result);
  }
}

let countDownTimerId = setInterval(countDown, 1000);
