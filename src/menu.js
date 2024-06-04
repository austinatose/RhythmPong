class Menu {
  constructor(setlist) {
    this.menuitems = [];
    this.demo = null
    this.setlist = setlist; // Setlist object
    this.init = true;
    this.lastselected = 2;
    this.newlastselected = 2;
    this.delay = false;
    this.delaystartframe = 0;
    this.songpreview = null;
    this.isloadingsong = false;
    this.needstomove = false;
    console.log(this.setlist);
  }

  render() {
    if (this.init) {
      this.demo = new Demo(width/2 + 400, height/2, 0.5);
      for (let i = 0; i < this.setlist.length; i++) {
        // TODO: Make sizes adaptive
        this.menuitems.push(new MenuItem(createVector(-75, height/2 - 400 + i * 150), this.setlist[i].song, this.setlist[i].bpm, this.setlist[i].name, this.setlist[i].artist, this.setlist[i].difficulty));
      }
      this.songpreview = loadSound(this.setlist[this.lastselected].song, () => {this.songpreview.play();}, () => {console.log("error loading song")});
      this.init = false;
    }
    for (let i = this.lastselected - 2; i <= this.lastselected + 2; i++) {
      // TODO: Animate menus
      if (this.lastselected === 1) {
        if (i === -1) continue;
      } else if (this.lastselected === 0) {
        if (i === -1 || i === -2) continue;
      } else if (this.lastselected === this.menuitems.length - 2) {
        if (i === this.menuitems.length) continue;
      } else if (this.lastselected === this.menuitems.length - 1) {
        if (i === this.menuitems.length || i === this.menuitems.length + 1) continue;
      }
      // this.menuitems[i].pos.x = lerp(this.menuitems[i].pos.x, height/2 - 75 - (this.lastselected - i) * 150, 0.1);
      // this.menuitems[i].pos.y = height/2 - 75 - (this.lastselected - i) * 150;
      if (mouseX > this.menuitems[i].pos.x && mouseX < this.menuitems[i].pos.x + 800 && mouseY > this.menuitems[i].pos.y && mouseY < this.menuitems[i].pos.y + 150 && mouseIsPressed && !this.delay) {
        // console.log("focus shifted")
        menuselectsound.play();
        this.menuitems[i].selected = true;
        this.delaystartframe = frameCount;
        this.delay = true;
        this.newlastselected = i;
      } else if (this.lastselected === i) {
        this.menuitems[i].selected = true;
      } else {
        this.menuitems[i].selected = false;
      }
      // animation
      // this.menuitems[i].pos.x -= 400 - 200 * abs(this.lastselected - i);
      if (this.needstomove) this.menuitems[i].targetpos = createVector(this.menuitems[i].pos.x - 400 - 200 * abs(this.lastselected - i), height/2 - 75 - (this.lastselected - i) * 150);
      this.menuitems[i].move();
      this.menuitems[i].render();
    }
    if (this.needstomove) {
      this.needstomove = false;
    }
    if (this.lastselected !== this.newlastselected) {
      this.lastselected = this.newlastselected;
      this.songpreview.stop();
      this.demo = new Demo(width/2 + 400, height/2, 60/this.setlist[this.lastselected].bpm);
      this.songpreview = loadSound(this.setlist[this.lastselected].song, () => {this.songpreview.playMode('restart'); this.songpreview.play(); this.isloadingsong = false}, () => {console.log("error loading song")});
      this.isloadingsong = true;
      this.needstomove = true;
    }

    if (frameCount - this.delaystartframe > 30) {
      this.delay = false;
    }

    if (this.isloadingsong) {
      push()
      textSize(50)
      textAlign(CENTER)
      textFont(regfont)
      text("Loading song...", width/2, height/2)
      pop()
    }
    
    // square on bottom left for settings and mute
    push()
    strokeWeight(5)
    rect(0, height - 50, 50, 50, 5)
    rect(50, height - 50, 50, 50, 5)
    pop()

    // err
    this.demo.opponent2.rotoffset = -PI/2
    this.demo.opponent2.invert = false
    this.demo.render();
  }
}