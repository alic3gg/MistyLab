class Enemy {
  constructor(x, y, caminho, imagem, context, velocidade = 1.2, tileSize = 16) {
    this.tileSize = tileSize;
    this.x = x;
    this.y = y;
    this.velocidade = velocidade;

    this.largura = 32;
    this.altura = 32;

    this.caminho = caminho;
    this.alvoAtual = 0;

    this.context = context;

    this.sheet = new Spritesheet(context, imagem, 4, 3);
    this.sheet.intervalo = 200;

    this.direcaoAtual = "baixo"; // padrão
  }

  atualizar() {
    const destino = this.caminho[this.alvoAtual];
    const destinoX = destino.x * this.tileSize;
    const destinoY = destino.y * this.tileSize;

    let dx = destinoX - this.x;
    let dy = destinoY - this.y;

    const distancia = Math.sqrt(dx * dx + dy * dy);

    if (distancia < 2) {
      this.alvoAtual = (this.alvoAtual + 1) % this.caminho.length;
    } else {
      this.x += (dx / distancia) * this.velocidade;
      this.y += (dy / distancia) * this.velocidade;
    }

    // Direção visual da sprite
    if (Math.abs(dx) > Math.abs(dy)) {
      this.direcaoAtual = dx > 0 ? "direita" : "esquerda";
    } else {
      this.direcaoAtual = dy > 0 ? "baixo" : "cima";
    }

    switch (this.direcaoAtual) {
      case "baixo": this.sheet.linha = 0; break;
      case "esquerda": this.sheet.linha = 1; break;
      case "direita": this.sheet.linha = 2; break;
      case "cima": this.sheet.linha = 3; break;
    }

    this.sheet.proximoQuadro();
  }

  desenhar(ctx) {
    this.sheet.desenhar(this.x, this.y);
  }
}
