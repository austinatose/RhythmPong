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
    translate(this.offset, 0)
    textSize(30)
    textFont(boldfont)
    textAlign(LEFT)
    text(this.name, this.pos.x + 100, this.pos.y + 50)
    textSize(20)
    textFont(regfont)
    text(this.artist, this.pos.x + 100, this.pos.y + 100)
    pop()
  }

  move() {
    // this.pos = lerp(this.pos, this.targetpos, 0.1)
    // this.pos.add(this.targetpos.sub(this.pos).mult(0.1))
    this.pos.x += (this.targetpos.x - this.pos.x) * 0.1
    this.pos.y += (this.targetpos.y - this.pos.y) * 0.1
    console.log(this.pos.x, this.targetpos.x, this.pos.x - this.targetpos.x)
  }
}