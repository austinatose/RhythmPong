// make feature to turn off in game sounds
// turn off particles

class Settings {
  constructor() {
    this.soundcheckbox = createCheckbox('', true)
    
    this.soundcheckbox.changed(() => {
      usesoundeffects = !usesoundeffects
    })
    this.soundcheckbox.hide()
    this.particlescheckbox = createCheckbox('', true)
    
    this.particlescheckbox.changed(() => {
      useparticles = !useparticles
    })
    this.particlescheckbox.hide()
  }

  render() {
    this.soundcheckbox.position(windowWidth / 2 + 60, 200)
    this.particlescheckbox.position(windowWidth / 2 + 60, 230)
    this.soundcheckbox.show()
    this.particlescheckbox.show()

    push()
    fill(255)
    strokeWeight(5)
    rect(windowWidth / 2 - 100, 100, 200, 400, 10)
    pop()

    push()
    fill(0)
    textFont(boldfont)
    textSize(30)
    textAlign(CENTER)
    text("Settings", windowWidth / 2, 140)
    textFont(regfont)
    textSize(20)
    text("Sound Effects", windowWidth / 2 - 20, 215)
    text("Particles", windowWidth / 2 - 20, 245)
    pop()

    // close button at bottom of settings
    push()
    fill(255)
    strokeWeight(5)
    rectMode(CENTER)
    rect(windowWidth / 2, 450, 150, 50, 10)
    pop()
    push()
    fill(0)
    textFont(boldfont)
    textSize(30)
    textAlign(CENTER)
    text("Close", windowWidth / 2, 460)
    pop()

    if (mouseIsPressed && mouseX > windowWidth / 2 - 75 && mouseX < windowWidth / 2 + 75 && mouseY > 425 && mouseY < 475) {
      insettings = false
      wasonsettings = true
    }
  }

  hide() {
    this.soundcheckbox.hide()
    this.particlescheckbox.hide()
  }
}