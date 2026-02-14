'use client';

import { useCallback, useEffect } from 'react';

interface UseKeyboardNavProps {
  currentSlide: number;
  totalSlides: number;
  onNext: () => void;
  onPrev: () => void;
  onGoTo: (index: number) => void;
}

export function useKeyboardNav({
  totalSlides,
  onGoTo,
  onNext,
  onPrev,
}: UseKeyboardNavProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowRight':
        case ' ':
        case 'PageDown':
          e.preventDefault();
          onNext();
          break;
        case 'ArrowLeft':
        case 'PageUp':
          e.preventDefault();
          onPrev();
          break;
        case 'Home':
          e.preventDefault();
          onGoTo(0);
          break;
        case 'End':
          e.preventDefault();
          onGoTo(totalSlides - 1);
          break;
      }
    },
    [onGoTo, onNext, onPrev, totalSlides]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
}
