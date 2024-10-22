class Game {
  constructor(ctx) {
    this.ctx = ctx;

    this.background = new Background(ctx);
  }

  draw() {
    this.background.draw();
  }

  /*clear() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  }*/
}
