// tempo máximo: 5 minutos (300 segundos)
const TEMPO_MAXIMO = 300;

if (!localStorage.getItem("tempoGlobal")) {
  localStorage.setItem("tempoGlobal", "0");
}

let tempoAtual = parseInt(localStorage.getItem("tempoGlobal"));
let intervalo = setInterval(() => {
  if (!PauseController.pausado) {
    tempoAtual++;
    localStorage.setItem("tempoGlobal", tempoAtual.toString());
  }

  // Atualiza o display do timer
  let timerEl = document.getElementById("timer");
  if (timerEl) {
    const minutos = String(Math.floor(tempoAtual / 60)).padStart(2, "0");
    const segundos = String(tempoAtual % 60).padStart(2, "0");
    timerEl.textContent = `00:${minutos}:${segundos}`;
  }

  // Verifica se passou do tempo máximo
  if (tempoAtual >= TEMPO_MAXIMO) {
    clearInterval(intervalo);
    window.location.href = "theend_fail.html"; // tela de fim de jogo
  }
}, 1000);
