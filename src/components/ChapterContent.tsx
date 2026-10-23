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
      {/* Chapter Title & Meta Header (Clean, distraction-free) */}
      <header className="mb-10 sm:mb-12 text-center border-b border-[var(--border-subtle)] pb-8">
        <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-accent-light text-accent-hover mb-4">
          {chapter.number}
        </div>
        <h1 className="text-2xl sm:text-4xl font-bold font-ui text-[var(--text-primary)] tracking-tight mb-3">
          {chapter.title}
        </h1>
        <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-[var(--text-muted)] font-ui">
          <span>{chapter.wordCount.toLocaleString("id-ID")} kata</span>
          <span>•</span>
          <span>±{chapter.readTimeMinutes} menit waktu baca</span>
        </div>
      </header>

      {/* Novel Body Text */}
      <div
        className={`reading-prose space-y-6 ${getFontFamilyClass()} ${getLineHeightClass()}`}
        style={{
          fontSize: `${settings.fontSize}px`,
        }}
      >
        {chapter.paragraphs.map((item: ParagraphItem, index: number) => {
          // Bab 10 drop-cap handling: only first narrative prose paragraph
          const isDropCap = index === firstNarrativeIndex && item.type === "paragraph";

          if (item.type === "dialogue") {
            return (
              <p
                key={index}
                className="dialogue-para text-[var(--text-primary)] transition-colors"
                dangerouslySetInnerHTML={{ __html: item.html || item.content || "" }}
              />
            );
          }

          if (item.type === "break" || item.type === "divider") {
            return (
              <div key={index} className="py-6 flex items-center justify-center gap-2 text-[var(--text-muted)] opacity-60">
                <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
              </div>
            );
          }

          return (
            <p
              key={index}
              className={`prose-para text-[var(--text-primary)] transition-colors ${
                isDropCap ? "drop-cap" : ""
              }`}
              dangerouslySetInnerHTML={{ __html: item.html || item.content || "" }}
            />
          );
        })}
      </div>

      {/* Chapter End Navigation (Only at the end of the chapter where reader actually needs it) */}
      <nav className="mt-14 sm:mt-16 pt-8 border-t border-[var(--border-subtle)]" aria-label="Navigasi akhir bab">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 font-ui">
          {chapter.id > 1 ? (
            <button
              onClick={onPrevChapter}
              className="group flex flex-col items-start p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] hover:border-accent hover:shadow-card transition-all text-left"
            >
              <span className="text-[11px] uppercase tracking-wider text-[var(--text-muted)] flex items-center gap-1 group-hover:text-accent transition-colors">
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
                Bab Sebelumnya
              </span>
              <span className="font-semibold text-sm text-[var(--text-primary)] mt-1 group-hover:text-accent transition-colors">
                Bab {chapter.id - 1}
              </span>
            </button>
          ) : (
            <button
              onClick={onGoHome}
              className="group flex flex-col items-start p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] hover:border-accent hover:shadow-card transition-all text-left"
            >
              <span className="text-[11px] uppercase tracking-wider text-[var(--text-muted)] flex items-center gap-1 group-hover:text-accent transition-colors">
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
                Halaman Depan
              </span>
              <span className="font-semibold text-sm text-[var(--text-primary)] mt-1 group-hover:text-accent transition-colors">
                Sampul & Sinopsis
              </span>
            </button>
          )}

          {chapter.id < totalChapters ? (
            <button
              onClick={onNextChapter}
              className="group flex flex-col items-end p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] hover:border-accent hover:shadow-card transition-all text-right sm:col-start-2"
            >
              <span className="text-[11px] uppercase tracking-wider text-[var(--text-muted)] flex items-center gap-1 group-hover:text-accent transition-colors">
                Bab Selanjutnya
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </span>
              <span className="font-semibold text-sm text-[var(--text-primary)] mt-1 group-hover:text-accent transition-colors">
                Bab {chapter.id + 1}
              </span>
            </button>
          ) : (
            <button
              onClick={onGoHome}
              className="group flex flex-col items-end p-4 rounded-xl border border-accent/40 bg-accent-light/30 hover:border-accent hover:shadow-card transition-all text-right sm:col-start-2"
            >
              <span className="text-[11px] uppercase tracking-wider text-accent flex items-center gap-1">
                Selesai Membaca
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </span>
              <span className="font-semibold text-sm text-[var(--text-primary)] mt-1">
                Kembali ke Halaman Sampul
              </span>
            </button>
          )}
        </div>
      </nav>
    </article>
  );
}
