// pause.js
const PauseController = {
  pausado: false,

  init: function() {
    document.addEventListener('keydown', (event) => {
      if (event.code === 'Space') {
        this.togglePause();
      }
    });
  },

  togglePause: function() {
    this.pausado = !this.pausado;

    const overlay = document.getElementById('pauseOverlay');
    if (overlay) {
      overlay.style.display = this.pausado ? 'flex' : 'none';
    }
  }
};
