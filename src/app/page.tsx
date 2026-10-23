"use client";

import { useEffect, useState } from "react";
import { NOVEL_DATA } from "@/data/novelData";
import { ReaderSettings } from "@/types/novel";
import Header from "@/components/Header";
import ReadingProgressBar from "@/components/ReadingProgressBar";
import HeroCover from "@/components/HeroCover";
import ChapterContent from "@/components/ChapterContent";
import TocDrawer from "@/components/TocDrawer";
import SettingsDrawer from "@/components/SettingsDrawer";
import MobileBottomNav from "@/components/MobileBottomNav";
import AudioPermissionModal from "@/components/AudioPermissionModal";
import { soundEngine, TrackId, TRACK_REGISTRY, getDefaultTrackForChapter } from "@/components/SoundEngine";

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

export default function Home() {
  const [activeChapterId, setActiveChapterId] = useState<number>(0);
  const [lastReadChapterId, setLastReadChapterId] = useState<number>(1);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [isTocOpen, setIsTocOpen] = useState<boolean>(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [isAudioModalOpen, setIsAudioModalOpen] = useState<boolean>(false);
  const [audioPlaying, setAudioPlaying] = useState<boolean>(false);
  const [bgmTitle, setBgmTitle] = useState<string>("Nostalgia Senja Sidoarjo");
  const [settings, setSettings] = useState<ReaderSettings>(DEFAULT_SETTINGS);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  // 1. Initialize from localStorage and URL Hash
  useEffect(() => {
    setIsMounted(true);

    // Load Settings
    try {
      const savedSettings = localStorage.getItem("tiket_pulang_settings");
      if (savedSettings) {
        setSettings((prev) => ({ ...prev, ...JSON.parse(savedSettings) }));
      }
    } catch (e) {
      console.warn("Could not load settings:", e);
    }

    // Load Last Read Chapter
    try {
      const savedChapter = localStorage.getItem("tiket_pulang_last_chapter");
      if (savedChapter) {
        const id = parseInt(savedChapter, 10);
        if (id >= 1 && id <= NOVEL_DATA.chapters.length) {
          setLastReadChapterId(id);
        }
      }
    } catch (e) {
      console.warn("Could not load last chapter:", e);
    }

    // Check First-Visit Audio Prompt
    try {
      const audioPrompted = localStorage.getItem("tiket_pulang_audio_prompted");
      if (!audioPrompted) {
        setIsAudioModalOpen(true);
      }
    } catch {
      // ignore
    }

    // Check URL Hash
    const applyHash = () => {
      const hash = window.location.hash;
      const match = hash.match(/^#bab-(\d+)$/i);
      if (match) {
        const chapterNum = parseInt(match[1], 10);
        if (chapterNum >= 1 && chapterNum <= NOVEL_DATA.chapters.length) {
          setActiveChapterId(chapterNum);
          return;
        }
      }
      if (hash === "" || hash === "#" || hash === "#cover") {
        setActiveChapterId(0);
      }
    };

    applyHash();
    window.addEventListener("hashchange", applyHash);
    return () => window.removeEventListener("hashchange", applyHash);
  }, []);

  // 2. Apply Theme to Body / Document
  useEffect(() => {
    if (!isMounted) return;
    document.documentElement.setAttribute("data-theme", settings.theme);
    document.body.setAttribute("data-theme", settings.theme);
  }, [settings.theme, isMounted]);

  // 3. Update Document Title
  useEffect(() => {
    if (!isMounted) return;
    const currentChapter = NOVEL_DATA.chapters.find((c) => c.id === activeChapterId);
    if (activeChapterId > 0 && currentChapter) {
      document.title = `${currentChapter.number}: ${currentChapter.title} — ${NOVEL_DATA.title}`;
    } else {
      document.title = `${NOVEL_DATA.title} — Novel Karya ${NOVEL_DATA.author}`;
    }
  }, [activeChapterId, isMounted]);

  // 4. Cleanup sound on unmount
  useEffect(() => {
    return () => {
      soundEngine.stop();
    };
  }, []);

  // 5. Save Settings to localStorage
  useEffect(() => {
    if (!isMounted) return;
    try {
      localStorage.setItem("tiket_pulang_settings", JSON.stringify(settings));
    } catch (e) {
      console.warn("Could not save settings:", e);
    }
  }, [settings, isMounted]);

  // 6. Track Contextual BGM & Chapter Transition
  useEffect(() => {
    if (!isMounted) return;
    const defaultTrack = getDefaultTrackForChapter(activeChapterId);
    setBgmTitle(TRACK_REGISTRY[defaultTrack].title);
    if (audioPlaying) {
      soundEngine.transitionToTrack(defaultTrack, 5.0);
    }
  }, [activeChapterId, audioPlaying, isMounted]);

  // 7. Track Scroll Progress
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

  // 7. Select Chapter Handler
  const handleSelectChapter = (id: number) => {
    setActiveChapterId(id);
    setScrollProgress(0);
    if (id > 0) {
      setLastReadChapterId(id);
      try {
        localStorage.setItem("tiket_pulang_last_chapter", id.toString());
      } catch (e) {
        console.warn("Could not save last chapter:", e);
      }
      window.location.hash = `#bab-${id}`;
    } else {
      window.location.hash = "";
    }
    window.scrollTo(0, 0);
  };

  const handleNextChapter = () => {
    if (activeChapterId < NOVEL_DATA.chapters.length) {
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

  // 9. In-Chapter Scene Waypoint Change
  const handleSceneChange = (trackId: TrackId) => {
    if (audioPlaying) {
      soundEngine.transitionToTrack(trackId, 5.0);
    }
    setBgmTitle(TRACK_REGISTRY[trackId].title);
  };

  // 10. Audio Toggle with Contextual Track
  const handleToggleAudio = async () => {
    const defaultTrack = getDefaultTrackForChapter(activeChapterId);
    const isPlaying = await soundEngine.toggle(activeChapterId, defaultTrack);
    setAudioPlaying(isPlaying);
    setBgmTitle(soundEngine.getCurrentTrackInfo().title);
  };

  // 11. Modal Audio Handlers (Autoplay unlock)
  const handleEnableAudioFromModal = async () => {
    try {
      localStorage.setItem("tiket_pulang_audio_prompted", "true");
    } catch {
      // ignore
    }
    setIsAudioModalOpen(false);
    const defaultTrack = getDefaultTrackForChapter(activeChapterId);
    const isPlaying = await soundEngine.start(defaultTrack);
    setAudioPlaying(isPlaying);
    if (isPlaying) {
      setBgmTitle(TRACK_REGISTRY[defaultTrack].title);
    }
  };

  const handleDismissAudioModal = () => {
    try {
      localStorage.setItem("tiket_pulang_audio_prompted", "true");
    } catch {
      // ignore
    }
    setIsAudioModalOpen(false);
  };

  // 10. Drawer Toggles with mutual exclusion
  const handleOpenToc = () => {
    setIsTocOpen(true);
    setIsSettingsOpen(false);
  };

  const handleOpenSettings = () => {
    setIsSettingsOpen(true);
    setIsTocOpen(false);
  };

  // 11. Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is interacting with form elements or drawers are open
      if (["INPUT", "TEXTAREA", "SELECT"].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }
      if (isTocOpen || isSettingsOpen) {
        return;
      }

      // Next Chapter (ArrowRight or n or ])
      if ((e.key === "ArrowRight" || e.key === "n" || e.key === "]") && activeChapterId > 0 && activeChapterId < NOVEL_DATA.chapters.length) {
        e.preventDefault();
        handleNextChapter();
      }

      // Prev Chapter (ArrowLeft or p or [)
      if ((e.key === "ArrowLeft" || e.key === "p" || e.key === "[") && activeChapterId > 1) {
        e.preventDefault();
        handlePrevChapter();
      }

      // Font Size Increase (+ or =)
      if (e.key === "+" || e.key === "=") {
        e.preventDefault();
        handleIncreaseFontSize();
      }

      // Font Size Decrease (- or _)
      if (e.key === "-" || e.key === "_") {
        e.preventDefault();
        handleDecreaseFontSize();
      }

      // Toggle Table of Contents (m)
      if (e.key === "m" || e.key === "M") {
        e.preventDefault();
        handleOpenToc();
      }

      // Toggle Settings (a or t)
      if (e.key === "a" || e.key === "A" || e.key === "t" || e.key === "T") {
        e.preventDefault();
        handleOpenSettings();
      }

      // Go Home (h)
      if (e.key === "h" || e.key === "H") {
        e.preventDefault();
        handleGoHome();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeChapterId, settings.fontSize, isTocOpen, isSettingsOpen]);

  const activeChapter = NOVEL_DATA.chapters.find((c) => c.id === activeChapterId);

  return (
    <div className="min-h-screen flex flex-col font-sans transition-colors duration-200">
      {/* Top Reading Progress Bar */}
      <ReadingProgressBar progress={scrollProgress} />

      {/* Main Header */}
      <Header
        activeChapterId={activeChapterId}
        activeChapterTitle={activeChapter ? `${activeChapter.number}: ${activeChapter.title}` : "Sinopsis"}
        totalChapters={NOVEL_DATA.chapters.length}
        onOpenToc={handleOpenToc}
        onOpenSettings={handleOpenSettings}
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

      {/* Main View Area */}
      <div className="flex-1 pb-16 sm:pb-8">
        {activeChapterId === 0 || !activeChapter ? (
          <HeroCover
            novel={NOVEL_DATA}
            lastReadChapterId={lastReadChapterId}
            onSelectChapter={handleSelectChapter}
            onOpenToc={handleOpenToc}
          />
        ) : (
          <ChapterContent
            chapter={activeChapter}
            totalChapters={NOVEL_DATA.chapters.length}
            settings={settings}
            progress={scrollProgress}
            onPrevChapter={handlePrevChapter}
            onNextChapter={handleNextChapter}
            onOpenToc={handleOpenToc}
            onGoHome={handleGoHome}
            onSceneChange={handleSceneChange}
          />
        )}
        {/* Audio Autoplay Permission Modal */}
      <AudioPermissionModal
        isOpen={isAudioModalOpen}
        onEnableAudio={handleEnableAudioFromModal}
        onDismiss={handleDismissAudioModal}
      />
    </div>

      {/* Table of Contents Drawer */}
      <TocDrawer
        isOpen={isTocOpen}
        onClose={() => setIsTocOpen(false)}
        chapters={NOVEL_DATA.chapters}
        activeChapterId={activeChapterId}
        onSelectChapter={handleSelectChapter}
        onSelectHome={handleGoHome}
      />

      {/* Settings Drawer */}
      <SettingsDrawer
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        onUpdateSettings={handleUpdateSettings}
        onResetSettings={handleResetSettings}
        audioPlaying={audioPlaying}
        onToggleAudio={handleToggleAudio}
      />

      {/* Mobile Sticky Bottom Navigation */}
      <MobileBottomNav
        activeChapterId={activeChapterId}
        totalChapters={NOVEL_DATA.chapters.length}
        progress={scrollProgress}
        onPrevChapter={handlePrevChapter}
        onNextChapter={handleNextChapter}
        onOpenToc={handleOpenToc}
        onOpenSettings={handleOpenSettings}
      />

      {/* Footer */}
      <footer className={`mt-auto border-t border-[var(--border-subtle)] py-10 px-4 text-center text-xs text-[var(--text-muted)] bg-[var(--bg-card)]/40 ${activeChapterId > 0 ? "mb-14 sm:mb-0" : ""}`}>
        <div className="max-w-xl mx-auto space-y-2.5 font-serif">
          <p className="italic text-sm text-[var(--text-secondary)] leading-relaxed">
            &ldquo;Perjalanan mencari nafkah telah usai. Namun di atas segalanya, janji suci seorang suami telah tertunaikan.&rdquo;
          </p>
          <p className="font-ui text-[11px] text-[var(--text-muted)] tracking-wider uppercase">
            Tiket Pulang Paling Sunyi &bull; 2026 &bull; Seluruh Hak Cipta Dilindungi
          </p>
        </div>
      </footer>

      {/* Audio Autoplay Permission Modal */}
      <AudioPermissionModal
        isOpen={isAudioModalOpen}
        onEnableAudio={handleEnableAudioFromModal}
        onDismiss={handleDismissAudioModal}
      />
    </div>
  );
}
