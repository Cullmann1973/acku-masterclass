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
    <div className="fixed top-0 left-0 right-0 z-50">
      <div className="h-[3px] bg-white/8">
        <div
          className="h-full progress-bar"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="px-5 py-2">
        {mod && (
          <span
            className="text-[11px] font-mono uppercase tracking-[0.22em]"
            style={{ color: mod.color }}
          >
            Module {mod.number}: {mod.title}
          </span>
        )}
      </div>
    </div>
  );
}
