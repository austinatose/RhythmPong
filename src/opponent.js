class Opponent {
  constructor() {
    this.middle = width/2
    this.x = 0
    this.y = height/2 - 350
    this.targetloc = createVector()
    this.color = 'blue'
    this.invert = false
    this.rotoffset = 0 // for emergencies
  }

  move() {
    this.x += (this.targetloc.x - this.x) * 0.15
  }

  render() {
    push()
    translate(this.x, this.y)
    let rotationAngle = -(this.middle - this.x - 80) / 400
    constrain(rotationAngle, -0.5625, 0.5625)
    rotate(rotationAngle + PI + this.rotoffset)
    if (this.invert)
      rotate(PI)
    strokeWeight(8)
    fill('light brown')
    quad(-10, 35, 10, 35, 10, 65, -10, 65)
    fill(color(this.color))
    ellipse(0, 0, 70, 70)
    line(30, 15, -30, 15)
    pop()
  }
}