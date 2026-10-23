"use client";

import React, { useEffect, useState } from "react";

interface AudioPermissionModalProps {
  isOpen: boolean;
  onEnableAudio: () => void;
  onDismiss: () => void;
}

export default function AudioPermissionModal({
  isOpen,
  onEnableAudio,
  onDismiss,
}: AudioPermissionModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/40 backdrop-blur-sm animate-fade-in">
      <div 
        className="w-full max-w-md bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-2xl shadow-2xl p-6 sm:p-7 relative overflow-hidden transition-all duration-200 transform scale-100"
        role="dialog"
        aria-modal="true"
        aria-labelledby="audio-modal-title"
      >
        {/* Soft Decorative Ambient Top Accent */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent/30 via-accent to-accent/30" />

        {/* Modal Header */}
        <div className="flex items-start gap-4 mb-4">
          <div className="w-12 h-12 rounded-xl bg-accent-light/60 border border-accent/20 flex items-center justify-center text-accent flex-shrink-0 shadow-inner">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 18v-6a9 9 0 0 1 18 0v6"></path>
              <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path>
            </svg>
          </div>
          <div>
            <h2 id="audio-modal-title" className="text-lg sm:text-xl font-bold font-ui text-[var(--text-primary)] tracking-tight">
              Dengarkan Musik Latar?
            </h2>
            <p className="text-xs text-accent font-medium mt-0.5 font-ui">
              Disarankan menggunakan earphone / headphone 🎧
            </p>
          </div>
        </div>

        {/* Modal Body */}
        <p className="text-sm leading-relaxed text-[var(--text-secondary)] mb-6 font-ui">
          Novel <em>Tiket Pulang Paling Sunyi</em> dilengkapi alunan musik adaptif di setiap bab yang berganti otomatis mengikuti ritme emosi cerita.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-2.5">
          <button
            onClick={onEnableAudio}
            className="flex-1 py-3 px-4 rounded-xl bg-accent hover:bg-accent-hover text-white font-medium text-sm font-ui transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 group active:scale-[0.98]"
          >
            <svg className="w-4 h-4 transition-transform group-hover:scale-110" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
            <span>Nyalakan Musik & Mulai Baca</span>
          </button>

          <button
            onClick={onDismiss}
            className="py-2.5 px-4 rounded-xl border border-[var(--border-subtle)] hover:bg-[var(--bg-hover)] text-[var(--text-muted)] hover:text-[var(--text-primary)] font-medium text-xs sm:text-sm font-ui transition-colors text-center"
          >
            Baca Hening
          </button>
        </div>
      </div>
    </div>
  );
}
