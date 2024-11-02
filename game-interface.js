/* Clase que maneja la interfaz del juego */
class GameInterface {
  constructor() {
    // Elementos del DOM
    this.startScreen = document.getElementById("start-screen");
    this.gameContainer = document.getElementById("game-container");
    this.startGameButton = document.getElementById("start-game-btn");
    this.squares = document.querySelectorAll(".square");
    this.timeLeftDisplay = document.getElementById("time-left");
    this.scoreDisplay = document.getElementById("score");
    this.missedMolesDisplay = document.getElementById("missed-moles");
    this.pauseButton = document.getElementById("btn-pause");
    this.exitButton = document.getElementById("btn-exit");
    this.gameOverScreen = document.getElementById("game-over-screen");
    this.finalScoreDisplay = document.getElementById("final-score");
    this.hitsDisplay = document.getElementById("hits");
    this.finalMissedDisplay = document.getElementById("final-missed");

    // Sonido de iniciar el juego
    this.startSound = new Audio("assets/play_sound.wav");
    this.startSound.volume = 1;

    // Sonido de golpear al topo
    this.hitSound = new Audio("assets/hitting_mole_sound.wav");
    this.hitSound.volume = 1;

    // Sonido de click en botones
    this.clickSound = new Audio("assets/click_sound.wav");
    this.clickSound.volume = 1;

    // Sonido de game over
    this.gameOverSound = new Audio("assets/game_over_sound.wav");
    this.gameOverSound.volume = 1;

    // Inicializo las pantallas en el estado correcto
    this.initializeScreens();
  }

  initializeScreens() {
    // Muestro la pantalla de inicio y oculto las demás
    this.startScreen.classList.remove("hidden");
    this.gameContainer.classList.add("hidden");
    this.gameOverScreen.classList.add("hidden");
  }

  // Muestro la pantalla del juego
  showGameScreen() {
    this.startScreen.classList.add("hidden");
    this.gameOverScreen.classList.add("hidden");
    this.gameContainer.classList.remove("hidden");
  }

  // Actualizo los contadores de tiempo, puntuación y topos perdidos
  updateDisplay(timeLeft, score, missedMoles) {
    this.timeLeftDisplay.textContent = timeLeft;
    this.scoreDisplay.textContent = score * 50;
    this.missedMolesDisplay.textContent = missedMoles;
  }

  // Borro los topos de los cuadrados
  removeMole() {
    this.squares.forEach((square) => {
      square.classList.remove("mole");
    });
  }

  // Pone un topo en un cuadrado aleatorio
  placeMoleRandomly() {
    this.removeMole();
    const randomSquare =
      this.squares[Math.floor(Math.random() * this.squares.length)];
    randomSquare.classList.add("mole");
    return randomSquare.id;
  }

  // Alterno el texto del botón PAUSAR/CONTINUAR
  updatePauseButtonText(isPaused) {
    this.pauseButton.textContent = isPaused ? "CONTINUAR" : "PAUSAR";
  }

  // Muestro la pantalla inicial y oculto las demás
  showStartScreen() {
    this.gameContainer.classList.add("hidden");
    this.gameOverScreen.classList.add("hidden");
    this.startScreen.classList.remove("hidden");
  }

  // Muestro la pantalla de Game over con los stats finales y oculto las demás
  showGameOverScreen(score, missedMoles) {
    this.gameContainer.classList.add("hidden");
    this.startScreen.classList.add("hidden");
    this.finalScoreDisplay.textContent = score * 50;
    this.hitsDisplay.textContent = score;
    this.finalMissedDisplay.textContent = missedMoles;
    this.gameOverScreen.classList.remove("hidden");
  }

  // Oculto la pantalla de Game Over
  hideGameOverScreen() {
    this.gameOverScreen.classList.add("hidden");
  }

  // Sonidos cargados desde el inicio
  playStartSound() {
    this.startSound.currentTime = 0;
    this.startSound.play();
  }

  playHitSound() {
    this.hitSound.currentTime = 0;
    this.hitSound.play();
  }

  playClickSound() {
    this.clickSound.currentTime = 0;
    this.clickSound.play();
  }

  playGameOverSound() {
    this.gameOverSound.currentTime = 0;
    this.gameOverSound.play();
  }
}
