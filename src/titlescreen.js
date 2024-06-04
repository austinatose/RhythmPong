class TitleScreen {
  constructor() {
    // this.table = new Table(createVector((height / 2 + 450) / 1.3, -width / 2 / 1.3)) // very cursed coordinates to fix rotation
    this.demo = new Demo(width / 2, height / 2, 0.5)
    this.startframe = frameCount
    this.firstplay = true
    this.diff = 1
    this.font = loadFont('assets/fonts/Panton-Trial-Bold.ttf')
  }

  render() {
    // title is way too big, maybe adapt for screen sizes
    background(220)
    translate(0, -50)
    scale(this.diff)

    // push()
    // translate(width * 0.0138449367, -height * 0.0584795322) // small position tweaks
    // textFont(this.font)
    // textSize(250)
    // rotate(-PI / 12)
    // text("Rhythm", width / 2 - 800, height / 2)
    // text("Pong", width / 2 - 300, height / 2 + 250)
    // pop()

    push()
    // rectange with rounded corners around the title
    fill(255)
    strokeWeight(20)
    rectMode(CENTER)
    rect(width / 2, height / 2 - 283, 1600, 400, 100)
    pop()

    push()
    textFont(this.font)
    textSize(250)
    text("Rhythm Pong", width / 2 - 773, height / 2 - 200)
    pop()

    // push()
    // translate(0, -100)
    // scale(1.3)
    // rotate(PI / 2)
    // this.table.render()
    // pop()

    push()
    translate(width / 2, height / 2) // move origin top
    translate(0, 500)
    rotate(PI/2)
    scale(1.7)
    translate(-width / 2, -height / 2)
    this.demo.render()
    pop()

    push()
    textFont(this.font)
    textSize(50)
    textAlign(CENTER)
    text("Press any key to start", width / 2, height / 2 + 100)
    pop()

    // push()
    // noFill()
    // strokeWeight(20)
    // rectMode(CENTER)
    // rect(width / 2, height / 2 - 400, 1300, 600)
    // pop()

    this.pulse()
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