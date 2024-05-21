class Paddle {
  constructor() {
    this.x = 0
    this.y = 0
  }

  render() {
    this.x = mouseX
    this.y = mouseY
    push()
    translate(this.x, this.y)
    rotate(-(windowWidth/2 - mouseX) / 400)
    strokeWeight(8)
    fill('light brown')
    quad(-10, 35, 10, 35, 10, 65, -10, 65)
    fill('red')
    ellipse(0, 0, 70, 70)
    line(30, 15, -30, 15)
    pop()
  }
}