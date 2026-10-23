// Dual-Deck Contextual BGM Engine for 'Tiket Pulang Paling Sunyi'
// Supports 3 Emotional Zones with 5-Second Equal-Power Crossfade

export type BGMZone = 1 | 2 | 3;

export interface BGMInfo {
  zone: BGMZone;
  title: string;
  theme: string;
  artistNote: string;
}

export const BGM_ZONES: Record<BGMZone, BGMInfo> = {
  1: {
    zone: 1,
    title: "Awal & Nostalgia",
    theme: "Akustik Hangat & Piano Nostalgia",
    artistNote: "Vibe @TigaDuaSatu / Hindia Akustik",
  },
  2: {
    zone: 2,
    title: "Runtuh & Janji",
    theme: "Piano Melankolis & Senar Cello Lirih",
    artistNote: "Vibe Novo Amor / WE ARE CHPTRS",
  },
  3: {
    zone: 3,
    title: "Tragedi & Keabadian",
    theme: "Cinematic Strings & Piano Perpisahan",
    artistNote: "Vibe Seafret - Atlantis Instrumental",
  },
};

export function getZoneForChapter(chapterId: number): BGMZone {
  // Bab 2 & 3: Runtuh / Pailit & Pelukan Fira
  if (chapterId === 2 || chapterId === 3) return 2;
  // Bab 7, 8, 9, 10: Rem blong, jurang, realisasi arwah, ambulans
  if (chapterId >= 7 && chapterId <= 10) return 3;
  // Bab 1, 4, 5, 6 & Sinopsis (0): Awal pernikahan, terminal, mampir Jember
  return 1;
}

class SoundEngine {
  private audioCtx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private isRunning: boolean = false;
  private volume: number = 0.55;

  // Deck A & Deck B for Seamless Cross-Fade
  private audioA: HTMLAudioElement | null = null;
  private audioB: HTMLAudioElement | null = null;
  private sourceA: MediaElementAudioSourceNode | null = null;
  private sourceB: MediaElementAudioSourceNode | null = null;
  private gainA: GainNode | null = null;
  private gainB: GainNode | null = null;

  private activeDeck: "A" | "B" = "A";
  private currentZone: BGMZone = 1;
  private isTransitioning: boolean = false;

  private getAudioSrc(zone: BGMZone): string {
    return `/audio/bgm-zone${zone}.mp3`;
  }

  private init() {
    if (this.audioCtx) return;
    if (typeof window === "undefined") return;

    try {
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      this.audioCtx = new AudioContextClass();

      this.masterGain = this.audioCtx.createGain();
      this.masterGain.gain.setValueAtTime(this.volume, this.audioCtx.currentTime);
      this.masterGain.connect(this.audioCtx.destination);

      // Deck A
      this.audioA = new Audio(this.getAudioSrc(this.currentZone));
      this.audioA.loop = true;
      this.audioA.preload = "auto";
      this.sourceA = this.audioCtx.createMediaElementSource(this.audioA);
      this.gainA = this.audioCtx.createGain();
      this.gainA.gain.setValueAtTime(1.0, this.audioCtx.currentTime);
      this.sourceA.connect(this.gainA);
      this.gainA.connect(this.masterGain);

      // Deck B
      this.audioB = new Audio(this.getAudioSrc(2));
      this.audioB.loop = true;
      this.audioB.preload = "auto";
      this.sourceB = this.audioCtx.createMediaElementSource(this.audioB);
      this.gainB = this.audioCtx.createGain();
      this.gainB.gain.setValueAtTime(0.0001, this.audioCtx.currentTime);
      this.sourceB.connect(this.gainB);
      this.gainB.connect(this.masterGain);
    } catch (e) {
      console.warn("Web Audio API initialization note:", e);
    }
  }

  public async start(initialZone?: BGMZone): Promise<boolean> {
    try {
      this.init();
      if (!this.audioCtx) return false;

      if (this.audioCtx.state === "suspended") {
        await this.audioCtx.resume();
      }

      if (initialZone && initialZone !== this.currentZone) {
        this.currentZone = initialZone;
        if (this.audioA) this.audioA.src = this.getAudioSrc(this.currentZone);
      }

      if (this.masterGain) {
        this.masterGain.gain.setValueAtTime(this.volume, this.audioCtx.currentTime);
      }

      const activeAudio = this.activeDeck === "A" ? this.audioA : this.audioB;
      const activeGain = this.activeDeck === "A" ? this.gainA : this.gainB;

      if (activeGain) {
        activeGain.gain.setValueAtTime(1.0, this.audioCtx.currentTime);
      }

      if (activeAudio) {
        await activeAudio.play();
      }

      this.isRunning = true;
      return true;
    } catch (err) {
      console.warn("Failed to start BGM:", err);
      this.isRunning = false;
      return false;
    }
  }

  public stop() {
    try {
      if (this.audioA) this.audioA.pause();
      if (this.audioB) this.audioB.pause();
      if (this.audioCtx && this.audioCtx.state === "running") {
        this.audioCtx.suspend();
      }
    } catch (err) {
      console.warn("Failed to stop BGM:", err);
    }
    this.isRunning = false;
    this.isTransitioning = false;
  }

  public async toggle(chapterId?: number): Promise<boolean> {
    if (this.isRunning) {
      this.stop();
      return false;
    } else {
      const zone = chapterId !== undefined ? getZoneForChapter(chapterId) : this.currentZone;
      return await this.start(zone);
    }
  }

  // Ultra-Smooth 5-Second Equal-Power Crossfade Transition
  public async transitionToZone(targetZone: BGMZone, durationSec: number = 5.0): Promise<void> {
    if (targetZone === this.currentZone || !this.isRunning || !this.audioCtx) {
      this.currentZone = targetZone;
      return;
    }

    if (this.isTransitioning) return;
    this.isTransitioning = true;

    try {
      const now = this.audioCtx.currentTime;
      const nextDeck = this.activeDeck === "A" ? "B" : "A";
      const currentAudio = this.activeDeck === "A" ? this.audioA : this.audioB;
      const nextAudio = nextDeck === "A" ? this.audioA : this.audioB;
      const currentGain = this.activeDeck === "A" ? this.gainA : this.gainB;
      const nextGain = nextDeck === "A" ? this.gainA : this.gainB;

      if (!currentGain || !nextGain || !currentAudio || !nextAudio) {
        this.currentZone = targetZone;
        this.isTransitioning = false;
        return;
      }

      // Prepare Next Deck
      nextAudio.src = this.getAudioSrc(targetZone);
      nextAudio.currentTime = 0;
      await nextAudio.play();

      // Equal-power crossfade ramp over durationSec
      currentGain.gain.setValueAtTime(currentGain.gain.value, now);
      currentGain.gain.linearRampToValueAtTime(0.0001, now + durationSec);

      nextGain.gain.setValueAtTime(0.0001, now);
      nextGain.gain.linearRampToValueAtTime(1.0, now + durationSec);

      setTimeout(() => {
        try {
          currentAudio.pause();
          currentAudio.currentTime = 0;
        } catch {
          // ignore
        }
        this.activeDeck = nextDeck;
        this.currentZone = targetZone;
        this.isTransitioning = false;
      }, durationSec * 1000 + 50);
    } catch (e) {
      console.warn("Crossfade transition error:", e);
      this.currentZone = targetZone;
      this.isTransitioning = false;
    }
  }

  public getIsPlaying(): boolean {
    return this.isRunning;
  }

  public getCurrentZone(): BGMZone {
    return this.currentZone;
  }

  public getCurrentZoneInfo(): BGMInfo {
    return BGM_ZONES[this.currentZone];
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
