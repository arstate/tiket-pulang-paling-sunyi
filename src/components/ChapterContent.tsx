"use client";

import { Chapter, ParagraphItem, ReaderSettings } from "@/types/novel";
import { TrackId, getDefaultTrackForChapter } from "./SoundEngine";
import { useRef, useEffect } from "react";
import React from "react";

interface ChapterContentProps {
  chapter: Chapter;
  totalChapters: number;
  settings: ReaderSettings;
  progress: number;
  novelSlug?: string;
  onPrevChapter: () => void;
  onNextChapter: () => void;
  onOpenToc: () => void;
  onGoHome: () => void;
  onSceneChange?: (trackId: TrackId) => void;
}

const NEXT_BOOK_MAP: Record<string, { slug: string; title: string; label: string }> = {
  "sebelum-kereta-ke-jogja": {
    slug: "buket-bunga-dan-toga",
    title: "Lanjut Buku 2: Buket Bunga dan Toga",
    label: "Episode 2 Berikutnya",
  },
  "buket-bunga-dan-toga": {
    slug: "di-balik-pintu-agensi",
    title: "Lanjut Buku 3: Di Balik Pintu Agensi",
    label: "Episode 3 Berikutnya",
  },
  "di-balik-pintu-agensi": {
    slug: "cincin-dan-jeratan-42-juta",
    title: "Lanjut Buku 4: Cincin & Jeratan 42 Juta",
    label: "Episode 4 Berikutnya",
  },
  "cincin-dan-jeratan-42-juta": {
    slug: "tiket-pulang-paling-sunyi",
    title: "Lanjut Buku 5: Tiket Pulang Paling Sunyi",
    label: "Puncak Tragedi (Master Piece)",
  },
  "tiket-pulang-paling-sunyi": {
    slug: "sebelum-kereta-ke-jogja",
    title: "Kembali ke Buku 1: Sebelum Kereta ke Jogja",
    label: "Awal Mula Pertemuan",
  },
};

export default function ChapterContent({
  chapter,
  totalChapters,
  settings,
  progress,
  novelSlug = "tiket-pulang-paling-sunyi",
  onPrevChapter,
  onNextChapter,
  onOpenToc,
  onGoHome,
  onSceneChange,
}: ChapterContentProps) {
  const nextBookInfo = NEXT_BOOK_MAP[novelSlug] || NEXT_BOOK_MAP["tiket-pulang-paling-sunyi"];
  const containerRef = useRef<HTMLDivElement>(null);

  // In-Chapter Scene Waypoint Observer for Adaptive BGM
  useEffect(() => {
    if (!onSceneChange) return;

    // Immediately sync to default track for chapter on mount / chapter change
    onSceneChange(getDefaultTrackForChapter(chapter.id));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const trackId = entry.target.getAttribute("data-track-id") as TrackId | null;
            if (trackId) {
              onSceneChange(trackId);
            }
          }
        });
      },
      {
        rootMargin: "-15% 0px -65% 0px",
        threshold: 0,
      }
    );

    const waypoints = containerRef.current?.querySelectorAll(".scene-waypoint");
    waypoints?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [chapter.id, onSceneChange]);

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
        {/* Initial Chapter Waypoint */}
        <div
          className="scene-waypoint h-0 w-full pointer-events-none opacity-0"
          data-track-id={getDefaultTrackForChapter(chapter.id)}
        />

        {chapter.paragraphs.map((item: ParagraphItem, index: number) => {
          // Bab 10 drop-cap handling: only first narrative prose paragraph
          const isDropCap = index === firstNarrativeIndex && item.type === "paragraph";

          // Dynamic Intra-Chapter Scene Break Waypoints
          let midSceneWaypoint = null;
          if (chapter.id === 1 && index === 15) {
            midSceneWaypoint = (
              <div
                key="wp-ch1b"
                className="scene-waypoint h-0 w-full pointer-events-none opacity-0 my-0"
                data-track-id="bgm-ch1b"
              />
            );
          } else if (chapter.id === 2 && index === 15) {
            midSceneWaypoint = (
              <div
                key="wp-ch2b"
                className="scene-waypoint h-0 w-full pointer-events-none opacity-0 my-0"
                data-track-id="bgm-ch2b"
              />
            );
          }

          if (item.type === "dialogue") {
            return (
              <React.Fragment key={index}>
                {midSceneWaypoint}
                <p
                  className="dialogue-para text-[var(--text-primary)] transition-colors"
                  dangerouslySetInnerHTML={{ __html: item.html || item.content || "" }}
                />
              </React.Fragment>
            );
          }

          if (item.type === "break" || item.type === "divider") {
            return (
              <React.Fragment key={index}>
                {midSceneWaypoint}
                <div className="py-6 flex items-center justify-center gap-2 text-[var(--text-muted)] opacity-60">
                  <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                </div>
              </React.Fragment>
            );
          }

          return (
            <React.Fragment key={index}>
              {midSceneWaypoint}
              <p
                className={`prose-para text-[var(--text-primary)] transition-colors ${
                  isDropCap ? "drop-cap" : ""
                }`}
                dangerouslySetInnerHTML={{ __html: item.html || item.content || "" }}
              />
            </React.Fragment>
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
            <a
              href={`/${nextBookInfo.slug}/`}
              className="group flex flex-col items-end p-4 rounded-xl border border-accent/40 bg-accent/10 hover:bg-accent hover:text-white transition-all text-right sm:col-start-2 shadow-sm"
            >
              <span className="text-[11px] uppercase tracking-wider text-accent group-hover:text-white flex items-center gap-1 font-semibold">
                {nextBookInfo.label}
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </span>
              <span className="font-semibold text-sm text-[var(--text-primary)] group-hover:text-white mt-1">
                {nextBookInfo.title}
              </span>
            </a>
          )}
        </div>
      </nav>
    </article>
  );
}
