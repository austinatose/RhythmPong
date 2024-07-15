class CustomSongMenu {
  constructor() {
    this.upload = createFileInput(this.handleFile.bind(this));
    this.upload.hide();
    this.bpminput = createInput();
    this.bpminput.position(windowWidth / 2 - 200, 200);
    this.bpminput.size(400, 40);
    this.bpminput.style('font-size', '30px');
    this.bpminput.attribute("type", "number");
    this.bpminput.input(this.isNumber);
    this.nameinput = createInput();
    this.nameinput.position(windowWidth / 2 - 200, 300);
    this.nameinput.size(400, 40);
    this.nameinput.style('font-size', '30px');
    this.artistinput = createInput();
    this.artistinput.position(windowWidth / 2 - 200, 400);
    this.artistinput.size(400, 40);
    this.artistinput.style('font-size', '30px');
    this.loadedsong = null;
    this.fileURL = null;
    this.test = null;
    this.artistinput.hide();
    this.nameinput.hide();
    this.bpminput.hide();
    this.canadd = false;
  }

  render() {
    this.upload.show();
    this.upload.position(windowWidth / 2 - 100, 100);
    this.nameinput.show();
    this.nameinput.position(windowWidth / 2 - 200, 305);
    this.artistinput.show();
    this.artistinput.position(windowWidth / 2 - 200, 405);
    this.bpminput.show();
    this.bpminput.position(windowWidth / 2 - 200, 205);

    push()
    textSize(50);
    fill(0);
    textFont(boldfont)

    text("BPM", windowWidth / 2 - 200, 200);
    text("Title", windowWidth / 2 - 200, 300);
    text("Artist", windowWidth / 2 - 200, 400);
    pop()

    // done button
    push()
    fill(255)
    strokeWeight(5)
    rect(windowWidth / 2 - 100, 500, 200, 100, 10)
    fill(0)
    textSize(50)
    textAlign(CENTER, CENTER)
    textFont(boldfont)
    text("Done", windowWidth / 2, 545)
    pop()

    if (mouseX > windowWidth / 2 - 100 && mouseX < windowWidth / 2 + 100 && mouseY > 500 && mouseY < 600 && mouseIsPressed && this.canadd) {
      this.addToSetlist();
    }

    // exit button bottom left
    push()
    strokeWeight(5)
    rect(0, windowHeight - 50, 50, 50, 5)
    image(exiticon, 3, windowHeight - 43, 40, 37)

    if (mouseX > 0 && mouseX < 50 && mouseY > windowHeight - 50 && mouseY < windowHeight && mouseIsPressed) {
      if (mouseIsPressed) {
        onmenu = true;
        startcustomsongmenu = false;
        this.upload.value("");
        this.nameinput.value("");
        this.artistinput.value("");
        this.bpminput.value("");
        this.upload.hide();
        this.nameinput.hide();
        this.artistinput.hide();
        this.bpminput.hide();
        console.log("Hiding custom song menu");
      }
    }
  }

  handleFile(file) {

    if (file) { // p5.File
      if (file.type === "audio") {
        const reader = new FileReader();

        console.log("File type is valid");
        console.log(file.file) // underlying file object

        // this.fileURL = URL.createObjectURL(file.file);
        // console.log(this.fileURL)
        this.loadedsong = loadSound(file, this.songLoaded.bind(this));
        // this.songLoaded();
      } else {
        console.log(file.type)
        alert("Invalid file type. Please upload an mp3, wav, ogg, or flac file.");
      }
    }
  }

  songLoaded() {
    console.log("Custom song loaded", this.loadedsong);
    this.loadedsong.play();
    // let soundBlob = this.loadedsong.getBlob();
    // this.addToSetlist();
    this.canadd = true;
  }

  isNumber() {
    let s = this.value();
    let c = s.charCodeAt(s.length - 1);
    console.log(c);
  
    if (!(c > 47 && c < 58)) {
      this.value(s.substring(0,s.length-1));
    } 
  }
  
  addToSetlist() {
    let difficulty = "Custom Song";
    if (this.bpminput.value() === "") {
      alert("Please fill out all fields.");
      return;
    }
    if (this.bpminput.value() > 200) {
      difficulty = "Expert";
    } else if (this.bpminput.value() > 150) {
      difficulty = "Hard";
    } else if (this.bpminput.value() > 130) {
      difficulty = "Normal";
    } else if (this.bpminput.value() <= 130) {
      difficulty = "Easy";
    }
    setlist.push(new SetlistItem(
      customsongs.length,
      this.bpminput.value(),
      this.nameinput.value(),
      this.artistinput.value(),
      difficulty,
    ));
    customsongs.push(this.loadedsong);
    console.log(setlist[setlist.length - 1]);
    menu = new Menu(setlist);
    this.loadedsong.stop();
    console.log(this.loadedsong);
    console.log(customsongs);
    onmenu = true;
    startcustomsongmenu = false;
    this.upload.value("");
    this.nameinput.value("");
    this.artistinput.value("");
    this.bpminput.value("");
    this.upload.hide();
    this.nameinput.hide();
    this.artistinput.hide();
    this.bpminput.hide();
    console.log("Hiding custom song menu");
  }
}