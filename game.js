/* Clase que maneja la lógica del juego */
class Game {
  constructor() {
    // Uso los métodos de GameInterface para actualizar la interfaz y los elementos del DOM
    this.interface = new GameInterface();
    this.initializeGame();
    this.initializeEvents();
  }

  // Establezco los valores iniciales del juego
  initializeGame() {
    this.isGameStarted = false;
    this.isGamePaused = false;
    this.currentScore = 0;
    this.missedMoles = 0;
    this.timeLeft = 60;
    this.activeMolePosition = null;
    this.gameCountdown = null;
    this.molePosition = null;
    this.speedLevels = [1000, 900, 800, 700, 600, 500];
    this.currentSpeed = 0;
    this.speedUpdate = null;
  }

  // Configuro los listeners de la interfaz
  initializeEvents() {
    // Botón de inicio para comenzar el juego
    this.interface.startGameButton.addEventListener("click", () => {
      this.interface.playStartSound();
      this.startGame();
    });

    // Click en los cuadrados
    this.interface.squares.forEach((square) => {
      square.addEventListener("click", () => {
        if (
          this.isGameStarted &&
          this.isGamePaused === false &&
          square.id === this.activeMolePosition
        ) {
          this.interface.playHitSound();
          this.currentScore++;
          this.interface.updateDisplay(
            this.timeLeft,
            this.currentScore,
            this.missedMoles
          );
          this.activeMolePosition = null;
          this.interface.removeMole();
        }
      });
    });

    // Botón de jugar de nuevo
    document
      .querySelector("#game-over-screen button")
      .addEventListener("click", () => {
        this.interface.playClickSound();
        this.interface.hideGameOverScreen();
        this.exitGame();
      });

    // Botón pausar el juego
    this.interface.pauseButton.addEventListener("click", () => {
      this.interface.playClickSound();
      this.pauseGame();
    });

    // Botón salir del juego
    this.interface.exitButton.addEventListener("click", () => {
      this.interface.playClickSound();
      this.exitGame();
    });
  }

  // Comienzo el juego, su temoporiador y los marcadores
  startGame() {
    if (this.isGameStarted === false) {
      this.interface.showGameScreen();
      this.isGameStarted = true;
      this.currentSpeed = 0;
      this.missedMoles = 0;
      this.timeLeft = 60;
      this.currentScore = 0;
      this.interface.updateDisplay(
        this.timeLeft,
        this.currentScore,
        this.missedMoles
      );
      this.startTimer();
      this.moveMole();
      this.startSpeedProgression();
    }
  }

  // Pauso el juego
  pauseGame() {
    if (this.isGameStarted) {
      this.isGamePaused = !this.isGamePaused;
      this.interface.updatePauseButtonText(this.isGamePaused);

      if (this.isGamePaused) {
        this.stopTimers();
      } else {
        this.startTimer();
        this.moveMole();
      }
    }
  }

  // Inicio el temporizador principal
  startTimer() {
    this.gameCountdown = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
        this.interface.updateDisplay(
          this.timeLeft,
          this.currentScore,
          this.missedMoles
        );
      } else {
        this.endGame();
      }
    }, 1000);
  }

  // Paro todos los temporizadores
  stopTimers() {
    clearInterval(this.gameCountdown);
    clearInterval(this.molePosition);
    clearInterval(this.speedUpdate);
  }

  // Manejo el movimiento de los topos
  moveMole() {
    this.molePosition = setInterval(() => {
      if (this.activeMolePosition !== null) {
        this.missedMoles++;
        this.interface.updateDisplay(
          this.timeLeft,
          this.currentScore,
          this.missedMoles
        );

        if (this.missedMoles >= 10) {
          this.endGame();
          return;
        }
      }
      this.placeMoleRandomly();
    }, this.speedLevels[this.currentSpeed]);
  }

  startSpeedProgression() {
    this.speedUpdate = setInterval(() => {
      if (
        !this.isGamePaused &&
        this.currentSpeed < this.speedLevels.length - 1
      ) {
        this.currentSpeed++;
        clearInterval(this.molePosition);
        this.moveMole();
      }
    }, 10000);
  }

  // Establezco la posición random del topo
  placeMoleRandomly() {
    this.activeMolePosition = this.interface.placeMoleRandomly();
  }

  // Manejo la salida del juego
  exitGame() {
    this.stopTimers();
    this.initializeGame();
    this.interface.updateDisplay(
      this.timeLeft,
      this.currentScore,
      this.missedMoles
    );
    this.interface.removeMole();
    this.interface.updatePauseButtonText(false);
    this.interface.showStartScreen();
  }

  // Manejo el fin del juego
  endGame() {
    this.interface.playGameOverSound();
    this.isGameStarted = false;
    this.stopTimers();
    this.interface.showGameOverScreen(this.currentScore, this.missedMoles);
  }
}

// Inicializar el juego
const game = new Game();
