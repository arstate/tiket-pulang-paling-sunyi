"use client";

interface MobileBottomNavProps {
  activeChapterId: number;
  totalChapters: number;
  progress: number;
  onPrevChapter: () => void;
  onNextChapter: () => void;
  onOpenToc: () => void;
  onOpenSettings: () => void;
}

export default function MobileBottomNav({
  activeChapterId,
  totalChapters,
  progress,
  onPrevChapter,
  onNextChapter,
  onOpenToc,
  onOpenSettings,
}: MobileBottomNavProps) {
  // Only display on mobile when inside a chapter
  if (activeChapterId === 0) return null;

  return (
    <nav className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-[var(--bg-card)]/95 backdrop-blur-md border-t border-[var(--border-subtle)] px-3 py-2 shadow-floating transition-transform duration-200">
      <div className="flex items-center justify-between gap-1.5 max-w-md mx-auto">
        {/* Prev Chapter */}
        <button
          onClick={onPrevChapter}
          disabled={activeChapterId <= 1}
          className="p-2 rounded-lg text-xs font-medium text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] disabled:opacity-30 disabled:pointer-events-none transition-colors"
          aria-label="Bab Sebelumnya"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>

        {/* Center Pill: Chapter & Progress */}
        <button
          onClick={onOpenToc}
          className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-full bg-[var(--bg-surface)] border border-[var(--border-medium)] text-xs font-medium text-[var(--text-primary)] truncate"
        >
          <span className="truncate">Bab {activeChapterId}</span>
          <span className="text-[var(--text-muted)]">•</span>
          <span className="text-accent font-semibold">{Math.round(progress)}%</span>
        </button>

        {/* Quick Settings */}
        <button
          onClick={onOpenSettings}
          className="p-2 rounded-lg text-xs font-medium text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] transition-colors"
          aria-label="Pengaturan Tampilan"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="4 7 4 4 20 4 20 7"></polyline>
            <line x1="9" y1="20" x2="15" y2="20"></line>
            <line x1="12" y1="4" x2="12" y2="20"></line>
          </svg>
        </button>

        {/* Next Chapter */}
        <button
          onClick={onNextChapter}
          disabled={activeChapterId >= totalChapters}
          className="p-2 rounded-lg text-xs font-medium text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] disabled:opacity-30 disabled:pointer-events-none transition-colors"
          aria-label="Bab Selanjutnya"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </div>
    </nav>
  );
}
