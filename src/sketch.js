let song;
let startgame = false;
let startbpmmode = false;
let ontitle = true;
let onmenu = false;

let transitioning = false
let transitionstartframe = 0

let setlist = []

function onSoundLoadError(e){
  console.log("load sound error",e);
}

function preload() {
  titleentrysound = loadSound('assets/effects/mixkit-arcade-mechanical-bling-210.wav')
  menuselectsound = loadSound('assets/effects/Menu-Selection-Change.mp3')
  hitsound1 = loadSound('assets/effects/hitmarker_2.mp3')
  misscombo = loadSound('assets/effects/misscombo.wav')
  titlesong = loadSound('assets/songs/cut1.m4a')
  regfont = loadFont('assets/fonts/Panton-Regular.ttf')
  boldfont = loadFont('assets/fonts/Panton-Bold.ttf')
  misscombo.setVolume(0.5)
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  title = new TitleScreen()
  setlist.push(new SetlistItem("assets/songs/TonightEN_RhythmHeavenFever.ogg", 145, "Tonight", "Tsunku", "Normal"))
  setlist.push(new SetlistItem("assets/songs/Hatsune Miku - Mythologia's End.mp3", 195, "Mythologia's End", "Hatsune Miku", "Hard"))
  setlist.push(new SetlistItem("assets/songs/DragonForce - Through the Fire and Flames.ogg", 200, "Through the Fire and Flames", "DragonForce", "Expert"))
  setlist.push(new SetlistItem("assets/songs/YOASOBI - Racing Into The Night.mp3", 130, "Racing Into The Night", "YOASOBI", "Normal"))
  setlist.push(new SetlistItem("assets/songs/Alstroemeria Records feat. nomico - Bad Apple!!.mp3", 138, "Bad Apple", "Alstroemeria Records feat. nomico", "Normal"))
  menu = new Menu(setlist)

  // find out valid screen size in the future
  if (width < 2528 || height < 1539) {
    // alert user
  }
}

function draw() {
  background(220)
  if (ontitle) title.render()
  if (onmenu) menu.render()
  if (transitioning) transition()
  if (startgame) {
    // console.log(obtainBPM(song))
    game.run()
  }
  if (startbpmmode) {
    bpm.obtainBPM()
  }

  // console.log(mouseX, mouseY)
}

function transition() {
  push()
  fill(0, 0, 0, 255 * (frameCount - transitionstartframe) / 30)
  if (frameCount - transitionstartframe > 30) {
    fill(0, 0, 0, 255)
  }
  if (frameCount - transitionstartframe > 60) {
    fill(0, 0, 0, 255 - 255 * (frameCount - transitionstartframe - 60) / 30)
  }
  rect(0, 0, width, height)
  pop()
  if (frameCount - transitionstartframe > 90) {
    transitioning = false;
    onmenu = true;
  }
}

function keyPressed() {
  // soundPath = 'assets/songs/TonightEN_RhythmHeavenFever.ogg'
  soundPath = 'assets/songs/Hatsune Miku - Mythologia\'s End.mp3'
  // soundPath = 'assets/songs/DragonForce - Through the Fire and Flames.ogg'
  if (ontitle) {
    ontitle = false;
    transitioning = true;
    transitionstartframe = frameCount;
    titleentrysound.play()
  }
  if (key === 'p' && !startgame && !startbpmmode) {
    song = loadSound(soundPath, onSoundLoadSuccess_bpm, onSoundLoadError)
    console.log("here")
  }
  if (key === 'g' && !startgame && !startbpmmode) {
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
  menuselectsound.play()
  console.log("load sound success");
  game = new Game(0.5, song)
  startgame = true;
}