class Menu {
  constructor(setlist) {
    this.menuitems = [];
    this.demo = null
    this.setlist = setlist; // Setlist object
    this.init = true;
    this.lastselected = 0;
    this.newlastselected = 0;
    this.delay = false; // delay instead of straight up blocking mouse holding action
    this.delaystartframe = 0;
    this.songpreview = null;
    this.isloadingsong = false;
    this.needstomove = true;
    this.canstart = true;
    this.activemuteicon = unmuteicon;
    this.mute = false;
    this.mousewaspressed = false;
    console.log(this.setlist);
  }

  render() {
    if (this.init) {
      this.demo = new Demo(windowWidth * 3/4 + 50, windowHeight/2, 0.5);
      for (let i = 0; i < this.setlist.length; i++) {
        // TODO: Make sizes adaptive for different screen sizes
        this.menuitems.push(new MenuItem(createVector(-75, windowHeight/2 - 400 + i * 150), this.setlist[i].song, this.setlist[i].bpm, this.setlist[i].name, this.setlist[i].artist, this.setlist[i].difficulty));
      }
      this.menuitems.push(new CustomSongInterfaceMenuItem(createVector(-75, windowHeight/2 - 400 + this.setlist.length * 150)));
      this.songpreview = loadSound(this.setlist[this.lastselected].song, () => {this.songpreview.play();}, () => {console.log("error loading song")});
      this.init = false;
    }
    this.demo.x = windowWidth * 3/4 + 50
    this.demo.y = windowHeight/2
    for (let i = this.lastselected - 2; i <= this.lastselected + 2; i++) {
      if (this.lastselected === 1) {
        if (i === -1) continue;
      } else if (this.lastselected === 0) {
        if (i === -1 || i === -2) continue;
      } else if (this.lastselected === this.menuitems.length - 2) {
        if (i === this.menuitems.length) continue;
      } else if (this.lastselected === this.menuitems.length - 1) {
        if (i === this.menuitems.length || i === this.menuitems.length + 1) continue;
      }
      // this.menuitems[i].pos.x = lerp(this.menuitems[i].pos.x, windowHeight/2 - 75 - (this.lastselected - i) * 150, 0.1);
      // this.menuitems[i].pos.y = windowHeight/2 - 75 - (this.lastselected - i) * 150;
      if (mouseX > this.menuitems[i].pos.x && mouseX < this.menuitems[i].pos.x + 800 && mouseY > this.menuitems[i].pos.y && mouseY < this.menuitems[i].pos.y + 150) {
        // highlight
        this.menuitems[i].highlight();
      }
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
      if (this.needstomove) this.menuitems[i].targetpos = createVector(-75 - 75 * abs(this.lastselected - i), windowHeight/2 - 75 - (this.lastselected - i) * 150); 
      this.menuitems[i].move();
      this.menuitems[i].render();
    }
    if (this.needstomove) {
      this.needstomove = false;
    }
    if (this.lastselected !== this.newlastselected) {
      this.lastselected = this.newlastselected;
      this.songpreview.stop();
      console.log(this.menuitems[this.lastselected])
      console.log(this.menuitems[this.lastselected] instanceof CustomSongInterfaceMenuItem)
      if (!(this.menuitems[this.lastselected] instanceof CustomSongInterfaceMenuItem)) {
        this.demo = new Demo(windowWidth * 3/4 + 50, windowHeight/2, 60/this.setlist[this.lastselected].bpm);
        this.songpreview = loadSound(this.setlist[this.lastselected].song, () => {this.songpreview.playMode('restart'); this.songpreview.play(); if (this.mute) this.songpreview.setVolume(0); this.isloadingsong = false; this.canstart = true}, () => {console.log("error loading song")});
        this.isloadingsong = true;
      }
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
      text("Loading song...", windowWidth/2, windowHeight/2)
      this.canstart = false;
      pop()
    }
    
    // square on bottom left for settings and mute
    push()
    strokeWeight(5)
    rect(0, windowHeight - 50, 50, 50, 5)
    image(settingsicon, 5, windowHeight - 45, 40, 40)
    rect(50, windowHeight - 50, 50, 50, 5)
    if (this.activemuteicon === unmuteicon) {
      image(this.activemuteicon, 60, windowHeight - 40, 30, 30)
    } else {
      image(this.activemuteicon, 55, windowHeight - 45, 40, 40)
    }
    
    pop()

    this.checkSettings();

    // info
    if (!(this.menuitems[this.lastselected] instanceof CustomSongInterfaceMenuItem)) {
      push()
      textSize(20)
      textAlign(LEFT)
      textFont(regfont)
      text("BPM: " + this.setlist[this.lastselected].bpm, 10, 20)
      text("Difficulty: " + this.setlist[this.lastselected].difficulty, 10, 40)
      pop()
    }

    // play button along bottom of screen
    // highlight
    if (mouseX > windowWidth / 2 - 200 && mouseX < windowWidth / 2 + 200 && mouseY > windowHeight - 50 && mouseY < windowHeight) {
      push()
      strokeWeight(10)
      stroke('grey')
      noFill()
      rectMode(CENTER)
      rect(windowWidth / 2 - 100 - 2, windowHeight - 25 - 3, 400, 50, 5)
      pop()
    }

    push()
    strokeWeight(5)
    rectMode(CENTER)
    rect(windowWidth / 2 - 100, windowHeight - 25, 400, 50, 5)
    pop()
    push()
    textSize(25)
    textAlign(CENTER)
    textFont(boldfont)
    if (!(this.menuitems[this.lastselected] instanceof CustomSongInterfaceMenuItem)) text("Play with this Song!", windowWidth / 2 - 100, windowHeight - 20)
    else text("Upload my own Song!", windowWidth / 2 - 100, windowHeight - 20)
    pop()

    this.checkforplay();

    // err
    this.demo.opponent2.rotoffset = -PI/2
    this.demo.opponent2.invert = false
    if (!(this.menuitems[this.lastselected] instanceof CustomSongInterfaceMenuItem)) this.demo.render();
    else {
      push()
      textSize(50)
      textAlign(CENTER)
      textFont(regfont)
      text("Upload your own song!", windowWidth * 3/4 + 50, windowHeight/2)
      pop()
    }
  }

