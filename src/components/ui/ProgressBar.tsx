'use client';

import { modules } from '@/lib/slideData';

interface ProgressBarProps {
  current: number;
  total: number;
  currentModule?: number;
}

export function ProgressBar({ current, total, currentModule }: ProgressBarProps) {
  const progress = ((current + 1) / total) * 100;
  const mod = currentModule ? modules.find(m => m.number === currentModule) : null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      <div className="flex items-center justify-between px-6 py-2">
        <div className="flex items-center gap-3">
          {mod && (
            <span
              className="text-xs font-mono uppercase tracking-widest"
              style={{ color: mod.color }}
            >
              Module {mod.number}: {mod.title}
            </span>
          )}
        </div>
        <span className="text-xs font-mono text-text-tertiary">
          {current + 1} / {total}
        </span>
      </div>
      <div className="h-[2px] bg-white/5">
        <div
          className="h-full progress-bar"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
