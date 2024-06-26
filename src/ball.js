class Ball {
  constructor(x, y) {
    this.pos = createVector(x, y)
    this.vel = createVector(50, 50)
    this.contactpoint = createVector()
    this.size = 20
    this.trail = new Trail()
  }

  render() {
    push()
    strokeWeight(5)
    fill(255)
    ellipse(this.pos.x, this.pos.y, this.size, this.size)
    pop()

    if (usetrail) {
      this.trail.render(this.pos.x, this.pos.y)
      this.trail.addParticle() // trail literally cannot generate any faster
    }
  }

  determineVelocity(target, interval) {
    // target: windowWidth / 2 + 50, height / 2 + 50
    this.vel.x = (target.x - this.pos.x) / (interval * 60)
    this.vel.y = (target.y - this.pos.y) / (interval * 60)

    // could have used lerp
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
     // ellipse(this.contactpoint.x, this.contactpoint.y, 10)
    this.size = dist(this.pos.x, this.pos.y, this.contactpoint.x, this.contactpoint.y) / 50 + 20
  }
}

class Trail {
  constructor() {
    this.particles = []
    this.pos = createVector(0, 0)
  }

  render(x, y) {
    this.pos.x = x
    this.pos.y = y
    for (let particle of this.particles) {
      particle.render(this.pos.x, this.pos.y)
    }
  }

  addParticle() {
    this.particles.push(new TrailParticle(this.pos.x, this.pos.y))
    for (let particle of this.particles) {
      if (particle.size <= 0)
        this.particles.splice(this.particles.indexOf(particle), 1)
    }
  }
}

class TrailParticle {
  constructor(x, y) {
    this.pos = createVector(x, y)
    this.size = 10
  }

  render() {
    push()
    noStroke()
    fill(255)
    ellipse(this.pos.x, this.pos.y, this.size, this.size)
    pop()

    this.size--;
    if (this.size < 0) {
      this.size = 0
    }
  }
}