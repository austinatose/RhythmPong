function setup() {
  createCanvas(windowWidth, windowHeight);
  game = new Game()
}

function draw() {
  background(220)
  game.render()
}
