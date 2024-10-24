// Elementos del DOM
const startScreen = document.getElementById("start-screen");
const gameContainer = document.getElementById("game-container");
const startGameButton = document.getElementById("start-game-btn");
const squares = document.querySelectorAll(".square");
const timeLeftDisplay = document.querySelector("#time-left");
const scoreDisplay = document.querySelector("#score");
const pauseButton = document.getElementById("btn-pause");
const exitButton = document.getElementById("btn-exit");

// Variables
let isGameStarted = false;
let isGamePaused = false;
let currentScore = 0;
let timeLeft = 60;
let activeMolePosition;
let gameTimerId = null;
let moleTimerId = null;

// Muestro la pantalla de juego
function showGameScreen() {
  startScreen.classList.add("hidden");
  gameContainer.classList.remove("hidden");
}

// Empiezo el juego
function startGame() {
  if (!isGameStarted) {
    isGameStarted = true;
    startTimer();
    moveMole();
    placeMoleRandomly();
  }
}

function pauseGame() {
  if (isGameStarted) {
    if (!isGamePaused) {
      // Pauso el juego
      isGamePaused = true;
      pauseButton.textContent = "CONTINUE";
      stopTimers();
    } else {
      // Continuo el juego
      isGamePaused = false;
      pauseButton.textContent = "PAUSE";
      startTimer();
      moveMole();
    }
  }
}

function exitGame() {
  // Reinicio todo el juego
  isGameStarted = false;
  isGamePaused = false;
  currentScore = 0;
  timeLeft = 60;
  stopTimers();
  updateDisplay();
  removeMole();
  pauseButton.textContent = "PAUSE";
  // Muestro la pantalla de inicio
  gameContainer.classList.add("hidden");
  startScreen.classList.remove("hidden");
}

function startTimer() {
  gameTimerId = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;
      updateDisplay();
    } else {
      endGame();
    }
  }, 1000);
}

// Paro los temporizadores
function stopTimers() {
  clearInterval(gameTimerId);
  clearInterval(moleTimerId);
}

// Manejo de los topos
function moveMole() {
  moleTimerId = setInterval(placeMoleRandomly, 1000);
}

function placeMoleRandomly() {
  removeMole();
  const randomSquare = squares[Math.floor(Math.random() * 9)];
  randomSquare.classList.add("mole");
  activeMolePosition = randomSquare.id;
}

function removeMole() {
  squares.forEach((square) => square.classList.remove("mole"));
}

function updateDisplay() {
  timeLeftDisplay.textContent = timeLeft;
  scoreDisplay.textContent = currentScore;
}

function endGame() {
  stopTimers();
  exitGame();
}

// Eventos
startGameButton.addEventListener("click", () => {
  showGameScreen();
  startGame();
});

squares.forEach((square) => {
  square.addEventListener("click", () => {
    if (isGameStarted && !isGamePaused && square.id === activeMolePosition) {
      currentScore++;
      updateDisplay();
      activeMolePosition = null;
      removeMole();
    }
  });
});

pauseButton.addEventListener("click", pauseGame);
exitButton.addEventListener("click", exitGame);
