let song;
let startgame = false;
let startbpmmode = false;
let ontitle = true;

function onSoundLoadError(e){
  console.log("load sound error",e);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  title = new TitleScreen()
}

function draw() {
  background(220)
  if (ontitle) title.render()
  if (startgame) {
    // console.log(obtainBPM(song))
    game.run()
  }
  if (startbpmmode) {
    bpm.obtainBPM()
  }

  // console.log(mouseX, mouseY)
}

function keyPressed() {
  soundPath = 'assets/TonightEN_RhythmHeavenFever.ogg'
  // psoundPath = 'assets/cut1.m4a'
  if (key === 'p') {
    song = loadSound(soundPath, onSoundLoadSuccess_bpm, onSoundLoadError)
    console.log("here")
  }
  if (key === 'g') {
    song = loadSound(soundPath, onSoundLoadSuccess_game, onSoundLoadError)
    console.log("here")
  }
}

function onSoundLoadSuccess_bpm(){
  console.log("load sound success");
  bpm = new BPMobtainer(song)
  startbpmmode = true;
}

function onSoundLoadSuccess_game(){
  console.log("load sound success");
  game = new Game(0.5, song)
  startgame = true;
}