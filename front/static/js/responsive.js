class ResponsiveLayout {
  constructor() {
    this.panel = document.querySelector('.user__panel');
    this.treshold = 70;
    this.startX = null;
    this.currentX = null;
    this.endX = null;

    this.onStart = this.onStart.bind(this);
    this.onMove = this.onMove.bind(this);
    this.onEnd = this.onEnd.bind(this);

    this.addEventListeners();
  }

  onStart(evt) {
    this.startX = evt.touches[0].pageX;
  }

  onMove(evt) {
    this.currentX = evt.touches[0].pageX;

    if (this.currentX - this.startX > this.treshold) {
      this.panel.style.transform = '';
      return;
    }

    if (this.currentX - this.startX < - this.treshold) {
      this.panel.style.transform = 'translate(-102%)';
    }
  }

  onEnd(evt) {

  }

  addEventListeners() {
    document.addEventListener('touchstart', this.onStart);
    document.addEventListener('touchmove', this.onMove);
    document.addEventListener('touchend', this.onEnd);
  }
}

window.addEventListener('load', () => new ResponsiveLayout());
