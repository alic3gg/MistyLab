class TurretEnemy {
  constructor(x, y, imagem, context, imagemProjetil) {
    this.x = x;
    this.y = y;
    this.context = context;
    this.sheet = new Spritesheet(context, imagem, 1, 3);
    this.sheet.intervalo = 200;
    this.sheet.linha = 0;

    this.escala = 0.5;
    this.projeteis = [];
    this.imagemProjetil = imagemProjetil;
    this.intervaloTiro = 1500;
    setInterval(() => this.atirar(), this.intervaloTiro);
  }

  atirar() {
    this.projeteis.push({
      x: this.x + (93.33 * this.escala) / 2 - 2,
      y: this.y + 122 * this.escala,
      largura: 4,
      altura: 10,
      velocidade: 3,
      ativo: true,
    });
  }

  atualizar() {
    this.sheet.proximoQuadro();

    this.projeteis.forEach((p) => {
      p.y += p.velocidade;
      if (p.y > 2000) p.ativo = false;
    });

    this.projeteis = this.projeteis.filter((p) => p.ativo);
  }

  desenhar() {
    const larguraFrame = this.sheet.imagem.width / this.sheet.numColunas; // 280 / 3 = ~93.33
    const alturaFrame = this.sheet.imagem.height; // 122

    this.context.drawImage(
      this.sheet.imagem,
      larguraFrame * this.sheet.coluna,
      0,
      larguraFrame,
      alturaFrame,
      this.x,
      this.y,
      larguraFrame * this.escala,
      alturaFrame * this.escala
    );

    // Desenhar projéteis
    this.context.fillStyle = "red";
    this.projeteis.forEach((p) => {
      this.context.drawImage(
        this.imagemProjetil,
        p.x,
        p.y,
        8,
        8
      );
    });
  }

  checarColisaoCom(jogador) {
    this.projeteis.forEach((p) => {
      const colideX = p.x < jogador.x + 20 && p.x + p.largura > jogador.x + 6;
      const colideY = p.y < jogador.y + 49 && p.y + p.altura > jogador.y + 39;

      if (colideX && colideY) {
        jogador.levarDano();
        p.ativo = false;
      }
    });
  }
}