  checkforplay() {
    if (mouseX > windowWidth / 2 - 200 && mouseX < windowWidth / 2 + 200 && mouseY > windowHeight - 50 && mouseY < windowHeight && mouseIsPressed && this.canstart) {
      if (!(this.menuitems[this.lastselected] instanceof CustomSongInterfaceMenuItem)) {
        this.songpreview.stop();
        this.canstart = false;
        // console.log("play")
        startgamesound.play();
        // startgame = true;
        // onmenu = false;
        // transitioning = true;
        // transitionstartframe = frameCount;
        selecteditem = setlist[this.lastselected];
        if (!(this.menuitems[this.lastselected] instanceof CustomSongInterfaceMenuItem)) song = loadSound(selecteditem.song, onSoundLoadSuccess_game, onSoundLoadError)
        console.log("start game with song: " + selecteditem.song)
        // titleentrysound.play()
        background(0)
      } else {
        console.log("upload song")
        onmenu = false;
        startbpmmode = true;
        insettings = false;
        // TODO: Complete this
      }
    }
  }

  checkSettings() {
    if (mouseX > 0 && mouseX < 50 && mouseY > windowHeight - 50 && mouseY < windowHeight && mouseIsPressed && !this.mousewaspressed) {
      console.log("settings")
      this.mousewaspressed = true;
      insettings = !insettings;
      wasonsettings = true;
      // onmenu is still true! settings window is just on top
    }
    if (mouseX > 50 && mouseX < 100 && mouseY > windowHeight - 50 && mouseY < windowHeight && mouseIsPressed && !this.mousewaspressed) {
      console.log("mute toggled")
      this.mute = !this.mute;
      if (this.mute) {
        this.activemuteicon = muteicon;
        this.songpreview.setVolume(0);
      } else {
        this.activemuteicon = unmuteicon;
        this.songpreview.setVolume(1);
      }
      this.mousewaspressed = true;
    }
    if (this.mousewaspressed && !mouseIsPressed) {
      this.mousewaspressed = false;
    }
  }
}

class MenuItem {
  constructor(pos, song, bpm, name, artist, difficulty) {
    this.song = song
    this.bpm = bpm
    this.name = name
    this.artist = artist
    this.difficulty = difficulty
    this.pos = pos
    this.selected = false
    this.length = 800
    this.offset = 0
    this.targetpos = pos
  }

  render() {
    push()
    strokeWeight(5)
    rect(this.pos.x, this.pos.y, this.length, 150, 75)
    pop()

    push()
    translate(-this.targetpos.x-75, 0)
    textSize(30)
    textFont(boldfont)
    textAlign(LEFT)
    text(this.name, this.pos.x + 100, this.pos.y + 50)
    textSize(20)
    textFont(regfont)
    text(this.artist, this.pos.x + 100, this.pos.y + 100)
    pop()
  }

  highlight() {
    push()
    strokeWeight(10)
    stroke('grey')
    rect(this.pos.x - 3, this.pos.y - 5, this.length, 150, 75)
    pop()
  }

  move() {
    // this.pos = lerp(this.pos, this.targetpos, 0.1)
    // this.pos.add(this.targetpos.sub(this.pos).mult(0.1))
    this.pos.x += (this.targetpos.x - this.pos.x) * 0.1
    this.pos.y += (this.targetpos.y - this.pos.y) * 0.1
    // console.log(this.pos.x, this.targetpos.x, this.pos.x - this.targetpos.x)
  }
}

class CustomSongInterfaceMenuItem {
  constructor(pos) {
    this.pos = pos
    this.length = 800
    this.offset = 0
    this.targetpos = pos
  }

  render() {
    push()
    strokeWeight(5)
    fill(180)
    rect(this.pos.x, this.pos.y, this.length, 150, 75)
    pop()

    push()
    translate(-this.targetpos.x-75, 0)
    textSize(30)
    textFont(boldfont)
    textAlign(LEFT)
    text("Custom Song", this.pos.x + 100, this.pos.y + 50)
    textSize(20)
    textFont(regfont)
    text("You!", this.pos.x + 100, this.pos.y + 100)
    pop()
  }

  highlight() {
    push()
    strokeWeight(10)
    stroke('grey')
    rect(this.pos.x - 3, this.pos.y - 5, this.length, 150, 75)
    pop()
  }

  move() {
    // this.pos = lerp(this.pos, this.targetpos, 0.1)
    // this.pos.add(this.targetpos.sub(this.pos).mult(0.1))
    this.pos.x += (this.targetpos.x - this.pos.x) * 0.1
    this.pos.y += (this.targetpos.y - this.pos.y) * 0.1
    // console.log(this.pos.x, this.targetpos.x, this.pos.x - this.targetpos.x)
  }
}