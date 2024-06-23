class Fire {
  constructor(x, y, dramaticness) {
    this.particles = [];
    this.x = x;
    this.y = y;
    this.dramaticness = dramaticness;
  }

  render() {
    if (useparticles) {
      for (let i = 0; i < this.dramaticness; i++) {
        this.particles.push(new FireParticle(this.x, this.y));
      }
  
      for (let i = this.particles.length - 1; i >= 0; i--) {
        this.particles[i].update();
        this.particles[i].show();
        if (this.particles[i].finished()) {
          this.particles.splice(i, 1);
        }
      }
    }
  }
}

class FireParticle {
  constructor(x, y) {
    this.x = x + random(-30, 30);
    this.y = y;
    this.vx = random(-1, 1);
    this.vy = random(-5, -1);
    this.alpha = 255;
    this.d = 16;
  }

  finished() {
    return this.alpha < 0;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.alpha -= 3;
    this.d -= random(0.05, 0.1);
  }

  show() {
    if (useparticles) {
      push()
      noStroke();
      fill(random(200,230), random(50, 150), 10, this.alpha);
      ellipse(this.x, this.y, this.d);
      pop()
    }
  }
}

class HitEffect {
  constructor(x, y, vx, vy) {
    this.particles = [];
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
  }

  render() {
    if (useparticles) {
      for (let i = 0; i < 2; i++) {
        this.particles.push(new HitParticle(this.x, this.y, this.vx, this.vy));
      }
  
      for (let i = this.particles.length - 1; i >= 0; i--) {
        this.particles[i].update();
        this.particles[i].show();
        if (this.particles[i].finished()) {
          this.particles.splice(i, 1);
        }
      }
    }
  }
}

class HitParticle {
  constructor(x, y, vx, vy) {
    this.x = x;
    this.y = y;
    this.vx = random(-20, 20) + vx;
    this.vy = random(-20, 20) + vy;
    this.alpha = 255;
    this.d = 16;
  }

  finished() {
    return this.alpha < 0;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.alpha -= 51;
    this.d -= random(0.05, 0.1);
  }

  show() {
    if (useparticles) {
      console.log(useparticles)
      push()
      noStroke();
      fill(255, 255, 255, this.alpha);
      ellipse(this.x, this.y, this.d);
      pop()
    }
  }
}