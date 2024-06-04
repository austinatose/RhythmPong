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
  }

  render() {
    push()
    strokeWeight(5)
    rect(this.pos.x, this.pos.y, this.length, 150, 75)
    pop()

    push()
    if (this.length == 400) translate(-100, 0) // TODO: do i want this?
    textSize(30)
    textFont(boldfont)
    textAlign(LEFT)
    text(this.name, this.pos.x + 100, this.pos.y + 50)
    textSize(20)
    textFont(regfont)
    text(this.artist, this.pos.x + 100, this.pos.y + 100)
    pop()
  }
}