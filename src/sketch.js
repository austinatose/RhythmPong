let song;
let startgame = false;
let startbpmmode = false;
let ontitle = true;
let onmenu = false;

let selecteditem = null;

let transitioning = false
let transitionstartframe = 0

let setlist = []

function onSoundLoadError(e){
  console.log("load sound error",e);
}

function preload() {
  soundFormats('mp3', 'wav', 'm4a')
  titleentrysound = loadSound('assets/effects/mixkit-arcade-mechanical-bling-210.wav')
  menuselectsound = loadSound('assets/effects/Menu-Selection-Change.mp3')
  hitsound1 = loadSound('assets/effects/hitmarker_2.mp3')
  misscombo = loadSound('assets/effects/misscombo.wav')
  titlesong = loadSound('assets/songs/cut1.m4a')
  startgamesound = loadSound('assets/effects/startgame.wav')
  regfont = loadFont('assets/fonts/Panton-Regular.ttf')
  boldfont = loadFont('assets/fonts/Panton-Bold.ttf')
  settingsicon = loadImage('assets/images/settings-icon.png')
  unmuteicon = loadImage('assets/images/speaker.png')
  muteicon = loadImage('assets/images/speaker.slash.png')
  misscombo.setVolume(0.5)
}

function setup() {
  let cnv = createCanvas(windowWidth, windowHeight);
  camera.zoom = 1.6
  title = new TitleScreen()
  setlist.push(new SetlistItem("assets/songs/xi - Freedom Dive.mp3", 111.11, "Freedom Dive (Easy)", "xi", "Easy"))
  setlist.push(new SetlistItem("assets/songs/Deep Purple - Smoke on the Water.mp3", 115, "Smoke on the Water", "Deep Purple", "Easy"))
  setlist.push(new SetlistItem("assets/songs/YOASOBI - Racing Into The Night.mp3", 130, "Racing Into The Night", "YOASOBI", "Normal"))
  setlist.push(new SetlistItem("assets/songs/Alstroemeria Records feat. nomico - Bad Apple!!.mp3", 138, "Bad Apple", "Alstroemeria Records feat. nomico", "Normal"))
  setlist.push(new SetlistItem("assets/songs/shortcut1.mp3", 140, "Very Short Song (10s)", "if you want to see the end screen without playing the game", "Normal"))
  setlist.push(new SetlistItem("assets/songs/TonightEN_RhythmHeavenFever.mp3", 145, "Tonight (From Rhythm Heaven Fever)", "Tsunku", "Normal"))
  setlist.push(new SetlistItem("assets/songs/Siromaru - Conflict.mp3", 160, "Conflict", "Siromaru", "Hard"))
  setlist.push(new SetlistItem("assets/songs/Hatsune Miku - Mythologia's End.mp3", 195, "Mythologia's End", "Hatsune Miku", "Hard"))
  setlist.push(new SetlistItem("assets/songs/DragonForce - Through the Fire and Flames.mp3", 200, "Through the Fire and Flames", "DragonForce", "Expert"))
  setlist.push(new SetlistItem("assets/songs/xi - Freedom Dive.mp3", 222.22, "Freedom Dive (Expert)", "xi", "Expert"))  
  menu = new Menu(setlist)

  // find out valid screen size in the future
  if (width < 2528 || height < 1539) {
    // alert user
  }
}

function draw() {
  frameRate(60)
  background(220)
  // translate(width / 2 - width / 1.3 / 2, height / 2 - height / 1.3 / 2)
  // resizeCanvas(windowWidth / 1.6, windowHeight / 1.6)
  // translate(width / 2, height / 2)
  // scale(1.6)
  // translate(-width / 2, -height / 2)

  // console.log(width, height)
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

  // console.log(frameRate())
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

function keyPressed() { // for debug
  if (ontitle) {
    titleentrysound.play()
    ontitle = false;
    transitioning = true;
    transitionstartframe = frameCount;
  }
  if (key === 'p' && !startgame && !startbpmmode) {
    soundFormats('mp3', 'wav')
    song = loadSound(soundPath, onSoundLoadSuccess_bpm, onSoundLoadError)
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
  game = new Game(60 / selecteditem.bpm, song)
  startgame = true;
}