let ESPACO = 32; // Tecla de pause
let W = 87; // Tecla para movimentação para cima
let A = 65; // Tecla para movimentação à esquerda
let S = 83; // Tecla para movimentação para baixo
let D = 68; // Tecla para movimentação à direita

function Teclado(elemento) {
  this.elemento = elemento;

  // Array de teclas pressionadas
  this.pressionadas = [];

  // Array de teclas disparadas
  this.disparadas = [];

  // Funções de disparo
  this.funcoesDisparo = [];
  //
  let teclado = this;

  // Registrando o estado das teclas no array
  elemento.addEventListener("keydown", function (evento) {
    let tecla = evento.keyCode;
    teclado.pressionadas[tecla] = true;

    // Disparar somente se for o primeiro keydown da tecla
    if (teclado.funcoesDisparo[tecla] && !teclado.disparadas[tecla]) {
      teclado.disparadas[tecla] = true;
      teclado.funcoesDisparo[tecla]();
    }
  });

  elemento.addEventListener("keyup", function (evento) {
    teclado.pressionadas[evento.keyCode] = false;
    teclado.disparadas[evento.keyCode] = false;
  });
}

// Método para verificar se uma tecla está pressionada
Teclado.prototype.pressionada = function (tecla) {
  return this.pressionadas[tecla] || false;
};

// Método para registrar uma função de disparo para uma tecla específica
Teclado.prototype.disparou = function (tecla, callback) {
  this.funcoesDisparo[tecla] = callback;
};
