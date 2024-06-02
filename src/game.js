class Game {
  constructor(interval, song) {
    // this.interval = 60/145 // 145 bpm (tonight by tsunku)
    this.interval = 60/195 // 195 bpm (mythologia's end by hatsune miku)
    this.ball = new Ball(width / 2 - 120, height / 2 - 310)
    this.table = new Table(createVector(width / 2, height / 2))
    this.paddle = new Paddle()
    this.opponent = new Opponent()
    this.targetloc = createVector()
    this.init = true;
    this.startframe = frameCount;
    this.hit = false;
    this.missedlasttime = false;
    this.ballmovingtowardsplayer = true;
    this.score = 0;
    this.distance = 10000
    this.combo = 0
    this.firstplay = true

    this.song = song
  }

  run() {
    // get rough bpm first, then future ball sendings's interval will be determined by this
    // how to prevent straying off beat?
    if (this.firstplay) {
      this.song.play()
      this.firstplay = false
      console.log("this.song")
    }
    this.render()
  }

  render() {
    background(220)
    this.table.render()
    this.ball.render()
    this.paddle.render()
    this.opponent.render()
    text(this.distance, 100, 100)
    text(this.score, 100, 200)
    text(this.combo, 100, 250)
    if (this.missedlasttime) {
      text("Missed", 100, 150)
    } else if (this.distance < 25) {
      text("Perfect", 100, 150)
    } else if (this.distance < 60) {
      text("Good", 100, 150)
    } else if (this.distance < 100) {
      text("Ok", 100, 150)
    } else {
      text("Bad", 100, 150)
    }
    if (this.init) {
      this.targetloc.y = height / 2 + 340
      this.targetloc.x = width / 2 + random(-150, 150) // table tennis rules
      if (this.missedlasttime) this.targetloc.x = width / 2 + random(0, 150)
      this.ball.determineVelocity(this.targetloc, this.interval)
      this.init = false
    }
    // return
    if (this.ball.pos.x < this.paddle.x + 30 && this.ball.pos.x > this.paddle.x - 30 && this.ball.pos.y < this.paddle.y + 30 && this.ball.pos.y > this.paddle.y - 30 && !this.hit && this.paddle.y > height/2) { // collided
      this.distance = dist(this.ball.pos.x, this.ball.pos.y, this.targetloc.x, this.targetloc.y)
      console.log("hit", this.distance)
      hitsound1.play()
      this.targetloc.y = height / 2 - 310
      this.targetloc.x = width / 2 + random(-150, 150) // -150 to 150
      this.ball.determineVelocity(this.targetloc, (this.interval * 60 * 2 - frameCount + this.startframe) / 60)
      this.hit = true
      this.missedlasttime = false
      this.ballmovingtowardsplayer = true
      if (this.distance < 25) {
        this.combo++;
      } else if (this.distance < 60) {
        this.combo++;
      } else if (this.distance < 100) {
        this.combo++;
      } else {
        this.combo = 0;
        misscombo.play()
      }
    }
    this.ball.move()
    if (this.ballmovingtowardsplayer) {
      this.opponent.targetloc = this.targetloc
      this.opponent.move()
    }
    if (frameCount - this.startframe == Math.round(this.interval * 60 * 2)) {      
      if (this.hit) {
        this.ball = new Ball(this.targetloc.x, height / 2 - 310, this.interval)
        this.hit = false
      } else { // if exceeded beat (missed ball)
        this.ball = new Ball(width / 2 - 120, height / 2 - 310, this.interval) 
        console.log("missed")
        this.opponent.x = width / 2 - 120
        this.missedlasttime = true
        this.combo = 0
        misscombo.play()
      }
      this.startframe = frameCount
      this.init = true
      this.ballmovingtowardsplayer = false
      hitsound1.play()
    }
  }

  
}