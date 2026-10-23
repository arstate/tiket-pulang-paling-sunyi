"use client";

interface ReadingProgressBarProps {
  progress: number;
}

export default function ReadingProgressBar({ progress }: ReadingProgressBarProps) {
  return (
    <div 
      className="fixed top-0 left-0 right-0 h-[3px] bg-transparent z-50 pointer-events-none"
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className="h-full bg-accent transition-[width] duration-150 ease-out shadow-[0_0_8px_var(--accent)]"
        style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
      />
    </div>
  );
}
