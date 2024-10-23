class Game {
  constructor() {
    this.canvas = document.getElementById("canvas");
    this.ctx = this.canvas.getContext("2d");

    // Cargo el background
    this.background = new Image();
    this.background.onload = () => this.start();
    this.background.src = "./assets/background.png";

    // Array de topos
    this.moles = [];

    // Velocidad de la animación
    this.frameCount = 0;

    // Área para que aparezcan los topos (evita los bordes y que aparezcan en el cielo)
    this.playableArea = {
      top: 136,
      left: 50,
      right: this.canvas.width - 50,
      bottom: this.canvas.height - 50,
    };

    // Dimensiones de cada topo dentro del spite
    this.moleWidth = 190;
    this.moleHeight = 139;

    // Añade el evento de click para ejecutar la función para manejar los clicks
    this.canvas.addEventListener("click", (e) => this.handleClick(e));
  }

  start() {
    // Inicia el loop del juego
    this.gameLoop();

    // Configura el intervalo para crear topos
    setInterval(() => {
      // Solo crea un nuevo topo si hay menos de 3 topos activos
      if (this.moles.length < 3) {
        this.addRandomMole();
      }
    }, 4000); // 4000ms = 4 segundos
  }

  /*
  getBoundingClientRect() es un método que obtiene la posición y el tamaño del canvas en la pantalla. 
  Una vez que tienes esas coordenadas usa las posiciones del clic para ver si fue dentro del canvas.
  Luego con las coordenadas ajustadas (clic dentro del canvas) verificas si ese clic fue encima de un topo.
  */
  handleClick(e) {
    const rect = this.canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    this.moles.forEach((mole) => {
      mole.checkHit(clickX, clickY);
    });
  }

  gameLoop() {
    // Limpia el canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Dibuja el background
    this.drawBackground();

    // Dibuja y animar los topos que están activos
    this.moles = this.moles.filter((mole) => mole.active); // Mantener solo los topos activos
    this.moles.forEach((mole) => {
      mole.draw();

      // Cambiar frame cada 10 frames del juego (ajustar según necesidad)
      this.frameCount++;
      if (this.frameCount % 10 === 0) {
        mole.nextFrame();
      }
    });

    /*
    El método window.requestAnimationFrame informa al navegador que quieres 
    realizar una animación y solicita que el navegador programe el repintado de 
    la ventana para el próximo ciclo de animación.
    */
    requestAnimationFrame(() => this.gameLoop());
  }

  drawBackground() {
    this.ctx.drawImage(
      this.background,
      0,
      0,
      this.canvas.width,
      this.canvas.height
    );
  }

  addRandomMole() {
    // Calcula el área disponible teniendo en cuenta el tamaño del topo
    const availableWidth =
      this.playableArea.right - this.playableArea.left - this.moleWidth;
    const availableHeight =
      this.playableArea.bottom - this.playableArea.top - this.moleHeight;

    // Calcula una posición random dentro del área que delimitamos
    const x = this.playableArea.left + Math.random() * availableWidth;
    const y = this.playableArea.top + Math.random() * availableHeight;

    this.moles.push(new Mole(this, x, y));
  }
}

// Creo el juego
new Game();
