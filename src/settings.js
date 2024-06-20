// make feature to turn off in game sounds
// turn off particles
// TODO: How to pass settings to all places that need to check it

class Settings {
  constructor() {
    this.soundeffects = true
    this.particles = true
  }

  render() {
    push()
    fill(255)
    strokeWeight(5)
    rect(60, 60, windowWidth - 120, windowHeight - 120, 20)
    pop()

    push()
    fill(0)
    textFont(regfont)
    textSize(30)
    text("Settings", windowWidth / 2 - 60, 110)
    textSize(20)
    text("Sound Effects", windowWidth / 2 - 60, 200)
    text("Particles", windowWidth / 2 - 60, 300)
    pop()
  }
}