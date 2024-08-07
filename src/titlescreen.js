class TitleScreen {
  constructor() {
    // this.table = new Table(createVector((windowHeight / 2 + 450) / 1.3, -windowWidth / 2 / 1.3)) // very cursed coordinates to fix rotation
    this.demo = new Demo(windowWidth / 2, windowHeight / 2, 0.5)
    this.demoOffset = createVector(0, 0)
    this.startwindowsize = createVector(windowWidth, windowHeight)
    this.startframe = frameCount
    this.firstplay = true
    this.diff = 1
  }

  render() {
    background(220)
    translate(0, -70)
    scale(this.diff)

    // this.demo.x = windowWidth / 2
    // this.demo.y = windowHeight / 2

    // push()
    // translate(windowWidth * 0.0138449367, -windowHeight * 0.0584795322) // small position tweaks
    // textFont(boldfont)
    // textSize(250)
    // rotate(-PI / 12)
    // text("Rhythm", windowWidth / 2 - 800, windowHeight / 2)
    // text("Pong", windowWidth / 2 - 300, windowHeight / 2 + 250)
    // pop()

    push()
    // rectange with rounded corners around the title
    fill(255)
    strokeWeight(20)
    rectMode(CENTER)
    rect(windowWidth / 2, windowHeight / 2 - 240, 1000, 200, 70)
    pop()

    push()
    textFont(boldfont)
    textAlign(CENTER)
    textSize(125)
    text("Rhythm Pong", windowWidth / 2, windowHeight / 2 - 200)
    pop()

    // push()
    // translate(0, -100)
    // scale(1.3)
    // rotate(PI / 2)
    // this.table.render()
    // pop()

    push()
    // what is going on with these coordinates (it ain't broken, don't fix it)
    translate(windowWidth / 2, windowHeight / 2) // move origin top
    rotate(PI/2)
    translate(-windowWidth / 2, -windowHeight / 2)
    translate(150, 0)
    this.windowResizePatch()
    translate(this.demoOffset.x, this.demoOffset.y)
    // console.log(this.demoOffset)
    this.demo.render()
    pop()

    push()
    textFont(boldfont)
    textSize(50)
    textAlign(CENTER)
    text("> Press any key to start <", windowWidth / 2, windowHeight / 2 + 455)
    pop()

    // the copyright text (fake)
    push()
    textFont(regfont)
    textSize(15)
    textAlign(CENTER)
    text("© 2024 Austin Liu", windowWidth / 2, windowHeight + 60) // wait why does it have to have this
    pop()

    // push()
    // noFill()
    // strokeWeight(20)
    // rectMode(CENTER)
    // rect(windowWidth / 2, windowHeight / 2 - 400, 1300, 600)
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
  }

  windowResizePatch() {
    if (this.startwindowsize.x != windowWidth || this.startwindowsize.y != windowHeight) {
      this.demoOffset = createVector((windowWidth - this.startwindowsize.x)/2, (windowHeight - this.startwindowsize.y)/2)

      // small to big = positive
      // console.log(this.startwindowsize, windowWidth, windowHeight)
      // this.startwindowsize = createVector(windowWidth, windowHeight)
      // console.log("patched")
    }
  }
}