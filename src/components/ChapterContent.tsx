"use client";

import { Chapter, ParagraphItem, ReaderSettings } from "@/types/novel";
import { useRef } from "react";

interface ChapterContentProps {
  chapter: Chapter;
  totalChapters: number;
  settings: ReaderSettings;
  progress: number;
  onPrevChapter: () => void;
  onNextChapter: () => void;
  onOpenToc: () => void;
  onGoHome: () => void;
}

export default function ChapterContent({
  chapter,
  totalChapters,
  settings,
  progress,
  onPrevChapter,
  onNextChapter,
  onOpenToc,
  onGoHome,
}: ChapterContentProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Map settings to font styles
  const getFontFamilyClass = () => {
    switch (settings.fontFamily) {
      case "lora":
        return "font-lora";
      case "georgia":
        return "font-georgia";
      case "merriweather":
      default:
        return "font-serif";
    }
  };

  const getLineHeightClass = () => {
    switch (settings.lineHeight) {
      case "compact":
        return "leading-[1.6]";
      case "loose":
        return "leading-[2.1]";
      case "comfortable":
      default:
        return "leading-[1.85]";
    }
  };

  const getMaxWidthClass = () => {
    switch (settings.pageWidth) {
      case "narrow":
        return "max-w-[640px]";
      case "wide":
        return "max-w-[840px]";
      case "standard":
      default:
        return "max-w-[720px]";
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const firstNarrativeIndex = chapter.paragraphs.findIndex((p) => p.type === "paragraph");

  return (
    <article
      ref={containerRef}
      className={`mx-auto px-4 sm:px-6 py-8 sm:py-12 transition-all duration-200 ${getMaxWidthClass()}`}
    >
      {/* Chapter Top Navigation & Badge */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-[var(--border-subtle)] text-xs text-[var(--text-muted)] gap-2">
        <div className="flex items-center gap-1.5">
          <button
            onClick={onGoHome}
            className="hover:text-accent flex items-center gap-1 transition-colors px-2 py-1 rounded-md hover:bg-[var(--bg-surface)]"
            title="Kembali ke Sinopsis"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
            <span className="hidden sm:inline">Sinopsis</span>
          </button>

          {chapter.id > 1 && (
            <button
              onClick={onPrevChapter}
              className="hover:text-accent flex items-center gap-1 transition-colors px-2 py-1 rounded-md hover:bg-[var(--bg-surface)]"
              title="Bab Sebelumnya"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
              <span className="hidden md:inline">Bab {chapter.id - 1}</span>
            </button>
          )}
        </div>

        <div className="flex items-center gap-2">
          <span className="font-medium text-[var(--text-secondary)]">{chapter.number} dari {totalChapters}</span>
          <span className="inline-block w-1 h-1 rounded-full bg-[var(--text-muted)] opacity-60"></span>
          <span>{Math.round(progress)}% Selesai</span>
        </div>

        <div className="flex items-center gap-1.5">
          {chapter.id < totalChapters && (
            <button
              onClick={onNextChapter}
              className="hover:text-accent flex items-center gap-1 transition-colors px-2 py-1 rounded-md hover:bg-[var(--bg-surface)]"
              title="Bab Selanjutnya"
            >
              <span className="hidden md:inline">Bab {chapter.id + 1}</span>
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
          )}

          <button
            onClick={onOpenToc}
            className="hover:text-accent flex items-center gap-1 transition-colors px-2 py-1 rounded-md hover:bg-[var(--bg-surface)]"
            title="Buka Daftar Bab"
          >
            <span>Daftar Bab</span>
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="8" y1="6" x2="21" y2="6"></line>
              <line x1="8" y1="12" x2="21" y2="12"></line>
              <line x1="8" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>

      {/* Chapter Title Header */}
      <header className="mb-10 sm:mb-14 text-center">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-[var(--bg-surface)] text-accent border border-[var(--border-subtle)] mb-3">
          {chapter.number}
        </span>
        <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-[var(--text-primary)] leading-tight mb-4 font-sans">
          {chapter.title}
        </h1>
        <div className="flex items-center justify-center gap-3 text-xs sm:text-sm text-[var(--text-muted)]">
          <span>{chapter.wordCount.toLocaleString("id-ID")} kata</span>
          <span>•</span>
          <span>±{chapter.readTimeMinutes} menit waktu baca</span>
        </div>
      </header>

      {/* Novel Reading Body */}
      <div
        className={`novel-reading-body text-[var(--text-primary)] transition-all ${getFontFamilyClass()} ${getLineHeightClass()}`}
        style={{
          fontSize: `${settings.fontSize}px`,
          textAlign: settings.textAlign,
        }}
      >
        {chapter.paragraphs.map((item: ParagraphItem, index: number) => {
          if (item.type === "break" || item.type === "divider") {
            return (
              <div key={index} className="scene-break" aria-hidden="true">
                {item.content || "✦ ✦ ✦"}
              </div>
            );
          }

          if (item.type === "quote") {
            return (
              <blockquote
                key={index}
                className="my-6 pl-4 border-l-4 border-accent italic text-[var(--text-secondary)] bg-[var(--bg-surface)]/60 py-3 pr-3 rounded-r-lg"
                dangerouslySetInnerHTML={{ __html: item.html || item.content || "" }}
              />
            );
          }

          if (item.type === "dialogue") {
            return (
              <p
                key={index}
                className="dialogue-para text-[var(--text-primary)]"
                dangerouslySetInnerHTML={{ __html: item.html || item.content || "" }}
              />
            );
          }

          // Narrative paragraph drop-cap effect
          if (index === firstNarrativeIndex) {
            return (
              <p
                key={index}
                className="drop-cap"
                dangerouslySetInnerHTML={{ __html: item.html || item.content || "" }}
              />
            );
          }

          return (
            <p
              key={index}
              dangerouslySetInnerHTML={{ __html: item.html || item.content || "" }}
            />
          );
        })}
      </div>

      {/* Chapter Completion Card */}
      <section className="mt-14 sm:mt-20 p-6 sm:p-8 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] text-center shadow-card">
        <div className="w-10 h-10 mx-auto mb-3 rounded-full bg-accent/15 text-accent flex items-center justify-center">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
        <h3 className="font-bold text-lg sm:text-xl text-[var(--text-primary)] mb-1">
          {chapter.id === totalChapters
            ? "Kamu Telah Menyelesaikan Seluruh Novel Ini"
            : `Selesai Membaca ${chapter.number}`}
        </h3>
        <p className="text-xs sm:text-sm text-[var(--text-secondary)] mb-6 max-w-md mx-auto">
          {chapter.id === totalChapters
            ? "Terima kasih telah menemani perjalanan Danu & Fira sampai stasiun terakhir takdir."
            : `Lanjutkan perjalanan Danu & Fira di Bab ${chapter.id + 1} atau kembali ke daftar bab.`}
        </p>

        {/* Prev / Next Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          {chapter.id > 1 && (
            <button
              onClick={onPrevChapter}
              className="w-full sm:w-auto px-5 py-3 rounded-xl font-medium text-sm bg-[var(--bg-surface)] hover:bg-[var(--bg-hover)] text-[var(--text-secondary)] border border-[var(--border-medium)] transition-colors flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
              <span>Bab Sebelumnya</span>
            </button>
          )}

          {chapter.id < totalChapters ? (
            <button
              onClick={onNextChapter}
              className="w-full sm:w-auto px-6 py-3 rounded-xl font-semibold text-sm bg-accent text-[var(--accent-contrast)] hover:bg-accent-hover shadow-md transition-all flex items-center justify-center gap-2 group"
            >
              <span>Lanjut ke Bab {chapter.id + 1}</span>
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
          ) : (
            <button
              onClick={onGoHome}
              className="w-full sm:w-auto px-6 py-3 rounded-xl font-semibold text-sm bg-accent text-[var(--accent-contrast)] hover:bg-accent-hover shadow-md transition-all flex items-center justify-center gap-2"
            >
              <span>Kembali ke Halaman Sampul</span>
            </button>
          )}

          <button
            onClick={scrollToTop}
            className="w-full sm:w-auto px-4 py-3 rounded-xl font-medium text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface)] transition-colors flex items-center justify-center gap-1.5"
            title="Gulir ke Atas Bab"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="19" x2="12" y2="5"></line>
              <polyline points="5 12 12 5 19 12"></polyline>
            </svg>
            <span>Ke Atas</span>
          </button>
        </div>
      </section>
    </article>
  );
}
