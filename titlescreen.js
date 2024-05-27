class TitleScreen {
  constructor() {
    this.table = new Table()
  }

  render() {
    background(220)
    push()
    rotate(PI / 12)
    this.table.render()
    pop()
  }
}