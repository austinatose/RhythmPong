class Table {
  constructor(origin) {
    this.width = 200
    this.height = 600
    this.origin = origin
  }

  render() {
    push()
    rectMode(CENTER)
    fill('green')
    strokeWeight(17)
    stroke(255)
    rect(this.origin.x, this.origin.y, 450, 810) // 5:9
    line(this.origin.x, this.origin.y - 405, this.origin.x, this.origin.y + 405)
    stroke(0)
    line(this.origin.x - 225, this.origin.y, this.origin.x + 225, this.origin.y)
    noFill()
    strokeWeight(5)
    rect(this.origin.x, this.origin.y, 450 + 10, 810 + 10)
    pop()
  }
}