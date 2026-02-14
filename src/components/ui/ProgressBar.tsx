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
  const slideCounter = `${String(current + 1).padStart(2, '0')} / ${String(total).padStart(2, '0')}`;

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <div className="h-[3px] bg-white/8">
        <div
          className="h-full progress-bar"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="px-5 py-2 flex items-center justify-between gap-4">
        {mod && (
          <span
            className="text-[11px] font-mono uppercase tracking-[0.22em]"
            style={{ color: mod.color }}
          >
            Module {mod.number}: {mod.title}
          </span>
        )}
        <span className="text-[11px] font-mono text-text-tertiary tracking-[0.12em]">
          {slideCounter}
        </span>
      </div>
    </div>
  );
}
