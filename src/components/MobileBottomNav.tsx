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
}: MobileBottomNavProps) {
  // Only display on mobile when inside a chapter
  if (activeChapterId === 0) return null;

  return (
    <nav className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-[var(--bg-card)]/95 backdrop-blur-md border-t border-[var(--border-subtle)] px-3 py-2 shadow-floating transition-transform duration-200">
      <div className="flex items-center justify-between gap-2 max-w-md mx-auto">
        {/* Prev Chapter */}
        <button
          onClick={onPrevChapter}
          disabled={activeChapterId <= 1}
          className="flex items-center gap-1 py-1.5 px-3 rounded-lg text-xs font-medium text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] disabled:opacity-25 disabled:pointer-events-none transition-colors"
          aria-label="Bab Sebelumnya"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
          <span>Prev</span>
        </button>

        {/* Center: Reading Progress Status (Informational only, zero duplicate actions) */}
        <div className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 text-xs font-medium text-[var(--text-muted)] truncate">
          <span className="font-semibold text-[var(--text-primary)]">Bab {activeChapterId} dari {totalChapters}</span>
          <span>•</span>
          <span className="text-accent font-bold tabular-nums">{Math.round(progress)}%</span>
        </div>

        {/* Next Chapter */}
        <button
          onClick={onNextChapter}
          disabled={activeChapterId >= totalChapters}
          className="flex items-center gap-1 py-1.5 px-3 rounded-lg text-xs font-medium text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] disabled:opacity-25 disabled:pointer-events-none transition-colors"
          aria-label="Bab Selanjutnya"
        >
          <span>Next</span>
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </div>
    </nav>
  );
}
