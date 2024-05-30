class TitleScreen {
  constructor() {
    this.table = new Table(createVector((height / 2 + 450) / 1.3, -width / 2 / 1.3)) // very cursed coordinates to fix rotation
    this.startframe = frameCount
    this.diff = 1
    this.font = loadFont('assets/fonts/PantonRustHeavy-GrSh.ttf')
  }

  render() {
    background(220)
    scale(this.diff)
    push()
    translate(width * 0.0138449367, -height * 0.0584795322) // small position tweaks
    textFont(this.font)
    textSize(250)
    rotate(-PI / 12)
    text("Rhythm", width / 2 - 800, height / 2)
    text("Pong", width / 2 - 300, height / 2 + 250)
    pop()
    push()
    scale(1.3)
    rotate(PI / 2)
    this.table.render()
    pop()
    this.pulse()
    push()
    noFill()
    strokeWeight(20)
    rectMode(CENTER)
    rect(width / 2, height / 2 - 400, 1300, 600)
    pop()
  }

  pulse() {
    if (frameCount - this.startframe == 30) { // change number here
      this.diff = 1.002
      this.startframe = frameCount
    } else {
      this.diff -= 0.0002
    }
    console.log(width, height)
  }
}