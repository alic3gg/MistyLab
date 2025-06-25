class Cenario {
  constructor(context, tilemapImg, tileSize, mapa) {
    this.context = context;
    this.tilemap = tilemapImg;
    this.tileSize = tileSize;
    this.mapa = mapa;
  }

  desenhar() {
    const ctx = this.context;
    ctx.save();
    ctx.globalAlpha = 0;

    const cols = this.mapa[0].length;
    const rows = this.mapa.length;

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const tile = this.mapa[y][x];
        ctx.fillStyle =
          tile === 1
            ? "#5a2e1d"
            : tile === 2
            ? "#00ff00"
            : "rgba(200, 200, 200, 0)"; // verde para o tile do portal
        ctx.fillRect(
          x * this.tileSize,
          y * this.tileSize,
          this.tileSize,
          this.tileSize
        );
      }
    }

    ctx.restore();
  }
}
