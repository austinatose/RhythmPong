// TODO: Completely Rework this

class BPMobtainer {
  constructor(song) {
    this.bpm = 0
    this.song = song

    this.fft = new p5.FFT()
    this.fft.setInput(this.song)
    // this.PeakDetect = new p5.PeakDetect(100, 2000, 0.6, 20)
    // this.PeakDetect = new p5.PeakDetect(20, 20000, 0.7, 1)

    // this.BD_MED = new BeatDetektor(85, 169)
    // this.vu = new BeatDetektor.modules.vis.VU();
    // this.kick_det = new BeatDetektor.modules.vis.BassKick();

    this.firstplay = true
    this.lastbeatframe = 0
    this.isfirstbeat = true

    this.ellipseWidth = 0

    this.startframe = frameCount
    this.done = false
    this.starttime = 0

    this.previoussenttime = -1
  }

  obtainBPM() {
    background(220)
    if (this.firstplay) {
      this.song.play()
      this.firstplay = false
      this.starttime = (new Date()).getTime()
      console.log("start time", this.starttime)
    }
    
    if (!this.done) {
      this.runVisualizer()
      // if (frameCount % 50 == 0) this.analyze()
    }
  }

  // analyze() {
  //   let spectrum = this.fft.analyze()
  //   console.log(spectrum)
  //   console.log(this.BD_MED)
  //   const currtime = (new Date()).getTime() / 1000
  //   const secondssince = currtime - this.starttime / 1000
  //   const win = this.BD_MED.process(secondssince, spectrum)
  //   console.log(secondssince)
  //   console.log(win)
  //   if (win) {
  //     if (Math.floor(secondssince) > this.previoussenttime) {
  //       console.log("bpm", win)
  //       this.bpm = win
  //       this.previoussenttime = Math.floor(secondssince)
  //       this.done = true
  //     }
  //   }
  // }

  // runVisualizer() {
  //   let spectrum = this.fft.analyze()
  //   this.PeakDetect.update(this.fft)
  //   if (this.PeakDetect.isDetected) {
  //     this.ellipseWidth = 100
  //     if (!this.isfirstbeat) {
  //       this.interval = (frameCount - this.lastbeatframe) / 60
  //       console.log("bpm", 60 / this.interval)
  //       this.isfirstbeat = true
  //     } else {
  //       this.isfirstbeat = false
  //       this.lastbeatframe = frameCount
  //     }
  //   }

  //   this.ellipseWidth *= 0.95

  //   ellipse(width / 2, height / 2, this.ellipseWidth, this.ellipseWidth)
  //   push()
  //   translate(width / 2, height / 2)
  //   beginShape()
  //   for (let i = 0; i < spectrum.length; i++) {
  //     let angle = map(i, 0, spectrum.length, 0, TWO_PI)
  //     let amp = spectrum[i]
  //     let r = map(amp, 0, 256, 20, 200)
  //     let x = r * cos(angle)
  //     let y = r * sin(angle)
  //     vertex(x, y)
  //   }
  //   endShape(CLOSE)
  //   pop()
  // }

  runVisualizer() { // circle visualizer
    let spectrum = this.fft.analyze()
    // let wave = this.fft.waveform()
    // for (let i = 0; i < spectrum.length; i++) {
    //   if (spectrum[i] == 0) {
    //     spectrum.shift()
    //   } else {
    //     console.log(spectrum[i])
    //     break
    //   }
    // }
    // for (let i = spectrum.length - 1; i >= 0; i--) {
    //   if (spectrum[i] == 0) {
    //     spectrum.pop()
    //   } else {
    //     console.log(spectrum[i])
    //     break
    //   }
    // }
    
    // erase all 0s from spectrum
    let newSpectrum = []
    for (let i = 0; i < spectrum.length; i++) {
      if (spectrum[i] != 0) {
        newSpectrum.push(spectrum[i])
      }
    }
    spectrum = newSpectrum

    push()
    angleMode(DEGREES)
    translate(width / 2, height / 2)
    beginShape()
    noFill()
    for (let i = 0; i <= 180; i++) {
      let j = floor(map(i, 0, 180, 0, spectrum.length - 1))
      // let r = map(spectrum[j], -1, 1, 200, 300)
      let r = map(spectrum[j], 0, 255, 200, 300)
      
      let x = r * sin(i)
      let y = r * cos(i)
      console.log(x, y)
      vertex(x, y)
    }
    endShape()
    beginShape()
    for (let i = 0; i <= 180; i++) {
      let j = floor(map(i, 0, 180, 0, spectrum.length - 1))
      // let r = map(spectrum[j], -1, 1, 200, 300)
      let r = map(spectrum[j], 0, 255, 200, 300)
      
      let x = r * -sin(i)
      let y = r * cos(i)
      console.log(x, y)
      vertex(x, y)
    }
    
    endShape()
    pop()
  }

  manualMode() {
    this.done = true
    this.bpm = prompt("Enter the BPM of the song")
  }
}