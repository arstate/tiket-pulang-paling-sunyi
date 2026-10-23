"use client";

import { useEffect, useState, useRef } from "react";
import { NovelData, ReaderSettings } from "@/types/novel";
import Header from "@/components/Header";
import ReadingProgressBar from "@/components/ReadingProgressBar";
import HeroCover from "@/components/HeroCover";
import ChapterContent from "@/components/ChapterContent";
import TocDrawer from "@/components/TocDrawer";
import SettingsDrawer from "@/components/SettingsDrawer";
import MobileBottomNav from "@/components/MobileBottomNav";
import AudioPermissionModal from "@/components/AudioPermissionModal";
import { soundEngine, TrackId, SoundscapeConfig } from "@/components/SoundEngine";

const DEFAULT_SETTINGS: ReaderSettings = {
  theme: "cream",
  fontSize: 18.5,
  fontFamily: "merriweather",
  lineHeight: "comfortable",
  pageWidth: "standard",
  textAlign: "left",
  audioEnabled: false,
  audioVolume: 0.35,
};

interface NovelReaderProps {
  novel: NovelData;
  soundscape?: Partial<SoundscapeConfig>;
}

export default function NovelReader({ novel, soundscape }: NovelReaderProps) {
  const [activeChapterId, setActiveChapterId] = useState<number>(0);
  const [lastReadChapterId, setLastReadChapterId] = useState<number>(1);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [isTocOpen, setIsTocOpen] = useState<boolean>(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [isAudioModalOpen, setIsAudioModalOpen] = useState<boolean>(false);
  const [audioPlaying, setAudioPlaying] = useState<boolean>(false);
  const [bgmTitle, setBgmTitle] = useState<string>("BGM Novel");
  const [settings, setSettings] = useState<ReaderSettings>(DEFAULT_SETTINGS);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const userMutedRef = useRef<boolean>(false);
  const prevChapterIdRef = useRef<number>(activeChapterId);

  // Clean up audio & pending unlock listeners on unmount
  useEffect(() => {
    return () => {
      soundEngine.removeUnlockListeners();
      soundEngine.stop();
    };
  }, []);

  // Configure soundscape on mount / novel change
  useEffect(() => {
    if (soundscape) {
      soundEngine.setSoundscape(soundscape);
    }
  }, [soundscape]);

  // 1. Initialize from localStorage and URL Hash
  useEffect(() => {
    setIsMounted(true);

    const storagePrefix = novel.slug === "tiket-pulang-paling-sunyi" ? "tiket_pulang" : `novel_${novel.slug}`;

    // Load Settings
    try {
      const savedSettings = localStorage.getItem(`${storagePrefix}_settings`) || localStorage.getItem("tiket_pulang_settings");
      if (savedSettings) {
        setSettings((prev) => ({ ...prev, ...JSON.parse(savedSettings) }));
      }
    } catch (e) {
      console.warn("Could not load settings:", e);
    }

    // Load Last Read Chapter (per novel without inheriting other books)
    try {
      const savedChapter = localStorage.getItem(`${storagePrefix}_last_chapter`);
      if (savedChapter) {
        const id = parseInt(savedChapter, 10);
        if (id >= 1 && id <= novel.chapters.length) {
          setLastReadChapterId(id);
        } else {
          setLastReadChapterId(1);
        }
      } else {
        setLastReadChapterId(1);
      }
    } catch (e) {
      console.warn("Could not load last chapter:", e);
      setLastReadChapterId(1);
    }

    // Mark audio prompted in localStorage without modal popup to keep reading flow unobstructed
    try {
      localStorage.setItem(`${storagePrefix}_audio_prompted`, "true");
      localStorage.setItem("tiket_pulang_audio_prompted", "true");
    } catch {
      // ignore
    }

    // Check URL Hash
    const applyHash = () => {
      const hash = window.location.hash;
      const match = hash.match(/^#bab-(\d+)$/i);
      if (match) {
        const chapterNum = parseInt(match[1], 10);
        if (chapterNum >= 1 && chapterNum <= novel.chapters.length) {
          setActiveChapterId(chapterNum);
          return;
        }
      }
      setActiveChapterId(0);
    };

    applyHash();
    window.addEventListener("hashchange", applyHash);
    return () => window.removeEventListener("hashchange", applyHash);
  }, [novel]);

  // 2. Apply Theme to Body / Document
  useEffect(() => {
    if (!isMounted) return;
    document.documentElement.setAttribute("data-theme", settings.theme);
  }, [settings.theme, isMounted]);

  // 3. Handle Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      switch (e.key) {
        case "ArrowRight":
        case "j":
        case "J":
          if (activeChapterId > 0 && activeChapterId < novel.chapters.length) {
            handleSelectChapter(activeChapterId + 1);
          }
          break;
        case "ArrowLeft":
        case "k":
        case "K":
          if (activeChapterId > 1) {
            handleSelectChapter(activeChapterId - 1);
          }
          break;
        case "t":
        case "T":
          setIsTocOpen((prev) => !prev);
          break;
        case "s":
        case "S":
          setIsSettingsOpen((prev) => !prev);
          break;
        case "m":
        case "M":
          handleToggleAudio();
          break;
        case "h":
        case "H":
          handleGoHome();
          break;
        case "Escape":
          setIsTocOpen(false);
          setIsSettingsOpen(false);
          setIsAudioModalOpen(false);
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeChapterId, novel.chapters.length, audioPlaying]);

  // 4. Save Settings to localStorage
  useEffect(() => {
    if (!isMounted) return;
    const storagePrefix = novel.slug === "tiket-pulang-paling-sunyi" ? "tiket_pulang" : `novel_${novel.slug}`;
    try {
      localStorage.setItem(`${storagePrefix}_settings`, JSON.stringify(settings));
    } catch (e) {
      console.warn("Could not save settings:", e);
    }
  }, [settings, isMounted, novel.slug]);

  // Resolve track for a given chapter, honoring custom chapter.bgmId if specified
  const getChapterTrack = (chId: number): TrackId => {
    if (chId <= 0) return "bgm-cover";
    const ch = novel.chapters.find((c) => c.id === chId);
    return (ch?.bgmId as TrackId) || soundEngine.getDefaultTrack(chId);
  };

  // 5. Track Contextual BGM & Chapter Transition (Seamless Autoplay + Equal-Power Dissolve)
  useEffect(() => {
    if (!isMounted) return;

    // Reset mute state when chapter changes so BGM automatically starts for the new chapter
    if (prevChapterIdRef.current !== activeChapterId && activeChapterId > 0) {
      userMutedRef.current = false;
    }
    prevChapterIdRef.current = activeChapterId;

    const defaultTrack = getChapterTrack(activeChapterId);
    setBgmTitle(soundEngine.getTrack(defaultTrack).title);

    if (activeChapterId > 0 && !userMutedRef.current) {
      if (soundEngine.getIsPlaying()) {
        soundEngine.transitionToTrack(defaultTrack, 4.0);
        setAudioPlaying(true);
      } else {
        soundEngine.playWithAutoplayFallback(defaultTrack, (track) => {
          setAudioPlaying(true);
          setBgmTitle(track.title);
        });
      }
    } else if (activeChapterId === 0 && soundEngine.getIsPlaying()) {
      soundEngine.transitionToTrack(defaultTrack, 4.0);
    }
  }, [activeChapterId, isMounted]);

  // 6. Track Scroll Progress
  useEffect(() => {
    const handleScroll = () => {
      if (activeChapterId === 0) {
        setScrollProgress(0);
        return;
      }

      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight <= 0) {
        setScrollProgress(0);
        return;
      }

      const currentScroll = window.scrollY;
      const pct = (currentScroll / totalHeight) * 100;
      setScrollProgress(Math.min(100, Math.max(0, pct)));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeChapterId]);

  // 7. Select Chapter Handler (Seamless Autoplay on Chapter Selection & Mulai Baca)
  const handleSelectChapter = (id: number) => {
    setActiveChapterId(id);
    setScrollProgress(0);
    const storagePrefix = novel.slug === "tiket-pulang-paling-sunyi" ? "tiket_pulang" : `novel_${novel.slug}`;
    if (id > 0) {
      userMutedRef.current = false; // Reset mute when user explicitly chooses to read
      setLastReadChapterId(id);
      try {
        localStorage.setItem(`${storagePrefix}_last_chapter`, id.toString());
        // Also keep universal last read pointer for Homepage Resume card
        localStorage.setItem("novel_platform_last_read", JSON.stringify({
          slug: novel.slug,
          chapterId: id,
          title: novel.title,
          chapterTitle: novel.chapters.find((c) => c.id === id)?.title || `Bab ${id}`,
          timestamp: Date.now(),
        }));
      } catch (e) {
        console.warn("Could not save last chapter:", e);
      }
      window.location.hash = `#bab-${id}`;

      // Seamless autoplay on user click gesture
      const targetTrack = getChapterTrack(id);
      if (soundEngine.getIsPlaying()) {
        soundEngine.transitionToTrack(targetTrack, 4.0);
        setAudioPlaying(true);
        setBgmTitle(soundEngine.getTrack(targetTrack).title);
      } else {
        soundEngine.playWithAutoplayFallback(targetTrack, (track) => {
          setAudioPlaying(true);
          setBgmTitle(track.title);
        });
      }
    } else {
      window.location.hash = "";
    }
    window.scrollTo(0, 0);
  };

  const handleNextChapter = () => {
    if (activeChapterId < novel.chapters.length) {
      handleSelectChapter(activeChapterId + 1);
    }
  };

  const handlePrevChapter = () => {
    if (activeChapterId > 1) {
      handleSelectChapter(activeChapterId - 1);
    }
  };

  const handleGoHome = () => {
    handleSelectChapter(0);
  };

  // 8. Update Settings Handler
  const handleUpdateSettings = (newSettings: Partial<ReaderSettings>) => {
    setSettings((prev) => {
      const updated = { ...prev, ...newSettings };
      if (newSettings.audioVolume !== undefined) {
        soundEngine.setVolume(newSettings.audioVolume);
      }
      return updated;
    });
  };

  const handleIncreaseFontSize = () => {
    handleUpdateSettings({ fontSize: Math.min(26, Number((settings.fontSize + 1).toFixed(1))) });
  };

  const handleDecreaseFontSize = () => {
    handleUpdateSettings({ fontSize: Math.max(14, Number((settings.fontSize - 1).toFixed(1))) });
  };

  const handleResetSettings = () => {
    setSettings(DEFAULT_SETTINGS);
    soundEngine.setVolume(DEFAULT_SETTINGS.audioVolume);
  };

  // 9. In-Chapter Scene Waypoint Change (Audio Dissolve)
  const handleSceneChange = (trackId: TrackId) => {
    if (audioPlaying) {
      soundEngine.transitionToTrack(trackId, 4.5);
    }
    setBgmTitle(soundEngine.getTrack(trackId).title);
  };

  // 10. Audio Toggle with Contextual Track
  const handleToggleAudio = async () => {
    const defaultTrack = getChapterTrack(activeChapterId);
    if (audioPlaying) {
      soundEngine.stop();
      soundEngine.removeUnlockListeners();
      setAudioPlaying(false);
      userMutedRef.current = true;
    } else {
      userMutedRef.current = false;
      const isPlaying = await soundEngine.start(defaultTrack);
      setAudioPlaying(isPlaying);
      setBgmTitle(soundEngine.getCurrentTrackInfo().title);
    }
  };

  // 11. Modal Audio Handlers (Autoplay unlock)
  const handleEnableAudioFromModal = async () => {
    const storagePrefix = novel.slug === "tiket-pulang-paling-sunyi" ? "tiket_pulang" : `novel_${novel.slug}`;
    try {
      localStorage.setItem(`${storagePrefix}_audio_prompted`, "true");
      localStorage.setItem("tiket_pulang_audio_prompted", "true");
    } catch {
      // ignore
    }
    setIsAudioModalOpen(false);
    const defaultTrack = getChapterTrack(activeChapterId);
    const isPlaying = await soundEngine.start(defaultTrack);
    setAudioPlaying(isPlaying);
    if (isPlaying) {
      setBgmTitle(soundEngine.getCurrentTrackInfo().title);
    }
  };

  const handleDismissAudioModal = () => {
    const storagePrefix = novel.slug === "tiket-pulang-paling-sunyi" ? "tiket_pulang" : `novel_${novel.slug}`;
    try {
      localStorage.setItem(`${storagePrefix}_audio_prompted`, "true");
      localStorage.setItem("tiket_pulang_audio_prompted", "true");
    } catch {
      // ignore
    }
    setIsAudioModalOpen(false);
  };

  const currentChapter = novel.chapters.find((c) => c.id === activeChapterId);
  const activeChapterTitle = currentChapter ? currentChapter.title : "Sampul Novel";

  return (
    <div className={`min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-200 ${settings.fontFamily}`}>
      {/* 1. Reading Progress Bar */}
      {activeChapterId > 0 && <ReadingProgressBar progress={scrollProgress} />}

      {/* 2. Sticky Header */}
      <Header
        novelTitle={novel.title}
        activeChapterId={activeChapterId}
        activeChapterTitle={activeChapterTitle}
        totalChapters={novel.chapters.length}
        onOpenToc={() => setIsTocOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onGoHome={handleGoHome}
        audioPlaying={audioPlaying}
        onToggleAudio={handleToggleAudio}
        bgmTitle={bgmTitle}
        fontSize={settings.fontSize}
        onIncreaseFontSize={handleIncreaseFontSize}
        onDecreaseFontSize={handleDecreaseFontSize}
        onPrevChapter={handlePrevChapter}
        onNextChapter={handleNextChapter}
      />

      {/* 3. Main Reading Area */}
      {activeChapterId === 0 ? (
        <HeroCover
          novel={novel}
          lastReadChapterId={lastReadChapterId}
          onSelectChapter={handleSelectChapter}
          onOpenToc={() => setIsTocOpen(true)}
        />
      ) : currentChapter ? (
        <ChapterContent
          chapter={currentChapter}
          totalChapters={novel.chapters.length}
          settings={settings}
          progress={scrollProgress}
          novelSlug={novel.slug}
          onPrevChapter={handlePrevChapter}
          onNextChapter={handleNextChapter}
          onOpenToc={() => setIsTocOpen(true)}
          onGoHome={handleGoHome}
          onSceneChange={handleSceneChange}
        />
      ) : null}

      {/* 4. Table of Contents Drawer */}
      <TocDrawer
        isOpen={isTocOpen}
        onClose={() => setIsTocOpen(false)}
        chapters={novel.chapters}
        activeChapterId={activeChapterId}
        novelSlug={novel.slug}
        onSelectChapter={handleSelectChapter}
        onSelectHome={handleGoHome}
      />

      {/* 5. Typography & Theme Settings Drawer */}
      <SettingsDrawer
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        onUpdateSettings={handleUpdateSettings}
        onResetSettings={handleResetSettings}
        audioPlaying={audioPlaying}
        onToggleAudio={handleToggleAudio}
      />

      {/* 6. Mobile Floating Quick Controls */}
      <MobileBottomNav
        activeChapterId={activeChapterId}
        totalChapters={novel.chapters.length}
        progress={scrollProgress}
        onPrevChapter={handlePrevChapter}
        onNextChapter={handleNextChapter}
        onOpenToc={() => setIsTocOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />

      {/* 7. First-Visit Audio Autoplay Permission Modal */}
      <AudioPermissionModal
        isOpen={isAudioModalOpen}
        onEnableAudio={handleEnableAudioFromModal}
        onDismiss={handleDismissAudioModal}
      />

      {/* 8. Minimalist Literary Footer */}
      <footer className="mt-20 border-t border-[var(--border-subtle)] bg-[var(--bg-surface)]/60 py-10 transition-colors duration-200">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="font-serif italic text-sm sm:text-base text-[var(--text-secondary)] max-w-xl mx-auto mb-4 leading-relaxed">
            &ldquo;{novel.quote}&rdquo;
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-[var(--text-muted)]">
            <a href="/" className="hover:text-accent underline transition-colors">Perpustakaan Novel</a>
            <span>•</span>
            <span>{novel.title}</span>
            <span>•</span>
            <span>Karya Resmi {novel.author}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
