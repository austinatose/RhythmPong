class TitleScreen {
  constructor() {
    this.table = new Table(createVector((height / 2 + 450) / 1.3, -width / 2 / 1.3)) // very cursed coordinates to fix rotation
    this.startframe = frameCount
    this.diff = 1
  }

  render() {
    background(220)
    scale(this.diff)
    push()
    textSize(50)
    text("Rhythm Pong", width / 2 - 150, height / 2 - 150)
    pop()
    push()
    scale(1.3)
    rotate(PI / 2)
    this.table.render()
    pop()
    this.pulse()
  }

  pulse() {
    if (frameCount - this.startframe == 30) { // change number here
      this.diff = 1.002
      this.startframe = frameCount
    } else {
      this.diff -= 0.0002
    }
  }
}