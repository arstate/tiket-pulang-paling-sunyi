"use client";

interface HeaderProps {
  activeChapterId: number;
  activeChapterTitle: string;
  totalChapters: number;
  onOpenToc: () => void;
  onOpenSettings: () => void;
  onGoHome: () => void;
  audioPlaying: boolean;
  onToggleAudio: () => void;
  fontSize: number;
  onIncreaseFontSize: () => void;
  onDecreaseFontSize: () => void;
  onPrevChapter: () => void;
  onNextChapter: () => void;
}

export default function Header({
  activeChapterId,
  activeChapterTitle,
  totalChapters,
  onOpenToc,
  onOpenSettings,
  onGoHome,
  audioPlaying,
  onToggleAudio,
  fontSize,
  onIncreaseFontSize,
  onDecreaseFontSize,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[var(--bg-primary)]/90 border-b border-[var(--border-subtle)] transition-colors duration-200">
      <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between gap-3">
        {/* Left: Brand / Home */}
        <button
          onClick={onGoHome}
          className="flex items-center gap-2.5 group text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-lg px-2 py-1 -ml-2 transition-colors hover:bg-[var(--bg-hover)]"
          title="Kembali ke Sinopsis / Sampul (H)"
          aria-label="Kembali ke Sinopsis"
        >
          <div className="w-8 h-8 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-medium)] flex items-center justify-center text-accent group-hover:border-accent transition-colors flex-shrink-0">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"></path>
              <path d="M6 6h10"></path>
              <path d="M6 10h10"></path>
            </svg>
          </div>
          <div>
            <span className="font-semibold text-sm tracking-tight text-[var(--text-primary)] block leading-tight">
              Tiket Pulang Paling Sunyi
            </span>
            <span className="text-[10px] text-[var(--text-muted)] tracking-wider uppercase block -mt-0.5">
              Bachtiar Aryansyah Putra
            </span>
          </div>
        </button>

        {/* Right Actions: 3 Clean, Non-Duplicated Controls */}
        <div className="flex items-center gap-1 sm:gap-1.5 flex-shrink-0">
          {/* Quick Font Size Stepper (Desktop/Tablet) */}
          <div className="hidden md:flex items-center rounded-lg bg-[var(--bg-surface)] border border-[var(--border-subtle)] p-0.5">
            <button
              onClick={onDecreaseFontSize}
              className="w-7 h-7 rounded flex items-center justify-center font-serif text-xs font-bold text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] transition-colors"
              title="Perkecil Huruf (A-)"
              aria-label="Perkecil Huruf"
            >
              A−
            </button>
            <span className="text-[11px] font-semibold text-accent px-1.5 tabular-nums">
              {fontSize}
            </span>
            <button
              onClick={onIncreaseFontSize}
              className="w-7 h-7 rounded flex items-center justify-center font-serif text-xs font-bold text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] transition-colors"
              title="Perbesar Huruf (A+)"
              aria-label="Perbesar Huruf"
            >
              A+
            </button>
          </div>

          {/* Ambient Audio */}
          <button
            onClick={onToggleAudio}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
              audioPlaying
                ? "bg-accent/15 border-accent text-accent"
                : "bg-[var(--bg-surface)] border-[var(--border-subtle)] text-[var(--text-secondary)] hover:bg-[var(--bg-hover)]"
            }`}
            title={audioPlaying ? "Hentikan Suara Hujan & Kereta" : "Putar Suara Hujan & Kereta Malam"}
            aria-label="Suara Hujan & Kereta"
          >
            <svg className={`w-4 h-4 ${audioPlaying ? "animate-pulse" : ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"></path>
              <path d="M16 14v6"></path>
              <path d="M8 14v6"></path>
              <path d="M12 16v6"></path>
            </svg>
            <span className="hidden lg:inline">{audioPlaying ? "Hujan Aktif" : "Suara Hujan"}</span>
          </button>

          {/* Settings Drawer Trigger (Single Source of Settings) */}
          <button
            onClick={onOpenSettings}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-[var(--bg-surface)] border border-[var(--border-subtle)] hover:bg-[var(--bg-hover)] text-[var(--text-secondary)] transition-colors"
            title="Pengaturan Tampilan & Huruf (A)"
            aria-label="Pengaturan Tampilan"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="4 7 4 4 20 4 20 7"></polyline>
              <line x1="9" y1="20" x2="15" y2="20"></line>
              <line x1="12" y1="4" x2="12" y2="20"></line>
            </svg>
            <span className="hidden sm:inline">Huruf</span>
          </button>

          {/* Table of Contents Drawer Trigger (Single Source of TOC) */}
          <button
            onClick={onOpenToc}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-[var(--bg-surface)] border border-[var(--border-subtle)] hover:bg-[var(--bg-hover)] text-[var(--text-secondary)] transition-colors"
            title="Daftar Isi Bab (M)"
            aria-label="Daftar Isi"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="8" y1="6" x2="21" y2="6"></line>
              <line x1="8" y1="12" x2="21" y2="12"></line>
              <line x1="8" y1="18" x2="21" y2="18"></line>
              <line x1="3" y1="6" x2="3.01" y2="6"></line>
              <line x1="3" y1="12" x2="3.01" y2="12"></line>
              <line x1="3" y1="18" x2="3.01" y2="18"></line>
            </svg>
            <span className="hidden sm:inline">Daftar Bab</span>
          </button>
        </div>
      </div>
    </header>
  );
}
