// Dual-Deck Contextual BGM Engine for 'Tiket Pulang Paling Sunyi'
// Supports Adaptive Multi-Track Chapters, In-Chapter Scene Waypoints
// Features True Gapless Pre-End Self-Looping & 4-Second Equal-Power Crossfade via Web Audio API

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

export const AUDIO_CACHE_VERSION = "20261023_v4";

export const TRACK_REGISTRY: Record<TrackId, TrackInfo> = {
  "bgm-cover": {
    id: "bgm-cover",
    title: "Nostalgia Senja Sidoarjo",
    theme: "Petikan Gitar & Vokal Akustik Hangat",
    artistNote: "Dere - Kota",
    src: `/audio/bgm-cover.mp3?v=${AUDIO_CACHE_VERSION}`,
  },
  "bgm-ch1a": {
    id: "bgm-ch1a",
    title: "Aroma Dapur & Bawang",
    theme: "Vokal Hangat & Petikan Akustik Rumah",
    artistNote: "Dere - Berisik (@TigaDuaSatu)",
    src: `/audio/bgm-ch1a.mp3?v=${AUDIO_CACHE_VERSION}`,
  },
  "bgm-ch1b": {
    id: "bgm-ch1b",
    title: "Piring Retak & Utang 42 Jt",
    theme: "Piano Lambat & Vokal Melankolis",
    artistNote: "Novo Amor - Carry You",
    src: `/audio/bgm-ch1b.mp3?v=${AUDIO_CACHE_VERSION}`,
  },
  "bgm-ch2a": {
    id: "bgm-ch2a",
    title: "Malam Dingin di Laptop",
    theme: "Ambient Piano & Whisper Vocals",
    artistNote: "Novo Amor - State Lines",
    src: `/audio/bgm-ch2a.mp3?v=${AUDIO_CACHE_VERSION}`,
  },
  "bgm-ch2b": {
    id: "bgm-ch2b",
    title: "Pelukan di Lantai Ubin",
    theme: "Senar Haru & Vokal Pasrah",
    artistNote: "WE ARE CHPTRS - Let the New Begin",
    src: `/audio/bgm-ch2b.mp3?v=${AUDIO_CACHE_VERSION}`,
  },
  "bgm-ch3": {
    id: "bgm-ch3",
    title: "Dua Tangan Menolak Lepas",
    theme: "Cello Lirih, Senar & Vokal Setia",
    artistNote: "WE ARE CHPTRS - All of Our Tomorrows",
    src: `/audio/bgm-ch3.mp3?v=${AUDIO_CACHE_VERSION}`,
  },
  "bgm-ch4": {
    id: "bgm-ch4",
    title: "Fajar Harapan Banyuwangi",
    theme: "Dawai Akustik & Vokal Harapan Baru",
    artistNote: "Novo Amor - Anchor",
    src: `/audio/bgm-ch4.mp3?v=${AUDIO_CACHE_VERSION}`,
  },
  "bgm-ch5": {
    id: "bgm-ch5",
    title: "Lari Menembus Peluit Kondektur",
    theme: "Indie Folk Ritmik & Vokal Stasiun",
    artistNote: "Seafret - Atlantis",
    src: `/audio/bgm-ch5.mp3?v=${AUDIO_CACHE_VERSION}`,
  },
  "bgm-ch6": {
    id: "bgm-ch6",
    title: "Secangkir Teh di Jember",
    theme: "Fingerstyle Lembut & Vokal Nostalgia",
    artistNote: "Novo Amor - Opaline",
    src: `/audio/bgm-ch6.mp3?v=${AUDIO_CACHE_VERSION}`,
  },
  "bgm-ch7": {
    id: "bgm-ch7",
    title: "Derit Besi di Jalur Turunan",
    theme: "Strings Dramatis & Klimaks Vokal Tragedi",
    artistNote: "Seafret - Atlantis (Climax)",
    src: `/audio/bgm-ch7.mp3?v=${AUDIO_CACHE_VERSION}`,
  },
  "bgm-ch8": {
    id: "bgm-ch8",
    title: "Hening di Dasar Lembah",
    theme: "Kesunyian Jiwa & Solo Piano Falsetto",
    artistNote: "Novo Amor - Repeat Until Death",
    src: `/audio/bgm-ch8.mp3?v=${AUDIO_CACHE_VERSION}`,
  },
  "bgm-ch9": {
    id: "bgm-ch9",
    title: "Di Ambang Bawah Sadar",
    theme: "Bisikan Batin & Falsetto Sunyi",
    artistNote: "Novo Amor - Utican",
    src: `/audio/bgm-ch9.mp3?v=${AUDIO_CACHE_VERSION}`,
  },
  "bgm-ch10": {
    id: "bgm-ch10",
    title: "Pulang Tanpa Bayangan",
    theme: "Dawai Melankolis & Bisikan Haru",
    artistNote: "Cigarettes After Sex - Cry",
    src: `/audio/bgm-ch10.mp3?v=${AUDIO_CACHE_VERSION}`,
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

  // Deck A & Deck B for Gapless Pre-End Self-Looping & Inter-Track Crossfading
  private audioA: HTMLAudioElement | null = null;
  private audioB: HTMLAudioElement | null = null;
  private sourceA: MediaElementAudioSourceNode | null = null;
  private sourceB: MediaElementAudioSourceNode | null = null;
  private gainA: GainNode | null = null;
  private gainB: GainNode | null = null;

  private activeDeck: "A" | "B" = "A";
  private currentTrackId: TrackId = "bgm-cover";
  private isTransitioning: boolean = false;
  private isLooping: boolean = false;
  private loopCheckTimer: number | null = null;

  // Seamless crossfade lead time before track ends (seconds)
  private readonly LOOP_TRIGGER_BEFORE_END: number = 4.5;
  private readonly CROSSFADE_DURATION: number = 4.0;

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

      // Deck A - loop false because we handle seamless dual-deck pre-end loop
      this.audioA = new Audio(track.src);
      this.audioA.loop = false;
      this.audioA.preload = "auto";
      this.sourceA = this.audioCtx.createMediaElementSource(this.audioA);
      this.gainA = this.audioCtx.createGain();
      this.gainA.gain.setValueAtTime(1.0, this.audioCtx.currentTime);
      this.sourceA.connect(this.gainA);
      this.gainA.connect(this.masterGain);

      // Deck B (Standby Deck)
      this.audioB = new Audio(track.src);
      this.audioB.loop = false;
      this.audioB.preload = "auto";
      this.sourceB = this.audioCtx.createMediaElementSource(this.audioB);
      this.gainB = this.audioCtx.createGain();
      this.gainB.gain.setValueAtTime(0.0001, this.audioCtx.currentTime);
      this.sourceB.connect(this.gainB);
      this.gainB.connect(this.masterGain);

      // Safety fallback listeners for ended events
      this.audioA.addEventListener("ended", () => this.handleFallbackLoop("A"));
      this.audioB.addEventListener("ended", () => this.handleFallbackLoop("B"));
    } catch (e) {
      console.warn("Web Audio API initialization note:", e);
    }
  }

  // Periodic monitor checking if active track is nearing its end
  private startLoopMonitor() {
    this.stopLoopMonitor();
    if (typeof window === "undefined") return;

    this.loopCheckTimer = window.setInterval(() => {
      this.checkAndPerformPreEndLoop();
    }, 250);
  }

  private stopLoopMonitor() {
    if (this.loopCheckTimer !== null) {
      clearInterval(this.loopCheckTimer);
      this.loopCheckTimer = null;
    }
  }

  // Check if current playing deck is within LOOP_TRIGGER_BEFORE_END of ending
  private checkAndPerformPreEndLoop() {
    if (!this.isRunning || this.isTransitioning || this.isLooping) return;

    const currentAudio = this.activeDeck === "A" ? this.audioA : this.audioB;
    if (!currentAudio || !currentAudio.duration || isNaN(currentAudio.duration)) return;

    const duration = currentAudio.duration;
    const currentTime = currentAudio.currentTime;
    const remaining = duration - currentTime;

    // Trigger seamless pre-end crossfade before the audio track runs out
    if (remaining <= this.LOOP_TRIGGER_BEFORE_END && currentTime > 4.0) {
      this.triggerSelfLoop();
    }
  }

  // Seamless self-loop crossfades the track into itself using the standby deck
  private async triggerSelfLoop(): Promise<void> {
    if (this.isLooping || this.isTransitioning || !this.isRunning || !this.audioCtx) return;
    this.isLooping = true;

    try {
      const sourceDeck = this.activeDeck;
      const targetDeck = sourceDeck === "A" ? "B" : "A";
      const sourceAudio = sourceDeck === "A" ? this.audioA : this.audioB;
      const targetAudio = targetDeck === "A" ? this.audioA : this.audioB;
      const sourceGain = sourceDeck === "A" ? this.gainA : this.gainB;
      const targetGain = targetDeck === "A" ? this.gainA : this.gainB;

      if (!sourceAudio || !targetAudio || !sourceGain || !targetGain) {
        this.isLooping = false;
        return;
      }

      const track = TRACK_REGISTRY[this.currentTrackId];
      if (!targetAudio.src.endsWith(track.src)) {
        targetAudio.src = track.src;
      }
      targetAudio.currentTime = 0;

      // Start standby deck playing while target gain is near zero
      const now = this.audioCtx.currentTime;
      targetGain.gain.cancelScheduledValues(now);
      targetGain.gain.setValueAtTime(0.0001, now);

      await targetAudio.play();

      // Equal-power crossfade ramp over CROSSFADE_DURATION
      sourceGain.gain.cancelScheduledValues(now);
      sourceGain.gain.setValueAtTime(sourceGain.gain.value, now);
      sourceGain.gain.linearRampToValueAtTime(0.0001, now + this.CROSSFADE_DURATION);

      targetGain.gain.linearRampToValueAtTime(1.0, now + this.CROSSFADE_DURATION);

      // Switch active deck immediately to target so monitor watches targetDeck
      this.activeDeck = targetDeck;

      setTimeout(() => {
        try {
          sourceAudio.pause();
          sourceAudio.currentTime = 0;
        } catch {
          // ignore
        }
        this.isLooping = false;
      }, this.CROSSFADE_DURATION * 1000 + 50);
    } catch (err) {
      console.warn("Self-loop crossfade note:", err);
      this.isLooping = false;
    }
  }

  // Safety fallback if background tab sleep delayed the interval
  private handleFallbackLoop(deck: "A" | "B") {
    if (this.isRunning && this.activeDeck === deck && !this.isTransitioning && !this.isLooping) {
      this.triggerSelfLoop();
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
        activeAudio.currentTime = 0;
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
      this.startLoopMonitor();
      return true;
    } catch (err) {
      console.warn("Failed to start BGM:", err);
      this.isRunning = false;
      return false;
    }
  }

  public stop() {
    this.stopLoopMonitor();
    try {
      if (this.audioA) {
        this.audioA.pause();
        this.audioA.currentTime = 0;
      }
      if (this.audioB) {
        this.audioB.pause();
        this.audioB.currentTime = 0;
      }
      if (this.audioCtx && this.audioCtx.state === "running") {
        this.audioCtx.suspend();
      }
    } catch (err) {
      console.warn("Failed to stop BGM:", err);
    }
    this.isRunning = false;
    this.isTransitioning = false;
    this.isLooping = false;
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

  // Smooth Equal-Power Crossfade Transition between chapters or scenes
  public async transitionToTrack(targetTrackId: TrackId, durationSec: number = 4.0): Promise<void> {
    if (targetTrackId === this.currentTrackId) {
      return;
    }

    if (!this.isRunning || !this.audioCtx) {
      this.currentTrackId = targetTrackId;
      return;
    }

    if (this.isTransitioning) return;
    this.isTransitioning = true;
    this.isLooping = false; // Override any self-loop

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
      nextGain.gain.cancelScheduledValues(now);
      nextGain.gain.setValueAtTime(0.0001, now);

      await nextAudio.play();

      // Equal-power crossfade ramp over durationSec
      currentGain.gain.cancelScheduledValues(now);
      currentGain.gain.setValueAtTime(currentGain.gain.value, now);
      currentGain.gain.linearRampToValueAtTime(0.0001, now + durationSec);

      nextGain.gain.linearRampToValueAtTime(1.0, now + durationSec);

      this.activeDeck = nextDeck;
      this.currentTrackId = targetTrackId;

      setTimeout(() => {
        try {
          currentAudio.pause();
          currentAudio.currentTime = 0;
        } catch {
          // ignore
        }
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
