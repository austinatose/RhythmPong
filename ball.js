class Ball {
  constructor(x, y) {
    this.x = x
    this.y = y
  }

  render() {
    push()
    stroke(10)
    fill(255)
    ellipse(this.x, this.y, 20, 20)
    pop()
  }
}