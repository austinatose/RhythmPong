class Game {
  constructor(interval, song) {
    // this.interval = 60/145 // 145 bpm (tonight by tsunku)
    // this.interval = 60/195 // 195 bpm (mythologia's end by hatsune miku)
    // this.interval = 60/200 // TTFAF
    this.interval = interval
    this.ball = new Ball(windowWidth / 2 - 120, windowHeight / 2 - 310)
    this.table = new Table(createVector(windowWidth / 2, windowHeight / 2)) // unfortunately resize doesn't really work here because the position is too sensitive
    this.paddle = new Paddle()
    this.fireeffect = new Fire(100, 150)
    this.hiteffect = new HitEffect(100, 150)
    this.rainboweffect = new RainbowEffect(100, 150)
    this.hiteffectrendertime = 0
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
    this.endgame = false
    this.countingdown = false
    this.countdownbeat = 4
    this.rainboweffectrendertime = 0
    textFont(regfont)

    this.elapsedbeats = 1
    this.timerstarttime = 0
    this.timerhelper = null
    this.countdownhelper = null

    this.isreset = false

    this.song = song
  }

  run() {
    if (this.entry) {
      this.entry = false
      this.song.play()
      this.countingdown = true
      setTimeout(() => {this.startgame = true}, this.interval * 4 * 1000)
      this.countdownhelper = setInterval(() => {this.countdownbeat--}, this.interval * 1000)
    }
    if (this.countingdown) {
      this.countdown()
    }
    // console.log(this.startgame, this.endgame)
    if (this.startgame) {
      this.song.onended(() => {if (!this.isreset) {console.log("SONG ENDED"); this.handleEnd()}})
      this.countingdown = false
      if (this.firststart) {
        this.timerstarttime = window.performance.now()
        this.timer(this.checkhit.bind(this), this.interval * 1000 * 2) // does float work?
        
        this.firststart = false
      }
      this.render()
    }
    if (this.endgame) {
      console.log("end received")
      this.renderEndScreen()
    }
  }

  timer(f, m) { // custom timer, more accurate than setInterval
    this.timerhelper = setInterval(function() {
      var target_time = this.timerstarttime + m * this.elapsedbeats;
      // console.log(this.timerstarttime, this.elapsedbeats, target_time)
      var margin = 17; // 16.6666 milliseconds per frame for 60 fps
      var now = window.performance.now();
      // console.log(target_time, now)
      var dif = target_time - now;
      if (dif < margin && dif > -margin) {
        // console.log("checkhit")
        this.elapsedbeats++;
        // console.log(this.elapsedbeats)
        f();
      }
      // console.log(dif)
    }.bind(this),
    1);
  }

  countdown() {
    background(220)
    push()
    // textFont(loadFont('assets/fonts/Panton-Regular.ttf'))
    textFont(boldfont)
    textSize(250)
    textAlign(CENTER)
    text(this.countdownbeat, windowWidth / 2, windowHeight / 2)
    pop()
  }

  render() {
    background(220)
    this.table.render()
    this.ball.render()
    this.paddle.render()
    this.opponent.render()

    // this.screenShake()

    this.isreset = false

    push()
    textSize(50)
    text("Score: " + this.score, 100, 220)
    text("Combo: " + this.combo, 100, 290)
    textFont(boldfont)
    if (this.missedlasttime) {
      fill('red')
      text("Missed", 100, 150)
    } else if (this.distance < 25) {
      fill('green')
      text("Perfect", 100, 150)
    } else if (this.distance < 60) {
      fill('green')
      text("Good", 100, 150)
    } else if (this.distance < 100) {
      fill('purple')
      text("Ok", 100, 150)
    } else {
      fill('indigo')
      text("Bad", 100, 150)
    }
    pop()

    if (this.combo >= 5) {
      push()
      this.fireeffect.dramaticness = floor((this.combo - 4) / 2)
      this.fireeffect.x = mouseX
      this.fireeffect.y = mouseY + 25
      this.fireeffect.render()
      pop()
    }

    if (this.init) {
      this.startframe = frameCount
      this.targetloc.y = windowHeight / 2 + 360
      this.targetloc.x = windowWidth / 2 + random(-150, 150) // table tennis rules
      if (this.missedlasttime) this.targetloc.x = windowWidth / 2 + 50 // random(0, 150)
      this.ball.determineVelocity(this.targetloc, this.interval)
      this.init = false
      console.log("init")
    }
    // return
    if (this.ball.pos.x < this.paddle.x + 30 && this.ball.pos.x > this.paddle.x - 30 && this.ball.pos.y < this.paddle.y + 30 && this.ball.pos.y > this.paddle.y - 30 && !this.hit && this.paddle.y > windowHeight/2) { // collided
      if (usesoundeffects) hitsound1.play()
      this.distance = dist(this.ball.pos.x, this.ball.pos.y, this.targetloc.x, this.targetloc.y)
      console.log("hit", this.distance)
      this.targetloc.y = windowHeight / 2 - 310
      this.targetloc.x = windowWidth / 2 + random(-150, 150) // -150 to 150
      var remtime = (this.interval * 60 * 2 - frameCount + this.startframe) / 60
      console.log(remtime)
      this.ball.determineVelocity(this.targetloc, remtime)
      this.hit = true
      this.missedlasttime = false
      this.ballmovingtowardsplayer = true
      if (this.distance < 25) {
        this.rainboweffectrendertime = 10
        this.rainboweffect.x = this.ball.pos.x
        this.rainboweffect.y = this.ball.pos.y
        this.rainboweffect.particles = []
        this.combo++;
      } else if (this.distance < 60) {
        this.combo++;
      } else if (this.distance < 100) {
        this.combo++;
      } else {
        this.combo = 0;
        if (usesoundeffects) misscombo.play()
      }
      this.score += Math.round((300 - this.distance) * (1 + this.combo/50)) // each combo gives 2% score boost

      // hit effect
      this.hiteffectrendertime = 10
      this.hiteffect.x = this.ball.pos.x
      this.hiteffect.y = this.ball.pos.y
      this.hiteffect.particles = []
    }

    this.ball.move()
    if (this.ballmovingtowardsplayer) {
      this.opponent.targetloc = this.targetloc
      this.opponent.move()
    }

    if (this.hiteffectrendertime > 0) {
      this.hiteffectrendertime--
      this.hiteffect.x = this.ball.pos.x
      this.hiteffect.y = this.ball.pos.y
      this.hiteffect.vx = this.ball.vel.x
      this.hiteffect.vy = this.ball.vel.y
      this.hiteffect.render()
    }

    if (this.rainboweffectrendertime > 0) {
      this.rainboweffectrendertime--
      this.rainboweffect.x = this.ball.pos.x
      this.rainboweffect.y = this.ball.pos.y
      this.rainboweffect.vx = this.ball.vel.x
      this.rainboweffect.vy = this.ball.vel.y
      this.rainboweffect.render()
    }

    this.renderRestartButton()
    this.renderExitButton()
  }

  // screenShake() {
  //   // screen shake intensifies based on combo
  //   if (this.combo > 0) {
  //     translate(random(-this.combo, this.combo), random(-this.combo, this.combo))
  //   }
  // }

  checkhit() {
    console.log("checkhit")
    if (this.hit) {
      this.ball = new Ball(this.targetloc.x, windowHeight / 2 - 310, this.interval)
      this.hit = false
    } else { // if exceeded beat (missed ball)
      this.ball = new Ball(windowWidth / 2 - 120, windowHeight / 2 - 310, this.interval) 
      // console.log("missed")
      // console.log(this.opponent)
      this.opponent.x = windowWidth / 2 - 120
      this.missedlasttime = true
      this.combo = 0
      if (usesoundeffects) misscombo.play()
      console.log("missed in checkhit")
    }
    // hit effect
    this.hiteffectrendertime = 10
    this.hiteffect.x = this.ball.pos.x
    this.hiteffect.y = this.ball.pos.y
    this.hiteffect.particles = []
    if (usesoundeffects) hitsound1.play()

    this.init = true
    this.ballmovingtowardsplayer = false
  }

  renderEndScreen() {
    background(220)
    push()
    textSize(100)
    textAlign(CENTER)
    text("Game Over", windowWidth / 2, windowHeight / 2)
    textSize(50)
    text("Score: " + this.score, windowWidth / 2, windowHeight / 2 + 100)
    text("Back to menu", windowWidth / 2, windowHeight / 2 + 200)
    strokeWeight(3)
    line(windowWidth / 2 - 170, windowHeight / 2 + 220, windowWidth / 2 + 170, windowHeight / 2 + 220)
    pop()

    cursor(ARROW)
    if (mouseX > windowWidth / 2 - 170 && mouseX < windowWidth / 2 + 170 && mouseY > windowHeight / 2 + 180 && mouseY < windowHeight / 2 + 220) {
      cursor(HAND) // could change this
      if (mouseIsPressed) {
        this.song.stop()
        this.song = null
        onmenu = true
        startgame = false
      }
    }
  }

  renderRestartButton() {
    push()
    strokeWeight(5)
    rect(0, windowHeight - 50, 50, 50, 5)
    image(reseticon, 3, windowHeight - 43, 40, 37)

    if (mouseX > 0 && mouseX < 50 && mouseY > windowHeight - 50 && mouseY < windowHeight) {
      if (mouseIsPressed) {
        this.song.stop()

        // reconstruct
        this.ball = new Ball(windowWidth / 2 - 120, windowHeight / 2 - 310)
        this.table = new Table(createVector(windowWidth / 2, windowHeight / 2))
        this.paddle = new Paddle()
        this.fireeffect = new Fire(100, 150)
        this.hiteffect = new HitEffect(100, 150)
        this.hiteffectrendertime = 0
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
        this.endgame = false
        this.countingdown = false
        this.countdownbeat = 4

        this.isreset = true

        this.elapsedbeats = 1
        this.timerstarttime = 0

        clearInterval(this.timerhelper)
        clearInterval(this.countdownhelper)

        this.timerhelper = null
        this.countdownhelper = null
      }
    }
  }

  renderExitButton() {
    push()
    strokeWeight(5)
    rect(50, windowHeight - 50, 50, 50, 5)
    image(exiticon, 53, windowHeight - 43, 40, 37)

    if (mouseX > 50 && mouseX < 100 && mouseY > windowHeight - 50 && mouseY < windowHeight) {
      if (mouseIsPressed) {
        this.song.stop()
      }
    }
  }

  handleEnd() {
    this.startgame = false
    this.endgame = true
    console.log("end")
    clearInterval(this.timerhelper)
  }
}