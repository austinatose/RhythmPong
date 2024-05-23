class Game {
  constructor(interval) {
    this.interval = 1
    this.ball = new Ball(width / 2 - 120, height / 2 - 310)
    this.table = new Table()
    this.paddle = new Paddle()
    this.targetloc = createVector()
    this.targets = [-200, 0, 200]
    this.init = true;
    this.startframe = frameCount;
  }

  render() {
    background(220)
    this.table.render()
    this.ball.render()
    this.paddle.render()
    if (this.init) {
      this.targetloc.y = height / 2 + 350
      this.targetloc.x = width / 2 + this.targets[Math.floor(Math.random() * this.targets.length)]
      this.ball.determineVelocity(this.targetloc, this.interval)
      this.init = false
    }
    // return
    console.log(this.ball.pos)
    if (this.ball.pos.x < this.paddle.x + 20 && this.ball.pos.x > this.paddle.x - 20 && this.ball.pos.y < this.paddle.y + 20 && this.ball.pos.y > this.paddle.y - 20) { // collided
      console.log("hit")
      this.targetloc.y = height / 2 - 310
      this.targetloc.x = width / 2 - 120
      this.ball.determineVelocity(this.targetloc, (this.interval * 60 * 2 - frameCount + this.startframe) / 60)
    }
    this.ball.move()
    
    // placeholder
    if (frameCount - this.startframe == Math.round(this.interval * 60 * 2)) {
      this.ball = new Ball(width / 2 - 120, height / 2 - 310, this.interval)
      this.startframe = frameCount
      this.init = true
    }
  }
}