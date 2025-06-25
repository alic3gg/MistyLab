// Arquivo referente ao personagem "Dr. Juno Nox, o cientísta"
let DRJUNONOX_DIREITA = 1;
let DRJUNONOX_ESQUERDA = 2;
let DRJUNONOX_CIMA = 3;
let DRJUNONOX_BAIXO = 4;

function DrJunoNox(context, teclado, imagem) {
  this.context = context;
  this.teclado = teclado;
  this.x = 0;
  this.y = 0;
  this.velocidade = 5;

  // Criar a spritesheet a partir de uma imagem recebida
  this.sheet = new Spritesheet(context, imagem, 4, 3);
  this.sheet.intervalo = 180;

  // Estado inicial
  this.andando = false;
  this.direcao = DRJUNONOX_BAIXO;
  
  this.vida = 3;
  this.invulneravel = false;
  this.tempoInvulneravel = 1000; // 1 segundo
}
function podeMover(x, y, tileSize, mapa) {
  const largura = 32;
  const altura = 49;

  const margemX = 6; // Afasta a colisão das laterais
  const alturaColisao = 10; // Só a parte de baixo colide

  const inicioX = x + margemX;
  const fimX = x + largura - margemX;
  const inicioY = y + altura - alturaColisao;
  const fimY = y + altura;

  // Testa vários pontos horizontais
  for (let px = inicioX; px <= fimX; px += tileSize / 2) {
    for (let py = inicioY; py <= fimY; py += tileSize / 2) {
      const tileX = Math.floor(px / tileSize);
      const tileY = Math.floor(py / tileSize);

      if (
        tileY < 0 ||
        tileY >= mapa.length ||
        tileX < 0 ||
        tileX >= mapa[0].length ||
        mapa[tileY][tileX] !== 0
      ) {
        return false;
      }
    }
  }

  return true;
}
DrJunoNox.prototype = {
  atualizar: function () {
    let tileSize = 16;
    let novoX = this.x;
    let novoY = this.y;
    // Flags de direção para animação
    let andando = false;
    if (this.teclado.pressionada(D)) {
      if (!this.andando || this.direcao != DRJUNONOX_DIREITA) {
        this.sheet.linha = 2;
        this.sheet.coluna = 0;
      }
      andando = true;
      this.direcao = DRJUNONOX_DIREITA;
      this.sheet.proximoQuadro();
      novoX += this.velocidade;
    } else if (this.teclado.pressionada(A)) {
      if (!this.andando || this.direcao != DRJUNONOX_ESQUERDA) {
        this.sheet.linha = 1;
        this.sheet.coluna = 0;
      }
      andando = true;
      this.direcao = DRJUNONOX_ESQUERDA;
      this.sheet.proximoQuadro();
      novoX -= this.velocidade;
    } else if (this.teclado.pressionada(W)) {
      if (!this.andando || this.direcao != DRJUNONOX_CIMA) {
        this.sheet.linha = 3;
        this.sheet.coluna = 0;
      }
      andando = true;
      this.direcao = DRJUNONOX_CIMA;
      this.sheet.proximoQuadro();
      novoY -= this.velocidade;
    } else if (this.teclado.pressionada(S)) {
      if (!this.andando || this.direcao != DRJUNONOX_BAIXO) {
        this.sheet.linha = 0;
        this.sheet.coluna = 0;
      }
      andando = true;
      this.direcao = DRJUNONOX_BAIXO;
      this.sheet.proximoQuadro();
      novoY += this.velocidade;
    }
    // Colisão por tile
    if (podeMover(novoX, this.y, tileSize, mapaTeste)) this.x = novoX;
    if (podeMover(this.x, novoY, tileSize, mapaTeste)) this.y = novoY;
    // Parado
    if (!andando) {
      if (this.direcao == DRJUNONOX_DIREITA) {
        this.sheet.linha = 2;
        this.sheet.coluna = 1;
      } else if (this.direcao == DRJUNONOX_ESQUERDA) {
        this.sheet.linha = 1;
        this.sheet.coluna = 1;
      } else if (this.direcao == DRJUNONOX_CIMA) {
        this.sheet.linha = 3;
        this.sheet.coluna = 1;
      } else if (this.direcao == DRJUNONOX_BAIXO) {
        this.sheet.linha = 0;
        this.sheet.coluna = 1;
      }
    }
    //
    this.andando = andando;
  },
  desenhar: function () {
    // Para debugar a caixa de colisão
    this.context.strokeStyle = "lime";
    this.context.strokeRect(
      this.x + 6,
      this.y + 49 - 10,
      20, // largura - margem*2
      10 // altura de colisão
    );
    //
    this.sheet.desenhar(this.x, this.y);
  },
};
DrJunoNox.prototype.levarDano = function () {
  if (this.invulneravel || this.vida <= 0) return;

  this.vida--;
  this.invulneravel = true;
  atualizarCoracoes(this.vida);

  if (this.vida <= 0) {
    this.morto = true;
    if (window.exibirTelaMorte) window.exibirTelaMorte();
  }

  setTimeout(() => {
    this.invulneravel = false;
  }, this.tempoInvulneravel);
};