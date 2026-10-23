"use client";

import { Chapter } from "@/types/novel";
import { useEffect } from "react";

interface TocDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  chapters: Chapter[];
  activeChapterId: number;
  onSelectChapter: (id: number) => void;
  onSelectHome: () => void;
}

export default function TocDrawer({
  isOpen,
  onClose,
  chapters,
  activeChapterId,
  onSelectChapter,
  onSelectHome,
}: TocDrawerProps) {
  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const totalWords = chapters.reduce((sum, ch) => sum + ch.wordCount, 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end animate-fadeIn">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer Panel */}
      <aside
        className="relative z-10 w-full max-w-md bg-[var(--bg-card)] border-l border-[var(--border-subtle)] h-full flex flex-col shadow-floating overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-label="Daftar Isi Novel"
      >
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-[var(--border-subtle)] flex items-center justify-between bg-[var(--bg-surface)]/50">
          <div>
            <h2 className="font-bold text-base sm:text-lg text-[var(--text-primary)]">
              Daftar Isi
            </h2>
            <p className="text-xs text-[var(--text-muted)]">
              {chapters.length} Bab Lengkap • {totalWords.toLocaleString("id-ID")} Kata
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] transition-colors"
            aria-label="Tutup Daftar Isi (Esc)"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Chapter List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
          {/* Catalog Link */}
          <a
            href="/"
            className="w-full text-left p-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] hover:bg-[var(--bg-hover)] text-[var(--text-muted)] hover:text-accent transition-all flex items-center justify-between group"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-[var(--bg-card)] border border-[var(--border-medium)] flex items-center justify-center text-[var(--text-muted)] group-hover:text-accent">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m15 18-6-6 6-6"/>
                </svg>
              </div>
              <div>
                <span className="text-xs uppercase tracking-wider block text-[var(--text-muted)]">Perpustakaan</span>
                <span className="text-sm font-medium text-[var(--text-primary)] group-hover:text-accent">Katalog Pentalogi Semesta</span>
              </div>
            </div>
            <span className="text-[11px] text-[var(--text-muted)] font-medium">5 Buku</span>
          </a>

          {/* Cover / Home option */}
          <button
            onClick={() => {
              onSelectHome();
              onClose();
            }}
            className={`w-full text-left p-3 rounded-xl border transition-all flex items-center justify-between ${
              activeChapterId === 0
                ? "bg-accent/10 border-accent text-accent font-semibold"
                : "bg-[var(--bg-surface)] border-[var(--border-subtle)] hover:border-[var(--border-medium)] text-[var(--text-primary)]"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-[var(--bg-card)] border border-[var(--border-medium)] flex items-center justify-center text-accent">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"></path>
                </svg>
              </div>
              <div>
                <span className="text-xs uppercase tracking-wider block text-[var(--text-muted)]">Sampul</span>
                <span className="text-sm font-medium">Halaman Utama & Sinopsis</span>
              </div>
            </div>
            {activeChapterId === 0 && (
              <span className="text-[11px] font-semibold text-accent px-2 py-0.5 rounded-full bg-accent/15">
                Aktif
              </span>
            )}
          </button>

          {/* 10 Chapters */}
          {chapters.map((ch: Chapter) => {
            const isActive = activeChapterId === ch.id;
            return (
              <button
                key={ch.id}
                onClick={() => {
                  onSelectChapter(ch.id);
                  onClose();
                }}
                className={`w-full text-left p-3.5 rounded-xl border transition-all flex flex-col justify-between ${
                  isActive
                    ? "bg-accent/10 border-accent text-[var(--text-primary)] shadow-sm"
                    : "bg-[var(--bg-surface)] border-[var(--border-subtle)] hover:border-[var(--border-medium)] text-[var(--text-primary)]"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-xs font-semibold tracking-wider uppercase ${isActive ? "text-accent" : "text-[var(--text-muted)]"}`}>
                    {ch.number}
                  </span>
                  <span className="text-[11px] text-[var(--text-muted)]">
                    {ch.readTimeMinutes} mnt
                  </span>
                </div>
                <h3 className={`font-semibold text-sm mb-1 ${isActive ? "text-accent font-bold" : "text-[var(--text-primary)]"}`}>
                  {ch.title}
                </h3>
                <p className="text-xs text-[var(--text-secondary)] line-clamp-1 font-serif">
                  {ch.excerpt}
                </p>
                <div className="flex items-center justify-between mt-2 pt-2 border-t border-[var(--border-subtle)]/70 text-[11px] text-[var(--text-muted)]">
                  <span>{ch.wordCount.toLocaleString("id-ID")} kata</span>
                  {isActive && (
                    <span className="text-accent font-semibold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse"></span>
                      Sedang Dibaca
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Drawer Footer */}
        <div className="p-3 border-t border-[var(--border-subtle)] text-center text-xs text-[var(--text-muted)] bg-[var(--bg-surface)]/50">
          Gunakan tombol <kbd className="px-1.5 py-0.5 rounded bg-[var(--bg-card)] border border-[var(--border-subtle)] text-[10px]">M</kbd> atau <kbd className="px-1.5 py-0.5 rounded bg-[var(--bg-card)] border border-[var(--border-subtle)] text-[10px]">Esc</kbd>
        </div>
      </aside>
    </div>
  );
}
