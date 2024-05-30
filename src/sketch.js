let song;
let startgame = false;
let startbpmmode = false;
let ontitle = true;
let onmenu = false;

function onSoundLoadError(e){
  console.log("load sound error",e);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  title = new TitleScreen()
  menu = new Menu()

  // find out valid screen size in the future
  if (width < 2528 || height < 1539) {
    // alert user
  }
}

function draw() {
  background(220)
  if (ontitle) title.render()
  if (onmenu) menu.render()
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
  // soundPath = 'assets/cut1.m4a'
  if (ontitle) {
    ontitle = false;
    onmenu = true;
  }
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