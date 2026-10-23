"use client";

import Link from "next/link";
import { allNovels } from "@/data/novelRegistry";

interface SeriesSwitcherProps {
  currentSlug: string;
  className?: string;
  compact?: boolean;
}

export default function SeriesSwitcher({
  currentSlug,
  className = "",
  compact = false,
}: SeriesSwitcherProps) {
  return (
    <div className={`w-full ${className}`}>
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
          <span className="text-xs uppercase tracking-wider font-bold text-[var(--text-primary)]">
            Semesta Tiket Pulang • Pilihan Episode / Buku
          </span>
        </div>
        <span className="text-[11px] text-[var(--text-muted)] font-medium">
          {allNovels.length} Episode Lengkap
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
        {allNovels.map((novel, index) => {
          const episodeNumber = index + 1;
          const isActive = novel.slug === currentSlug;

          if (compact) {
            return (
              <Link
                key={novel.slug}
                href={`/${novel.slug}/`}
                className={`p-2.5 rounded-xl border text-center transition-all ${
                  isActive
                    ? "bg-accent text-white border-accent shadow-sm font-semibold"
                    : "bg-[var(--bg-surface)] hover:bg-[var(--bg-hover)] border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-accent"
                }`}
              >
                <span className="block text-[10px] uppercase tracking-wider opacity-80">
                  Episode {episodeNumber}
                </span>
                <span className="block text-xs font-bold truncate">
                  {novel.title}
                </span>
              </Link>
            );
          }

          return (
            <Link
              key={novel.slug}
              href={`/${novel.slug}/`}
              className={`p-3 rounded-xl border transition-all flex flex-col justify-between group ${
                isActive
                  ? "bg-accent/10 border-accent text-accent shadow-sm ring-1 ring-accent"
                  : "bg-[var(--bg-card)] hover:bg-[var(--bg-surface)] border-[var(--border-subtle)] hover:border-[var(--border-medium)] text-[var(--text-primary)]"
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span
                    className={`text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded tracking-wider ${
                      isActive
                        ? "bg-accent text-white"
                        : "bg-[var(--bg-surface)] text-[var(--text-muted)] group-hover:text-accent border border-[var(--border-subtle)]"
                    }`}
                  >
                    Ep {episodeNumber}
                  </span>
                  {isActive && (
                    <span className="text-[9px] font-bold text-accent uppercase tracking-wider">
                      Aktif
                    </span>
                  )}
                </div>
                <h4
                  className={`text-xs sm:text-sm font-bold line-clamp-2 leading-snug mb-1 ${
                    isActive ? "text-accent" : "text-[var(--text-primary)] group-hover:text-accent"
                  }`}
                >
                  {novel.title}
                </h4>
              </div>
              <div className="pt-2 mt-1 border-t border-[var(--border-subtle)]/60 flex items-center justify-between text-[10px] text-[var(--text-muted)]">
                <span>10 Bab</span>
                <span className="font-medium text-emerald-600">Tamat</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
