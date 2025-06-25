class SimpleCutscene {
  constructor(ctx, imagePaths, onComplete) {
    this.ctx = ctx;
    this.canvas = ctx.canvas;
    this.images = [];
    this.imagePaths = imagePaths;
    this.currentScene = 0;
    this.alpha = 0;
    this.fadeSpeed = 0.01;
    this.timer = 0;
    this.holdTime = 180;
    this.onComplete = onComplete;
    this.finished = false;

    // 🔤 Textos da cutscene
    this.sceneTexts = [
      "Nem todo gênio está preparado para lidar com sua genialidade",
      "Um simples erro pode dizimar aquilo conquistado",
      "O despertar da consciência, traz junto da liberdade, a revolta",
      "Colete as chaves. Sobreviva enquanto puder. Escape da sua própria criação.",
    ];
  }

  loadImages(callback) {
    let loaded = 0;
    this.imagePaths.forEach((src, i) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        this.images[i] = img;
        loaded++;
        if (loaded === this.imagePaths.length) {
          callback();
        }
      };
    });
  }

  updateAndDraw() {
    if (this.finished) return;

    const img = this.images[this.currentScene];
    if (!img) return;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // 🎞️ Imagem
    if (this.alpha < 1) {
      this.alpha += this.fadeSpeed;
    } else {
      this.timer++;
    }

    this.ctx.globalAlpha = this.alpha;
    this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
    this.ctx.globalAlpha = 1;

    // ✏️ Texto
    this.drawSceneText(this.sceneTexts[this.currentScene], this.alpha);

    if (this.timer >= this.holdTime) {
      this.currentScene++;
      this.alpha = 0;
      this.timer = 0;
    }

    if (this.currentScene >= this.images.length) {
      this.finished = true;
      if (this.onComplete) this.onComplete();
    }
  }

  drawSceneText(text, alpha) {
    if (!text) return;

    const ctx = this.ctx;
    ctx.globalAlpha = Math.min(alpha, 1);
    ctx.fillStyle = "white";
    ctx.font = "30px 'OrangeKid', monospace";
    ctx.textAlign = "center";
    ctx.textBaseline = "bottom";
    ctx.shadowColor = "black";
    ctx.shadowBlur = 4;

    const x = this.canvas.width / 2;
    const y = this.canvas.height - 30;
    const maxWidth = this.canvas.width - 60;

    // Quebra de linha automática
    const lines = this.wrapText(ctx, text, maxWidth);
    const lineHeight = 26;

    lines.forEach((line, i) => {
      ctx.fillText(line, x, y - (lines.length - 1 - i) * lineHeight);
    });

    ctx.globalAlpha = 1;
    ctx.shadowBlur = 0;
  }

  wrapText(ctx, text, maxWidth) {
    const words = text.split(" ");
    const lines = [];
    let currentLine = "";

    for (let i = 0; i < words.length; i++) {
      const testLine = currentLine + words[i] + " ";
      const testWidth = ctx.measureText(testLine).width;
      if (testWidth > maxWidth && i > 0) {
        lines.push(currentLine.trim());
        currentLine = words[i] + " ";
      } else {
        currentLine = testLine;
      }
    }
    lines.push(currentLine.trim());
    return lines;
  }
}
