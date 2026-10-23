"use client";

import { FontFamily, LineHeight, PageWidth, ReaderSettings, TextAlign, ThemeMode } from "@/types/novel";
import { useEffect } from "react";

interface SettingsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  settings: ReaderSettings;
  onUpdateSettings: (newSettings: Partial<ReaderSettings>) => void;
  onResetSettings: () => void;
  audioPlaying: boolean;
  onToggleAudio: () => void;
}

export default function SettingsDrawer({
  isOpen,
  onClose,
  settings,
  onUpdateSettings,
  onResetSettings,
  audioPlaying,
  onToggleAudio,
}: SettingsDrawerProps) {
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

  if (!isOpen) return null;

  const themes: { id: ThemeMode; label: string; bg: string; text: string; border: string }[] = [
    { id: "cream", label: "Krem Hangat", bg: "#FAF6EE", text: "#2C2621", border: "#D8C9B4" },
    { id: "sepia", label: "Sepia Antik", bg: "#F3EBD8", text: "#382D22", border: "#C7B596" },
    { id: "twilight", label: "Senja Slate", bg: "#1C2128", text: "#E6EDF3", border: "#445062" },
    { id: "dark", label: "Malam OLED", bg: "#121314", text: "#D8D2C8", border: "#3A3F45" },
    { id: "white", label: "Putih Bersih", bg: "#FFFFFF", text: "#0F172A", border: "#CBD5E1" },
  ];

  const fontFamilies: { id: FontFamily; label: string; desc: string }[] = [
    { id: "merriweather", label: "Merriweather", desc: "Book Serif Klasik (Default)" },
    { id: "lora", label: "Lora", desc: "Modern Editorial Serif" },
    { id: "georgia", label: "Georgia", desc: "Legible Screen Serif" },
  ];

  const fontSizes = [16, 18.5, 20.5, 23];

  const lineHeights: { id: LineHeight; label: string }[] = [
    { id: "compact", label: "Rapat" },
    { id: "comfortable", label: "Nyaman" },
    { id: "loose", label: "Longgar" },
  ];

  const pageWidths: { id: PageWidth; label: string }[] = [
    { id: "narrow", label: "Ramping" },
    { id: "standard", label: "Standar" },
    { id: "wide", label: "Lebar" },
  ];

  const textAligns: { id: TextAlign; label: string }[] = [
    { id: "left", label: "Rata Kiri" },
    { id: "justify", label: "Rata Kanan-Kiri" },
  ];

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
        aria-label="Pengaturan Tampilan & Huruf"
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[var(--border-subtle)] flex items-center justify-between bg-[var(--bg-surface)]/50">
          <div>
            <h2 className="font-bold text-base sm:text-lg text-[var(--text-primary)]">
              Tampilan & Huruf
            </h2>
            <p className="text-xs text-[var(--text-muted)]">
              Sesuaikan kenyamanan membaca Anda
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] transition-colors"
            aria-label="Tutup Pengaturan (Esc)"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-6">
          {/* 1. Theme Color Options */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-2.5">
              Tema Warna Layar
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {themes.map((t) => {
                const isActive = settings.theme === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => onUpdateSettings({ theme: t.id })}
                    className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs font-medium transition-all ${
                      isActive
                        ? "border-accent ring-2 ring-accent/30 shadow-sm"
                        : "border-[var(--border-subtle)] hover:border-[var(--border-medium)]"
                    }`}
                    style={{ backgroundColor: t.bg, color: t.text }}
                  >
                    <span
                      className="w-4 h-4 rounded-full border flex-shrink-0"
                      style={{ backgroundColor: t.bg, borderColor: t.border }}
                    />
                    <span className="truncate">{t.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Font Size Control */}
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                Ukuran Huruf
              </label>
              <span className="text-xs font-bold text-accent px-2 py-0.5 rounded-md bg-[var(--bg-surface)] border border-[var(--border-subtle)]">
                {settings.fontSize} px
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => onUpdateSettings({ fontSize: Math.max(14, Number((settings.fontSize - 1).toFixed(1))) })}
                className="w-10 h-10 rounded-xl bg-[var(--bg-surface)] hover:bg-[var(--bg-hover)] border border-[var(--border-subtle)] flex items-center justify-center font-serif text-sm font-bold text-[var(--text-primary)] transition-colors"
                title="Perkecil Huruf (A-)"
              >
                A−
              </button>

              <div className="grid grid-cols-4 gap-1.5 flex-1">
                {fontSizes.map((size) => {
                  const isActive = settings.fontSize === size;
                  return (
                    <button
                      key={size}
                      onClick={() => onUpdateSettings({ fontSize: size })}
                      className={`py-2 rounded-lg text-xs font-medium border transition-colors ${
                        isActive
                          ? "bg-accent text-[var(--accent-contrast)] border-accent shadow-sm"
                          : "bg-[var(--bg-surface)] text-[var(--text-secondary)] border-[var(--border-subtle)] hover:border-[var(--border-medium)]"
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => onUpdateSettings({ fontSize: Math.min(26, Number((settings.fontSize + 1).toFixed(1))) })}
                className="w-10 h-10 rounded-xl bg-[var(--bg-surface)] hover:bg-[var(--bg-hover)] border border-[var(--border-subtle)] flex items-center justify-center font-serif text-base font-bold text-[var(--text-primary)] transition-colors"
                title="Perbesar Huruf (A+)"
              >
                A+
              </button>
            </div>
          </div>

          {/* 3. Font Family */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-2.5">
              Jenis Huruf Bacaan (Book Serif)
            </label>
            <div className="space-y-1.5">
              {fontFamilies.map((f) => {
                const isActive = settings.fontFamily === f.id;
                return (
                  <button
                    key={f.id}
                    onClick={() => onUpdateSettings({ fontFamily: f.id })}
                    className={`w-full p-2.5 rounded-xl border text-left flex items-center justify-between transition-all ${
                      isActive
                        ? "bg-accent/10 border-accent text-accent font-semibold"
                        : "bg-[var(--bg-surface)] border-[var(--border-subtle)] hover:border-[var(--border-medium)] text-[var(--text-primary)]"
                    }`}
                  >
                    <div>
                      <span className="block text-sm">{f.label}</span>
                      <span className="text-[11px] text-[var(--text-muted)]">{f.desc}</span>
                    </div>
                    {isActive && (
                      <span className="w-2 h-2 rounded-full bg-accent"></span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4. Line Height */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-2.5">
              Jarak Baris (Line Spacing)
            </label>
            <div className="grid grid-cols-3 gap-2">
              {lineHeights.map((lh) => {
                const isActive = settings.lineHeight === lh.id;
                return (
                  <button
                    key={lh.id}
                    onClick={() => onUpdateSettings({ lineHeight: lh.id })}
                    className={`py-2 rounded-xl text-xs font-medium border transition-colors ${
                      isActive
                        ? "bg-accent text-[var(--accent-contrast)] border-accent shadow-sm"
                        : "bg-[var(--bg-surface)] text-[var(--text-secondary)] border-[var(--border-subtle)] hover:border-[var(--border-medium)]"
                    }`}
                  >
                    {lh.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 5. Page Width */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-2.5">
              Lebar Halaman Teks
            </label>
            <div className="grid grid-cols-3 gap-2">
              {pageWidths.map((pw) => {
                const isActive = settings.pageWidth === pw.id;
                return (
                  <button
                    key={pw.id}
                    onClick={() => onUpdateSettings({ pageWidth: pw.id })}
                    className={`py-2 rounded-xl text-xs font-medium border transition-colors ${
                      isActive
                        ? "bg-accent text-[var(--accent-contrast)] border-accent shadow-sm"
                        : "bg-[var(--bg-surface)] text-[var(--text-secondary)] border-[var(--border-subtle)] hover:border-[var(--border-medium)]"
                    }`}
                  >
                    {pw.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 6. Text Alignment */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-2.5">
              Perataan Teks
            </label>
            <div className="grid grid-cols-2 gap-2">
              {textAligns.map((ta) => {
                const isActive = settings.textAlign === ta.id;
                return (
                  <button
                    key={ta.id}
                    onClick={() => onUpdateSettings({ textAlign: ta.id })}
                    className={`py-2 rounded-xl text-xs font-medium border transition-colors ${
                      isActive
                        ? "bg-accent text-[var(--accent-contrast)] border-accent shadow-sm"
                        : "bg-[var(--bg-surface)] text-[var(--text-secondary)] border-[var(--border-subtle)] hover:border-[var(--border-medium)]"
                    }`}
                  >
                    {ta.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 7. Ambient Audio Synthesizer */}
          <div className="p-3.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)]">
            <div className="flex items-center justify-between mb-2">
              <div>
                <span className="block text-xs font-bold text-[var(--text-primary)]">Suara Hujan & Kereta Malam</span>
                <span className="text-[11px] text-[var(--text-muted)]">Synthesizer relaksa Web Audio murni</span>
              </div>
              <button
                onClick={onToggleAudio}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  audioPlaying
                    ? "bg-accent text-[var(--accent-contrast)]"
                    : "bg-[var(--bg-card)] border border-[var(--border-medium)] text-[var(--text-secondary)]"
                }`}
              >
                {audioPlaying ? "Matikan" : "Putar"}
              </button>
            </div>
            {audioPlaying && (
              <div className="mt-3 pt-2 border-t border-[var(--border-subtle)] flex items-center gap-3">
                <span className="text-[11px] text-[var(--text-muted)]">Volume</span>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={settings.audioVolume}
                  onChange={(e) => onUpdateSettings({ audioVolume: parseFloat(e.target.value) })}
                  className="w-full accent-accent h-1 bg-[var(--border-medium)] rounded-lg cursor-pointer"
                />
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[var(--border-subtle)] bg-[var(--bg-surface)]/50 flex items-center justify-between">
          <button
            onClick={onResetSettings}
            className="text-xs text-[var(--text-muted)] hover:text-accent font-medium transition-colors"
          >
            Reset ke Pengaturan Awal
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-accent text-[var(--accent-contrast)] hover:bg-accent-hover shadow-sm transition-colors"
          >
            Terapkan & Tutup
          </button>
        </div>
      </aside>
    </div>
  );
}
