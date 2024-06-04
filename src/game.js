class Game {
  constructor(interval, song) {
    // this.interval = 60/145 // 145 bpm (tonight by tsunku)
    // this.interval = 60/195 // 195 bpm (mythologia's end by hatsune miku)
    this.interval = 60/200 // TTFAF
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
    this.entry = true
    this.firststart = true
    this.startgame = false
    this.font = loadFont('assets/fonts/Panton-Trial-Regular.ttf')
    textFont(this.font)

    this.elapsedbeats = 1
    this.timerstarttime = 0

    this.song = song
  }

  run() {
    background(220)
    if (this.entry) {
      this.entry = false
      // start game after 3 seconds
      setTimeout(() => {this.startgame = true}, 3000)
    }
    if (this.startgame) {
      if (this.firststart) {
        // TODO: Wait 4 beats before starting
        this.song.play()

        this.timerstarttime = window.performance.now()
        this.timer(this.checkhit.bind(this), this.interval * 1000 * 2) // does float work?
        
        this.firststart = false
      }
      this.render()
    }
  }

  timer(f, m) { // custom timer, more accurate than setInterval
    setInterval(function() {
      var target_time = this.timerstarttime + m * this.elapsedbeats;
      console.log(this.timerstarttime, this.elapsedbeats, target_time)
      var margin = 17;
      var now = window.performance.now();
      console.log(target_time, now)
      var dif = target_time - now;
      if (dif < margin && dif > -margin) {
        console.log("checkhit")
        this.elapsedbeats++;
        console.log(this.elapsedbeats)
        f();
      }
      console.log(dif)
    }.bind(this),
    1);
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
      console.log("init")
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
  }

  checkhit() {
    console.log("checkhit")
    if (this.hit) {
      this.ball = new Ball(this.targetloc.x, height / 2 - 310, this.interval)
      this.hit = false
    } else { // if exceeded beat (missed ball)
      this.ball = new Ball(width / 2 - 120, height / 2 - 310, this.interval) 
      // console.log("missed")
      // console.log(this.opponent)
      this.opponent.x = width / 2 - 120
      this.missedlasttime = true
      this.combo = 0
      // misscombo.play()
    }
    this.startframe = frameCount
    this.init = true
    this.ballmovingtowardsplayer = false
    hitsound1.play()
  }
}