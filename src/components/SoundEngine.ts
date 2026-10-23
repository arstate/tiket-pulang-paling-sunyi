// Dual-Deck Contextual BGM Engine for 'Tiket Pulang Paling Sunyi'
// Supports Adaptive Multi-Track Chapters & In-Chapter Scene Transitions
// Features Ultra-Smooth 5-Second Equal-Power Crossfade via Web Audio API

export type TrackId =
  | "bgm-cover"
  | "bgm-ch1a"
  | "bgm-ch1b"
  | "bgm-ch2a"
  | "bgm-ch2b"
  | "bgm-ch3"
  | "bgm-ch4"
  | "bgm-ch5"
  | "bgm-ch6"
  | "bgm-ch7"
  | "bgm-ch8"
  | "bgm-ch9"
  | "bgm-ch10";

export interface TrackInfo {
  id: TrackId;
  title: string;
  theme: string;
  artistNote: string;
  src: string;
}

export const TRACK_REGISTRY: Record<TrackId, TrackInfo> = {
  "bgm-cover": {
    id: "bgm-cover",
    title: "Nostalgia Senja Sidoarjo",
    theme: "Petikan Gitar Akustik Hangat",
    artistNote: "@TigaDuaSatu",
    src: "/audio/bgm-cover.mp3",
  },
  "bgm-ch1a": {
    id: "bgm-ch1a",
    title: "Aroma Dapur & Bawang",
    theme: "Akustik Sore & Kehangatan Rumah",
    artistNote: "@TigaDuaSatu / Hindia",
    src: "/audio/bgm-ch1a.mp3",
  },
  "bgm-ch1b": {
    id: "bgm-ch1b",
    title: "Piring Retak & Utang 42 Jt",
    theme: "Piano Lambat Melankolis",
    artistNote: "Novo Amor",
    src: "/audio/bgm-ch1b.mp3",
  },
  "bgm-ch2a": {
    id: "bgm-ch2a",
    title: "Malam Dingin di Laptop",
    theme: "Ambient Piano Hening",
    artistNote: "Novo Amor - State Lines",
    src: "/audio/bgm-ch2a.mp3",
  },
  "bgm-ch2b": {
    id: "bgm-ch2b",
    title: "Pelukan di Lantai Ubin",
    theme: "Senar Haru & Pasrah",
    artistNote: "WE ARE CHPTRS",
    src: "/audio/bgm-ch2b.mp3",
  },
  "bgm-ch3": {
    id: "bgm-ch3",
    title: "Dua Tangan Menolak Lepas",
    theme: "Cello Lirih & Janji Setia",
    artistNote: "WE ARE CHPTRS",
    src: "/audio/bgm-ch3.mp3",
  },
  "bgm-ch4": {
    id: "bgm-ch4",
    title: "Fajar Harapan Banyuwangi",
    theme: "Dawai Akustik Harapan Baru",
    artistNote: "Novo Amor - Anchor",
    src: "/audio/bgm-ch4.mp3",
  },
  "bgm-ch5": {
    id: "bgm-ch5",
    title: "Lari Menembus Peluit Kondektur",
    theme: "Indie Folk & Tensi Kereta Malam",
    artistNote: "Seafret - Atlantis",
    src: "/audio/bgm-ch5.mp3",
  },
  "bgm-ch6": {
    id: "bgm-ch6",
    title: "Secangkir Teh di Jember",
    theme: "Mellow Fingerstyle Nostalgia",
    artistNote: "Novo Amor / Fingerstyle",
    src: "/audio/bgm-ch6.mp3",
  },
  "bgm-ch7": {
    id: "bgm-ch7",
    title: "Derit Besi di Jalur Turunan",
    theme: "Dramatic Strings & Tragedi Jurang",
    artistNote: "Seafret - Atlantis Climax",
    src: "/audio/bgm-ch7.mp3",
  },
  "bgm-ch8": {
    id: "bgm-ch8",
    title: "Hening di Dasar Lembah",
    theme: "Kesunyian Jiwa & Solo Piano Dingin",
    artistNote: "Novo Amor - Repeat Until Death",
    src: "/audio/bgm-ch8.mp3",
  },
  "bgm-ch9": {
    id: "bgm-ch9",
    title: "Di Ambang Bawah Sadar",
    theme: "Arwah Pulang ke Pelukan Fira",
    artistNote: "Hindia Slow Piano",
    src: "/audio/bgm-ch9.mp3",
  },
  "bgm-ch10": {
    id: "bgm-ch10",
    title: "Pulang Tanpa Bayangan",
    theme: "Pelepasan Cinta Sejati & Outro Abadi",
    artistNote: "Novo Amor / Farewell",
    src: "/audio/bgm-ch10.mp3",
  },
};

