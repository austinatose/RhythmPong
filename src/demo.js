// a table and two oppponents that fight each other

class Demo {
  constructor(x, y, interval) {
    this.origin = createVector(x, y)
    this.table = new Table(this.origin) // very cursed coordinates to fix rotation
    this.ball = new Ball(this.origin.x - 120, this.origin.y - 310, 0.5)
    this.opponent1 = new Opponent()
    this.opponent1.x = this.origin.x - 120
    this.opponent1.y = this.origin.y + 350
    this.opponent1.middle = this.origin.x
    this.opponent1.color = 'red'
    this.opponent1.invert = true

    this.opponent2 = new Opponent()
    this.opponent2.x = this.origin.x - 120
    this.opponent2.y = this.origin.y - 350
    this.opponent1.middle = this.origin.x
    this.opponent2.color = 'blue'
    // this.opponent2.invert = true

    this.interval = interval
    this.startframe = frameCount
    this.movingtowards1 = true
    this.targetloc = createVector()
    this.init = true
  }

  render() {
    // similar to game class
    if (this.init) {
      this.targetloc.y = this.origin.y + 340
      this.targetloc.x = this.origin.x + random(-150, 150) // table tennis rules
      this.ball.determineVelocity(this.targetloc, this.interval)
      this.movingtowards1 = true
      this.init = false
      this.startframe = frameCount // WHY DOES IT BREAK IF I DON'T HAVE THIS
    }

    if (this.movingtowards1) {
      this.opponent1.targetloc = this.targetloc
      this.opponent1.move()
    } else {
      this.opponent2.targetloc = this.targetloc
      this.opponent2.move()
    }

    this.table.render()
    this.opponent1.render()
    this.opponent2.render()
    this.ball.render()

    // ellipse(this.targetloc.x, this.targetloc.y, 10)

    if (this.movingtowards1 && this.ball.pos.x < this.opponent1.x + 30 && this.ball.pos.x > this.opponent1.x - 30 && this.ball.pos.y < this.opponent1.y + 30 && this.ball.pos.y > this.opponent1.y - 30) { // collided with 1
      // console.log("collided with 1")
      // console.log(this.targetloc)
      this.targetloc.y = this.origin.y - 340
      this.targetloc.x = this.origin.x + random(-150, 150) // -150 to 150
      // console.log((this.interval * 60 * 2 - frameCount + this.startframe) / 60)
      // console.log(this.startframe)
      this.ball.determineVelocity(this.targetloc, (this.interval * 60 * 2 - frameCount + this.startframe) / 60)
      this.movingtowards1 = false
      this.startframe = frameCount
      // console.log(this.targetloc, this.ball.pos, this.ball.vel)
    } else if (this.ball.pos.x < this.opponent2.x + 30 && this.ball.pos.x > this.opponent2.x - 30 && this.ball.pos.y < this.opponent2.y + 30 && this.ball.pos.y > this.opponent2.y - 30) { // collided with 2
      // console.log("collided with 2")
      this.targetloc.y = this.origin.y + 340
      this.targetloc.x = this.origin.x + random(-150, 150) // -150 to 150
      this.ball.determineVelocity(this.targetloc, (this.interval * 60 * 2 - frameCount + this.startframe) / 60)
      this.movingtowards1 = true
      this.startframe = frameCount
    }

    this.ball.move()
  }
}