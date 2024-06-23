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
    
  }

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
    translate(windowWidth / 2, height / 2)
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