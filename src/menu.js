class Menu {
  constructor(setlist) {
    this.menuitems = [];
    this.preview = new Demo();
    this.setlist = setlist; // Setlist object
  }

  render() {
    text("this is the menu", 100, 100);
    for (let i = 0; i < this.menuitems.length; i++) {
      this.menuitems[i].render();
    }
    this.displaydemo();
  }

  displaydemo() {
    if (this.preview != null) {
      this.preview.render();
    }
  }
}