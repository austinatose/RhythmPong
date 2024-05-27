class Ball {
  constructor(x, y) {
    this.pos = createVector(x, y)
    this.vel = createVector(50, 50)
    this.contactpoint = createVector()
    this.size = 20
  }

  render() {
    push()
    strokeWeight(5)
    fill(255)
    ellipse(this.pos.x, this.pos.y, this.size, this.size)
    pop()

    // trail
  }

  determineVelocity(target, interval) {
    // target: width / 2 + 50, height / 2 + 50
    this.vel.x = (target.x - this.pos.x) / (interval * 60)
    this.vel.y = (target.y - this.pos.y) / (interval * 60)
    if (this.pos.y < height / 2) { // opponent serving
      this.contactpoint.y = this.pos.y + abs(this.pos.y - target.y) * 0.70
    } else {
      this.contactpoint.y = this.pos.y - abs(this.pos.y - target.y) * 0.70
    }
    if (target.x < this.pos.x) {
      this.contactpoint.x = this.pos.x - abs(this.pos.x - target.x) * 0.70
    } else {
      this.contactpoint.x = this.pos.x + abs(this.pos.x - target.x) * 0.70
    }
  }

  move() {
    this.pos.add(this.vel)
    ellipse(this.contactpoint.x, this.contactpoint.y, 10)
    this.size = dist(this.pos.x, this.pos.y, this.contactpoint.x, this.contactpoint.y) / 50 + 20
  }
}