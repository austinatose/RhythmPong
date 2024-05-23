class Ball {
  constructor(x, y) {
    this.pos = createVector(x, y)
    this.vel = createVector(50, 50)
  }

  render() {
    push()
    strokeWeight(5)
    fill(255)
    ellipse(this.pos.x, this.pos.y, 20, 20)
    pop()

    // trail
  }

  determineVelocity(target, interval) {
    // target: width / 2 + 50, height / 2 + 50
    this.vel.x = (target.x - this.pos.x) / (interval * 60)
    this.vel.y = (target.y - this.pos.y) / (interval * 60)
    console.log(this.vel)
  }

  move() {
    this.pos.add(this.vel)
  }
}