"use client";

import { Chapter, NovelData } from "@/types/novel";

interface HeroCoverProps {
  novel: NovelData;
  lastReadChapterId: number;
  onSelectChapter: (id: number) => void;
  onOpenToc: () => void;
}

export default function HeroCover({
  novel,
  lastReadChapterId,
  onSelectChapter,
  onOpenToc,
}: HeroCoverProps) {
  const continueChapter = novel.chapters.find((c) => c.id === lastReadChapterId);

  return (
    <main className="max-w-4xl mx-auto px-4 py-8 sm:py-14 animate-fadeIn">
      {/* Cover Card */}
      <article className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-2xl p-6 sm:p-10 shadow-card transition-colors duration-200">
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="text-xs uppercase tracking-wider font-semibold px-3 py-1 rounded-full bg-[var(--bg-surface)] text-accent border border-[var(--border-subtle)]">
            {novel.genre}
          </span>
          <span className="text-xs text-[var(--text-muted)]">
            Karya Resmi • {novel.author}
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[var(--text-primary)] leading-tight mb-2">
          {novel.title}
        </h1>
        <p className="text-base sm:text-lg text-[var(--text-secondary)] font-medium mb-3">
          {novel.subtitle}
        </p>
        <p className="text-xs sm:text-sm text-[var(--text-muted)] italic mb-6">
          &ldquo;{novel.tagline}&rdquo;
        </p>

        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-4 border-y border-[var(--border-subtle)] my-6">
          <div className="p-3 rounded-xl bg-[var(--bg-surface)] text-center">
            <span className="block text-xl font-bold text-[var(--text-primary)]">{novel.totalChapters}</span>
            <span className="text-xs text-[var(--text-muted)]">Bab Lengkap</span>
          </div>
          <div className="p-3 rounded-xl bg-[var(--bg-surface)] text-center">
            <span className="block text-xl font-bold text-[var(--text-primary)]">11.082</span>
            <span className="text-xs text-[var(--text-muted)]">Total Kata</span>
          </div>
          <div className="p-3 rounded-xl bg-[var(--bg-surface)] text-center">
            <span className="block text-xl font-bold text-[var(--text-primary)]">~55 Min</span>
            <span className="text-xs text-[var(--text-muted)]">Waktu Baca</span>
          </div>
          <div className="p-3 rounded-xl bg-[var(--bg-surface)] text-center">
            <span className="block text-xl font-bold text-accent">Tamat</span>
            <span className="text-xs text-[var(--text-muted)]">Status Cerita</span>
          </div>
        </div>

        {/* Call to Actions */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          {continueChapter && continueChapter.id > 1 ? (
            <>
              <button
                onClick={() => onSelectChapter(continueChapter.id)}
                className="px-6 py-3 rounded-xl font-semibold text-sm bg-accent text-[var(--accent-contrast)] hover:bg-accent-hover shadow-md transition-all flex items-center gap-2 group"
              >
                <span>Lanjutkan {continueChapter.number}</span>
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>
              <button
                onClick={() => onSelectChapter(1)}
                className="px-5 py-3 rounded-xl font-medium text-sm bg-[var(--bg-surface)] hover:bg-[var(--bg-hover)] text-[var(--text-secondary)] border border-[var(--border-medium)] transition-colors"
              >
                Mulai dari Awal (Bab 1)
              </button>
            </>
          ) : (
            <button
              onClick={() => onSelectChapter(1)}
              className="px-7 py-3 rounded-xl font-semibold text-sm bg-accent text-[var(--accent-contrast)] hover:bg-accent-hover shadow-md transition-all flex items-center gap-2 group"
            >
              <span>Mulai Membaca Bab 1</span>
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
          )}

          <button
            onClick={onOpenToc}
            className="px-5 py-3 rounded-xl font-medium text-sm bg-[var(--bg-surface)] hover:bg-[var(--bg-hover)] text-[var(--text-secondary)] border border-[var(--border-medium)] transition-colors flex items-center gap-2"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="8" y1="6" x2="21" y2="6"></line>
              <line x1="8" y1="12" x2="21" y2="12"></line>
              <line x1="8" y1="18" x2="21" y2="18"></line>
              <line x1="3" y1="6" x2="3.01" y2="6"></line>
              <line x1="3" y1="12" x2="3.01" y2="12"></line>
              <line x1="3" y1="18" x2="3.01" y2="18"></line>
            </svg>
            <span>Daftar Bab</span>
          </button>
        </div>
      </article>

      {/* Synopsis & Quote Card */}
      <section className="mt-8 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-2xl p-6 sm:p-8 shadow-subtle">
        <h2 className="text-xl font-bold text-[var(--text-primary)] mb-3 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-accent inline-block"></span>
          Sinopsis Singkat
        </h2>
        <p className="text-[var(--text-secondary)] leading-relaxed text-sm sm:text-base mb-6 font-serif">
          {novel.synopsis}
        </p>

        {/* Highlight Quote */}
        <blockquote className="border-l-4 border-accent pl-4 py-2 bg-[var(--bg-surface)]/70 rounded-r-xl italic text-[var(--text-primary)] text-sm sm:text-base font-serif leading-relaxed">
          &ldquo;{novel.quote}&rdquo;
          <footer className="text-xs text-[var(--text-muted)] font-sans not-italic mt-2">
            — Danu Prasetya, Tiket Pulang Paling Sunyi
          </footer>
        </blockquote>
      </section>

      {/* Chapters Grid */}
      <section className="mt-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg sm:text-xl font-bold text-[var(--text-primary)]">
            Daftar Bab ({novel.chapters.length})
          </h2>
          <span className="text-xs text-[var(--text-muted)]">Pilih bab untuk mulai membaca</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {novel.chapters.map((chapter: Chapter) => (
            <div
              key={chapter.id}
              onClick={() => onSelectChapter(chapter.id)}
              className="group cursor-pointer bg-[var(--bg-card)] hover:bg-[var(--bg-surface)] border border-[var(--border-subtle)] hover:border-accent/40 rounded-xl p-4 sm:p-5 transition-all shadow-subtle hover:shadow-card flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-semibold text-accent tracking-wider uppercase">
                    {chapter.number}
                  </span>
                  <span className="text-[11px] text-[var(--text-muted)]">
                    {chapter.readTimeMinutes} menit baca
                  </span>
                </div>
                <h3 className="font-bold text-base text-[var(--text-primary)] group-hover:text-accent transition-colors mb-2">
                  {chapter.title}
                </h3>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] line-clamp-2 font-serif leading-relaxed mb-3">
                  {chapter.excerpt}
                </p>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-[var(--border-subtle)] text-xs text-[var(--text-muted)]">
                <span>{chapter.wordCount.toLocaleString("id-ID")} kata</span>
                <span className="text-accent font-medium group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                  Baca
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
