class Game {
  constructor() {
    this.ball = new Ball(width / 2, height / 2)
    this.table = new Table()
    this.paddle = new Paddle()
  }

  render() {
    background(220)
    this.ball.render()
    this.paddle.render()
    // this.table.render()
  }
}