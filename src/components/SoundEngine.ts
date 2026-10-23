// Web Audio API Ambient Synthesizer for Rain and Night Train Clatter
// 100% offline, zero audio file dependencies, zero network latency

class SoundEngine {
  private audioCtx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private rainNode: AudioBufferSourceNode | null = null;
  private trainInterval: ReturnType<typeof setInterval> | null = null;
  private isRunning: boolean = false;
  private volume: number = 0.35;

  private init() {
    if (this.audioCtx) return;
    if (typeof window === 'undefined') return;

    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.audioCtx = new AudioContextClass();

      this.masterGain = this.audioCtx.createGain();
      this.masterGain.gain.setValueAtTime(this.volume, this.audioCtx.currentTime);
      this.masterGain.connect(this.audioCtx.destination);

      // Pink Noise Generator for Rain Sound
      const bufferSize = this.audioCtx.sampleRate * 2;
      const noiseBuffer = this.audioCtx.createBuffer(1, bufferSize, this.audioCtx.sampleRate);
      const output = noiseBuffer.getChannelData(0);

      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.04;
        b6 = white * 0.115926;
      }

      this.rainNode = this.audioCtx.createBufferSource();
      this.rainNode.buffer = noiseBuffer;
      this.rainNode.loop = true;

      // Bandpass filter to simulate rain on window / roof
      const rainFilter = this.audioCtx.createBiquadFilter();
      rainFilter.type = 'bandpass';
      rainFilter.frequency.setValueAtTime(800, this.audioCtx.currentTime);
      rainFilter.Q.setValueAtTime(0.7, this.audioCtx.currentTime);

      const rainGain = this.audioCtx.createGain();
      rainGain.gain.setValueAtTime(0.85, this.audioCtx.currentTime);

      this.rainNode.connect(rainFilter);
      rainFilter.connect(rainGain);
      rainGain.connect(this.masterGain);

      this.rainNode.start(0);
    } catch (e) {
      console.warn('Web Audio API not supported:', e);
    }
  }

  private startTrainClicks() {
    if (this.trainInterval || !this.audioCtx) return;
    let step = 0;
    this.trainInterval = setInterval(() => {
      if (!this.isRunning || !this.audioCtx || this.audioCtx.state !== 'running' || !this.masterGain) return;
      try {
        const osc = this.audioCtx.createOscillator();
        const clickGain = this.audioCtx.createGain();
        osc.type = 'triangle';

        const freqs = [75, 82, 70, 78];
        osc.frequency.setValueAtTime(freqs[step % 4], this.audioCtx.currentTime);

        const now = this.audioCtx.currentTime;
        clickGain.gain.setValueAtTime(0.0001, now);
        clickGain.gain.exponentialRampToValueAtTime(0.06, now + 0.02);
        clickGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.14);

        osc.connect(clickGain);
        clickGain.connect(this.masterGain);

        osc.start(now);
        osc.stop(now + 0.15);
        step++;
      } catch {
        // silent fail on interrupted frame
      }
    }, 420);
  }

  private stopTrainClicks() {
    if (this.trainInterval) {
      clearInterval(this.trainInterval);
      this.trainInterval = null;
    }
  }

  public async start(): Promise<boolean> {
    try {
      this.init();
      if (!this.audioCtx) return false;

      if (this.audioCtx.state === 'suspended') {
        await this.audioCtx.resume();
      }

      if (this.masterGain) {
        this.masterGain.gain.setValueAtTime(this.volume, this.audioCtx.currentTime);
      }

      this.isRunning = true;
      this.startTrainClicks();
      return true;
    } catch (err) {
      console.warn('Failed to start sound engine:', err);
      this.isRunning = false;
      return false;
    }
  }

  public stop() {
    try {
      if (this.audioCtx && this.audioCtx.state === 'running') {
        this.audioCtx.suspend();
      }
    } catch (err) {
      console.warn('Failed to suspend audio:', err);
    }
    this.stopTrainClicks();
    this.isRunning = false;
  }

  public async toggle(): Promise<boolean> {
    if (this.isRunning) {
      this.stop();
      return false;
    } else {
      return await this.start();
    }
  }

  public getIsPlaying(): boolean {
    return this.isRunning;
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.masterGain && this.audioCtx) {
      this.masterGain.gain.setValueAtTime(this.volume, this.audioCtx.currentTime);
    }
  }

  public getVolume(): number {
    return this.volume;
  }
}

export const soundEngine = new SoundEngine();
