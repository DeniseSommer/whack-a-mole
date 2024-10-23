class Mole {
  constructor(game, x, y) {
    this.game = game;
    this.x = x;
    this.y = y;

    // Dimensiones de cada frame en el sprite de topos
    this.width = 190;
    this.height = 139;

    // Para la animación
    this.currentFrame = 0; // Frame actual del sprite (0-11)
    this.totalFrames = 12; // Total de frames en el sprite
    this.isHit = false; // Si el topo es golpeado
    this.active = true; // Si el topo está activo en el juego

    // Cargo el sprite
    this.sprite = new Image();
    this.sprite.src = "./assets/sprite.png";
  }

  draw() {
    if (!this.active) return; // No dibujo si no está activo

    // Calculo la posición en el sprite
    const framesPerRow = 6; // 6 frames por fila
    const row = Math.floor(this.currentFrame / framesPerRow); // 0 primera fila, 1 segunda fila
    const col = this.currentFrame % framesPerRow; // Columna en la fila actual

    const sourceX = col * this.width;
    const sourceY = row * this.height;

    this.game.ctx.drawImage(
      this.sprite,
      sourceX,
      sourceY,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }

  // Manejo el click
  checkHit(clickX, clickY) {
    if (!this.active || this.isHit) return false;

    const wasHit =
      clickX >= this.x &&
      clickX <= this.x + this.width &&
      clickY >= this.y &&
      clickY <= this.y + this.height;

    if (wasHit) {
      this.isHit = true;
      this.currentFrame = 8; // Comenzar animación del topo golpeado (topo 8 del sprite)
      return true;
    }

    return false;
  }

  // Avanzo al siguiente frame de la animación
  nextFrame() {
    if (!this.active) return;

    if (this.isHit) {
      // Si fue golpeado, avanzo por los últimos 4 frames
      if (this.currentFrame < 11) {
        this.currentFrame++;
      } else {
        this.active = false; // Desactivo al terminar la animación de golpe
      }
    } else {
      // Si no fue golpeado, avanza hasta el frame 8 y luego el topo desaparece
      if (this.currentFrame < 7) {
        this.currentFrame++;
      } else {
        this.active = false; // Desactivo si llegó al frame 8 sin ser golpeado
      }
    }
  }
}
