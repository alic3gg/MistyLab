function Animacao(context, fundo = null) {
  this.context = context;
  this.fundo = fundo;
  this.camera = {
    x: 0,
    y: 0,
    target: null, // Objeto a seguir (c1)
    zoom: 2, // Nível de zoom
    lerp: 0.1, // Suavidade da câmera
  };
  this.sprites = [];
  this.ligado = false;
}

//
Animacao.prototype = {
  novoSprite: function (sprite) {
    this.sprites.push(sprite);
  },
  //
  desenharTelaMorte: function () {
    const ctx = this.context;
    const canvas = ctx.canvas;
    // Fundo escuro semi-transparente
    ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
    ctx.fillRect(
      this.camera.x,
      this.camera.y,
      canvas.width / this.camera.zoom,
      canvas.height / this.camera.zoom
    );
    // Texto centralizado
    ctx.fillStyle = "#fff";
    ctx.font = "60px PixelGame";
    ctx.textAlign = "center";
    ctx.fillText(
      "VOCÊ MORREU",
      this.camera.x + canvas.width / (2 * this.camera.zoom),
      this.camera.y + canvas.height / (2 * this.camera.zoom) - 20
    );
    // Botão
    const botaoX = this.camera.x + canvas.width / (2 * this.camera.zoom) - 60;
    const botaoY = this.camera.y + canvas.height / (2 * this.camera.zoom) + 20;
    const largura = 120;
    const altura = 40;
    // Desenhar botão
    ctx.fillStyle = "#aa0000";
    ctx.fillRect(botaoX, botaoY, largura, altura);
    ctx.fillStyle = "#fff";
    ctx.font = "20px OrangeKid";
    ctx.fillText(
      "REINICIAR",
      this.camera.x + canvas.width / (2 * this.camera.zoom),
      botaoY + 27
    );
    // Salvar área do botão para detectar clique
    this.botaoMorte = {
      x: botaoX,
      y: botaoY,
      largura,
      altura,
    };
  },
  //
  ligar: function () {
    this.ligado = true;
    this.proximoFrame();
  },
  desligar: function () {
    this.ligado = false;
  },
  //
 proximoFrame: function () {
  if (!this.ligado) return;

  let ctx = this.context;
  let canvas = ctx.canvas;

  if (this.camera.target) {
    let destinoX =
      this.camera.target.x + 32 - canvas.width / (2 * this.camera.zoom);
    let destinoY =
      this.camera.target.y + 32 - canvas.height / (2 * this.camera.zoom);
    this.camera.x += (destinoX - this.camera.x) * this.camera.lerp;
    this.camera.y += (destinoY - this.camera.y) * this.camera.lerp;
  }

  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.scale(this.camera.zoom, this.camera.zoom);
  ctx.translate(-this.camera.x, -this.camera.y);

  if (this.fundo) {
    ctx.drawImage(this.fundo, 0, 0);
  }

  // Atualizar sprites (se não estiver pausado)
  if (!PauseController.pausado) {
    for (let i in this.sprites) {
      if (typeof this.sprites[i].atualizar === 'function') {
        this.sprites[i].atualizar();
      }
    }
  }

  // Desenhar sprites
  for (let i in this.sprites) {
    if (typeof this.sprites[i].desenhar === 'function') {
      this.sprites[i].desenhar();
    }
  }

  if (this.camera.target && this.camera.target.morto) {
    this.desenharTelaMorte();
    return;
  }

  let animacao = this;
  requestAnimationFrame(function () {
    animacao.proximoFrame();
  });
},
  //
  limparTela: function () {
    let ctx = this.context;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  },

  definirCamera: function (alvo) {
    this.camera.target = alvo;
  },
};
