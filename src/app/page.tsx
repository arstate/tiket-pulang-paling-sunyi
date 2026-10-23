"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getAllNovels, getFeaturedNovel } from "@/data/novelRegistry";
import { NovelMetadata } from "@/types/novel";

interface ResumeSession {
  slug: string;
  chapterId: number;
  title: string;
  chapterTitle: string;
  timestamp: number;
}

export default function CatalogHomePage() {
  const [novels] = useState<NovelMetadata[]>(getAllNovels());
  const featured = getFeaturedNovel();
  const [resumeSession, setResumeSession] = useState<ResumeSession | null>(null);

  useEffect(() => {
    // 1. Check universal resume state or legacy Tiket Pulang state
    try {
      const savedUniversal = localStorage.getItem("novel_platform_last_read");
      if (savedUniversal) {
        setResumeSession(JSON.parse(savedUniversal));
        return;
      }

      const legacyChapter = localStorage.getItem("tiket_pulang_last_chapter");
      if (legacyChapter) {
        const chapId = parseInt(legacyChapter, 10);
        if (chapId >= 1) {
          setResumeSession({
            slug: "tiket-pulang-paling-sunyi",
            chapterId: chapId,
            title: "Tiket Pulang Paling Sunyi",
            chapterTitle: `Bab ${chapId}`,
            timestamp: Date.now(),
          });
        }
      }
    } catch {
      // ignore
    }
  }, []);

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-200">
      {/* 1. Header Bar */}
      <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[var(--bg-primary)]/90 border-b border-[var(--border-subtle)]">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-medium)] flex items-center justify-center text-accent shadow-sm">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"></path>
                <path d="M6 6h10"></path>
                <path d="M6 10h10"></path>
              </svg>
            </div>
            <div>
              <span className="font-bold text-base tracking-tight text-[var(--text-primary)] block">
                Perpustakaan Novel
              </span>
              <span className="text-[11px] text-[var(--text-muted)] block -mt-0.5">
                Karya Sastra Resmi • Bachtiar Aryansyah Putra
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href={`/${featured.slug}/`}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-accent text-white hover:bg-accent/90 transition-colors shadow-sm"
            >
              <span>Baca Tiket Pulang</span>
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8 sm:py-12">
        {/* 2. Resume Reading Card (if reader has previous session) */}
        {resumeSession && (
          <div className="mb-8 p-4 sm:p-5 rounded-2xl bg-[var(--bg-surface)] border border-accent/30 shadow-card flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-fadeIn">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent flex-shrink-0">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
              </div>
              <div>
                <span className="text-xs uppercase font-semibold text-accent tracking-wider block">
                  Lanjutkan Membaca
                </span>
                <span className="text-sm sm:text-base font-bold text-[var(--text-primary)] block">
                  {resumeSession.title} — {resumeSession.chapterTitle}
                </span>
              </div>
            </div>

            <Link
              href={`/${resumeSession.slug}/#bab-${resumeSession.chapterId}`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2 text-xs font-semibold rounded-xl bg-accent text-white hover:bg-accent/90 transition-colors shadow-sm"
            >
              <span>Lanjut Baca Bab {resumeSession.chapterId}</span>
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </Link>
          </div>
        )}

        {/* 3. Hero Spotlight Novel (Featured) */}
        <section className="mb-12 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-subtle)] p-6 sm:p-10 shadow-card transition-colors duration-200">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="text-xs uppercase tracking-wider font-semibold px-3 py-1 rounded-full bg-accent/15 text-accent border border-accent/20">
              {featured.seriesPart || `Novel Utama • ${featured.genre}`}
            </span>
            <span className="text-xs px-2.5 py-1 rounded-full bg-[var(--bg-surface)] text-[var(--text-muted)] border border-[var(--border-subtle)] font-medium">
              Status: {featured.status === "Tamat" ? "Lengkap 10 Bab" : featured.status}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[var(--text-primary)] leading-tight mb-3">
            {featured.title}
          </h1>
          <p className="text-base sm:text-lg text-[var(--text-secondary)] font-medium mb-4">
            {featured.subtitle}
          </p>
          <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed max-w-3xl mb-6">
            {featured.synopsis}
          </p>

          <blockquote className="border-l-2 border-accent pl-4 my-6 italic text-sm text-[var(--text-muted)] max-w-2xl">
            &ldquo;{featured.quote}&rdquo;
          </blockquote>

          {/* Quick Metrics */}
          <div className="grid grid-cols-3 gap-3 py-4 border-y border-[var(--border-subtle)] my-6 max-w-xl">
            <div className="text-center sm:text-left">
              <span className="block text-xl font-bold text-[var(--text-primary)]">{featured.totalChapters} Bab</span>
              <span className="text-xs text-[var(--text-muted)]">Lengkap Tamat</span>
            </div>
            <div className="text-center sm:text-left">
              <span className="block text-xl font-bold text-[var(--text-primary)]">{featured.totalWords.toLocaleString()}</span>
              <span className="text-xs text-[var(--text-muted)]">Kata Kisah</span>
            </div>
            <div className="text-center sm:text-left">
              <span className="block text-xl font-bold text-[var(--text-primary)]">± {featured.totalReadTimeMinutes} Mnt</span>
              <span className="text-xs text-[var(--text-muted)]">Waktu Baca</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 mt-8">
            <Link
              href={`/${featured.slug}/`}
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-xl bg-accent text-white font-semibold text-sm hover:bg-accent/90 transition-colors shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent"
            >
              <span>Mulai Baca dari Awal</span>
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </Link>

            <Link
              href={`/${featured.slug}/#bab-1`}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[var(--bg-surface)] text-[var(--text-primary)] border border-[var(--border-medium)] font-semibold text-sm hover:bg-[var(--bg-hover)] transition-colors"
            >
              Langsung ke Bab 1
            </Link>
          </div>
        </section>

        {/* 4. All Novels Catalog Grid */}
        <section className="mb-14">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-[var(--text-primary)]">
                Semesta Tiket Pulang
              </h2>
              <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-0.5">
                Koleksi 6 buku perjalanan cinta, agensi kreatif, kepulangan paling sunyi, hingga keajaiban detak kedua
              </p>
            </div>
            <span className="text-xs text-[var(--text-muted)] px-3 py-1 rounded-full bg-[var(--bg-surface)] border border-[var(--border-subtle)] font-medium">
              {novels.length} Buku Terdaftar
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {novels.map((novel) => {
              const isAvailable = novel.status === "Tamat" || novel.status === "Ongoing";

              return (
                <div
                  key={novel.slug}
                  className="rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] p-5 shadow-card flex flex-col justify-between transition-all hover:border-[var(--border-medium)] group"
                >
                  <div>
                    {/* Badge & Status */}
                    <div className="flex items-center justify-between gap-2 mb-2.5">
                      <span className="text-[11px] uppercase tracking-wider font-semibold px-2.5 py-0.5 rounded-full bg-[var(--bg-surface)] text-[var(--text-muted)] border border-[var(--border-subtle)]">
                        {novel.genre.split("/")[0]}
                      </span>
                      <span
                        className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                          novel.status === "Tamat"
                            ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20"
                            : "bg-amber-500/10 text-amber-600 border border-amber-500/20"
                        }`}
                      >
                        {novel.status === "Tamat" ? "Lengkap 10 Bab" : novel.status}
                      </span>
                    </div>

                    {novel.seriesPart && (
                      <span className="text-[11px] font-semibold text-accent block mb-1 tracking-tight">
                        {novel.seriesPart}
                      </span>
                    )}

                    <h3 className="text-lg font-bold text-[var(--text-primary)] group-hover:text-accent transition-colors mb-1.5 leading-snug">
                      {novel.title}
                    </h3>

                    <p className="text-xs text-[var(--text-muted)] italic mb-3 line-clamp-2">
                      &ldquo;{novel.tagline}&rdquo;
                    </p>

                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-4 line-clamp-3">
                      {novel.synopsis}
                    </p>
                  </div>

                  <div>
                    <div className="pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between text-xs text-[var(--text-muted)] mb-4">
                      <span>{novel.totalChapters} Bab</span>
                      <span>•</span>
                      <span>{novel.totalWords.toLocaleString()} Kata</span>
                      <span>•</span>
                      <span>± {novel.totalReadTimeMinutes} Mnt</span>
                    </div>

                    {isAvailable ? (
                      <Link
                        href={`/${novel.slug}/`}
                        className="w-full inline-flex items-center justify-center gap-2 py-2 rounded-xl bg-[var(--bg-surface)] hover:bg-accent hover:text-white text-[var(--text-primary)] border border-[var(--border-medium)] font-semibold text-xs transition-colors shadow-sm"
                      >
                        <span>Buka Ruang Baca</span>
                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M5 12h14"></path>
                          <path d="m12 5 7 7-7 7"></path>
                        </svg>
                      </Link>
                    ) : (
                      <div className="w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-[var(--bg-surface)]/60 text-[var(--text-muted)] border border-dashed border-[var(--border-subtle)] text-xs font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
                        <span>Naskah Segera Hadir</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 5. Reading Comfort Feature Pillars */}
        <section className="mb-14 p-6 sm:p-8 rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-subtle)]">
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="text-xs uppercase tracking-wider font-semibold text-accent block mb-1">
              Standar Kenyamanan Membaca
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)]">
              Dirancang Khusus untuk Membaca Khusyuk
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] text-center">
              <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent mx-auto mb-3">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18V5l12-2v13"></path>
                  <circle cx="6" cy="18" r="3"></circle>
                  <circle cx="18" cy="16" r="3"></circle>
                </svg>
              </div>
              <h3 className="font-bold text-sm text-[var(--text-primary)] mb-1">Audio Dissolve Studio</h3>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                Iringan instrumen dan vokal syahdu berganti melarut halus tanpa jeda hening atau lompatan nada yang mengagetkan.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] text-center">
              <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent mx-auto mb-3">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="m4.93 4.93 4.24 4.24"></path>
                  <path d="m14.83 9.17 4.24-4.24"></path>
                  <path d="m14.83 14.83 4.24 4.24"></path>
                  <path d="m9.17 14.83-4.24 4.24"></path>
                </svg>
              </div>
              <h3 className="font-bold text-sm text-[var(--text-primary)] mb-1">3 Tema Kertas Sastra</h3>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                Pilihan nuansa Krem Kertas, Sepia Klasik, dan Malam OLED ramah retina untuk menjaga mata tetap segar berjam-jam.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] text-center">
              <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent mx-auto mb-3">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"></path>
                </svg>
              </div>
              <h3 className="font-bold text-sm text-[var(--text-primary)] mb-1">100% Bebas Iklan</h3>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                Murni bacaan sastra tanpa popup menjengkelkan, tanpa banner judi atau iklan mengambang yang merusak imajinasi.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* 6. Literary Footer */}
      <footer className="border-t border-[var(--border-subtle)] bg-[var(--bg-surface)] py-10">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <p className="font-serif italic text-sm sm:text-base text-[var(--text-secondary)] max-w-xl mx-auto mb-3 leading-relaxed">
            &ldquo;Perjalanan mencari nafkah telah usai. Namun di atas segalanya, janji suci seorang suami telah tertunaikan.&rdquo;
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-[var(--text-muted)]">
            <span>Perpustakaan Novel Digital</span>
            <span>•</span>
            <span>Karya Resmi Bachtiar Aryansyah Putra</span>
            <span>•</span>
            <span>© 2026 Hak Cipta Dilindungi</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
