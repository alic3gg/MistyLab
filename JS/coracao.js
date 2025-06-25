class Coracao {
  constructor(x, y, imagem, context) {
    this.x = x;
    this.y = y;
    this.imagem = imagem;
    this.context = context;

    this.largura = 16;
    this.altura = 16;
    this.coletado = false;
  }

  atualizar(jogador) {
    if (this.coletado) return;

    const dx = this.x - jogador.x;
    const dy = this.y - jogador.y;

    if (Math.abs(dx) < 20 && Math.abs(dy) < 30) {
      if (jogador.vida < 3) {
        jogador.vida++;
        atualizarCoracoes(jogador.vida);
      }
      this.coletado = true;
    }
  }

  desenhar() {
    if (!this.coletado) {
      this.context.drawImage(this.imagem, this.x, this.y, this.largura, this.altura);
    }
  }
}
