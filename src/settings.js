// make feature to turn off in game sounds
// turn off particles
// TODO: How to pass settings to all places that need to check it

class Settings {
  constructor() {
    this.soundcheckbox = createCheckbox('', true)
    
    this.soundcheckbox.changed(() => {
      settings.sound = !settings.sound
    })
    this.soundcheckbox.hide()
    this.particlescheckbox = createCheckbox('', true)
    
    this.particlescheckbox.changed(() => {
      settings.particles = !settings.particles
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
    textFont(regfont)
    textSize(30)
    textAlign(CENTER)
    text("Settings", windowWidth / 2, 140)
    textSize(20)
    text("Sound Effects", windowWidth / 2 - 20, 215)
    text("Particles", windowWidth / 2 - 20, 245)
    pop()

    // close button at bottom of settings
    push()
    fill(255)
    strokeWeight(5)
    rect(windowWidth / 2, 500, 200, 50, 10)
    pop()
    push()
    fill(0)
    textFont(regfont)
    textSize(30)
    textAlign(CENTER)
    text("Close", windowWidth / 2, 505)
    pop()
  }

  hide() {
    this.soundcheckbox.hide()
    this.particlescheckbox.hide()
  }
}