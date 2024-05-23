function setup() {
  createCanvas(windowWidth, windowHeight);
  game = new Game()
}

function draw() {
  background(220)
  game.render(0.5)
  // console.log(mouseX, mouseY)
}