export function getDefaultTrackForChapter(chapterId: number): TrackId {
  switch (chapterId) {
    case 1:
      return "bgm-ch1a";
    case 2:
      return "bgm-ch2a";
    case 3:
      return "bgm-ch3";
    case 4:
      return "bgm-ch4";
    case 5:
      return "bgm-ch5";
    case 6:
      return "bgm-ch6";
    case 7:
      return "bgm-ch7";
    case 8:
      return "bgm-ch8";
    case 9:
      return "bgm-ch9";
    case 10:
      return "bgm-ch10";
    case 0:
    default:
      return "bgm-cover";
  }
}

class SoundEngine {
  private audioCtx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private isRunning: boolean = false;
  private volume: number = 0.55;

  // Deck A & Deck B for Seamless Equal-Power Crossfade
  private audioA: HTMLAudioElement | null = null;
  private audioB: HTMLAudioElement | null = null;
  private sourceA: MediaElementAudioSourceNode | null = null;
  private sourceB: MediaElementAudioSourceNode | null = null;
  private gainA: GainNode | null = null;
  private gainB: GainNode | null = null;

  private activeDeck: "A" | "B" = "A";
  private currentTrackId: TrackId = "bgm-cover";
  private isTransitioning: boolean = false;

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

      const track = TRACK_REGISTRY[this.currentTrackId];

      // Deck A
      this.audioA = new Audio(track.src);
      this.audioA.loop = true;
      this.audioA.preload = "auto";
      this.sourceA = this.audioCtx.createMediaElementSource(this.audioA);
      this.gainA = this.audioCtx.createGain();
      this.gainA.gain.setValueAtTime(1.0, this.audioCtx.currentTime);
      this.sourceA.connect(this.gainA);
      this.gainA.connect(this.masterGain);

      // Deck B (Standby)
      this.audioB = new Audio(TRACK_REGISTRY["bgm-ch1a"].src);
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

  public async start(initialTrackId?: TrackId): Promise<boolean> {
    try {
      this.init();
      if (!this.audioCtx) return false;

      if (this.audioCtx.state === "suspended") {
        await this.audioCtx.resume();
      }

      const targetId = initialTrackId || this.currentTrackId;
      this.currentTrackId = targetId;

      const track = TRACK_REGISTRY[targetId];
      const activeAudio = this.activeDeck === "A" ? this.audioA : this.audioB;
      const activeGain = this.activeDeck === "A" ? this.gainA : this.gainB;

      if (activeAudio) {
        if (!activeAudio.src.endsWith(track.src)) {
          activeAudio.src = track.src;
        }
      }

      if (this.masterGain) {
        this.masterGain.gain.setValueAtTime(this.volume, this.audioCtx.currentTime);
      }

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

  public async toggle(chapterId?: number, explicitTrackId?: TrackId): Promise<boolean> {
    if (this.isRunning) {
      this.stop();
      return false;
    } else {
      let target: TrackId = this.currentTrackId;
      if (explicitTrackId) {
        target = explicitTrackId;
      } else if (chapterId !== undefined) {
        target = getDefaultTrackForChapter(chapterId);
      }
      return await this.start(target);
    }
  }

  // Ultra-Smooth 5-Second Equal-Power Crossfade Transition
  public async transitionToTrack(targetTrackId: TrackId, durationSec: number = 5.0): Promise<void> {
    if (targetTrackId === this.currentTrackId) {
      return;
    }

    if (!this.isRunning || !this.audioCtx) {
      this.currentTrackId = targetTrackId;
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
        this.currentTrackId = targetTrackId;
        this.isTransitioning = false;
        return;
      }

      const nextTrack = TRACK_REGISTRY[targetTrackId];

      // Prepare Next Deck
      nextAudio.src = nextTrack.src;
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
        this.currentTrackId = targetTrackId;
        this.isTransitioning = false;
      }, durationSec * 1000 + 50);
    } catch (e) {
      console.warn("Crossfade transition error:", e);
      this.currentTrackId = targetTrackId;
      this.isTransitioning = false;
    }
  }

  public getIsPlaying(): boolean {
    return this.isRunning;
  }

  public getCurrentTrackId(): TrackId {
    return this.currentTrackId;
  }

  public getCurrentTrackInfo(): TrackInfo {
    return TRACK_REGISTRY[this.currentTrackId] || TRACK_REGISTRY["bgm-cover"];
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
