class CustomSongMenu {
  constructor() {
    this.upload = createFileInput(this.handleFile.bind(this));
    this.loadedsong = null;
    this.fileURL = null;
    this.test = null;
  }

  render() {
    this.upload.show();
    this.upload.position(windowWidth / 2 - 100, 100);
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
    this.addToSetlist();
  }
  
  addToSetlist() {
    setlist.push(new SetlistItem(
      customsongs.length,
      140,
      "Custom Song",
      "Custom Song",
      "Custom Song",
      "Custom Song",
    ));
    customsongs.push(this.loadedsong);
    console.log(setlist[setlist.length - 1]);
    menu = new Menu(setlist);
    this.loadedsong.stop();
    console.log(this.loadedsong);
    console.log(customsongs);
    onmenu = true;
    startcustomsongmenu = false;
    this.upload.hide();
    console.log("Hiding custom song menu");
  }
}