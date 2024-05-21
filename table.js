class Table {
  constructor() {
    this.width = 200
    this.height = 600
  }

  render() {
    push()
    rectMode(CENTER)
    fill('green')
    strokeWeight(17)
    stroke(255)
    rect(width / 2, height / 2, 450, 810) // 5:9
    line(width / 2, height / 2 - 405, width / 2, height / 2 + 405)
    stroke(0)
    line(width / 2 - 225, height / 2, width / 2 + 225, height / 2)
    noFill()
    strokeWeight(5)
    rect(width / 2, height / 2, 450 + 10, 810 + 10)
    pop()
  }
}