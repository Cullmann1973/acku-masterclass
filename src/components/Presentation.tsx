'use client';

import { useState, useCallback, useEffect, useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { slides } from '@/lib/slideData';
import { useKeyboardNav } from '@/hooks/useKeyboardNav';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Background } from '@/components/ui/Background';
import { TitleSlide } from '@/components/slides/TitleSlide';
import { DividerSlide } from '@/components/slides/DividerSlide';
import { StatSlide } from '@/components/slides/StatSlide';
import { StorySlide } from '@/components/slides/StorySlide';
import { QuoteSlide } from '@/components/slides/QuoteSlide';
import { ListSlide } from '@/components/slides/ListSlide';
import { InteractionSlide } from '@/components/slides/InteractionSlide';
import { VisualizationSlide } from '@/components/slides/VisualizationSlide';
import { ContentSlide } from '@/components/slides/ContentSlide';
import { ClosingSlide } from '@/components/slides/ClosingSlide';

function SlideRenderer({ slide, isActive }: { slide: (typeof slides)[0]; isActive: boolean }) {
  switch (slide.type) {
    case 'title':
      return <TitleSlide slide={slide} isActive={isActive} />;
    case 'module-divider':
      return <DividerSlide slide={slide} isActive={isActive} />;
    case 'stat':
      return <StatSlide slide={slide} isActive={isActive} />;
    case 'story':
      if (slide.layout === 'quote-full' || slide.animation === 'typewriter') {
        return <QuoteSlide slide={slide} isActive={isActive} />;
      }
      return <StorySlide slide={slide} isActive={isActive} />;
    case 'list':
      return <ListSlide slide={slide} isActive={isActive} />;
    case 'interaction':
      return <InteractionSlide slide={slide} isActive={isActive} />;
    case 'visualization':
    case 'framework':
    case 'matrix':
    case 'case-study':
      return <VisualizationSlide slide={slide} isActive={isActive} />;
    case 'content':
      return <ContentSlide slide={slide} isActive={isActive} />;
    case 'closing':
      return <ClosingSlide slide={slide} isActive={isActive} />;
    default:
      return <ContentSlide slide={slide} isActive={isActive} />;
  }
}

export function Presentation() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showOverview, setShowOverview] = useState(false);
  const slideContainerRef = useRef<HTMLDivElement>(null);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const transitionContextRef = useRef<gsap.Context | null>(null);
  const awaitingEnterRef = useRef(false);

  const currentSlideData = slides[currentSlide];
  const currentModule = currentSlideData?.module;

  useEffect(() => {
    const previousDefaults = { ...gsap.defaults() };
    gsap.defaults({ ...previousDefaults, ease: 'power2.out' });
    transitionContextRef.current = gsap.context(() => {}, slideContainerRef);

    return () => {
      transitionContextRef.current?.revert();
      gsap.defaults(previousDefaults);
    };
  }, []);

  const goToSlide = useCallback((index: number) => {
    if (index < 0 || index >= slides.length || isTransitioning || index === currentSlide) return;

    setIsTransitioning(true);
    const direction = index > currentSlide ? 1 : -1;

    const runTransition = (fn: () => void) => {
      if (transitionContextRef.current) {
        transitionContextRef.current.add(fn);
        return;
      }
      fn();
    };

    if (!slideContainerRef.current) {
      setCurrentSlide(index);
      setIsTransitioning(false);
      return;
    }

    runTransition(() => {
      const container = slideContainerRef.current;
      if (!container) {
        setCurrentSlide(index);
        setIsTransitioning(false);
        return;
      }

      gsap.killTweensOf(container);
      gsap.to(container, {
        opacity: 0,
        x: direction > 0 ? -40 : 40,
        duration: 0.24,
        ease: 'power2.in',
        onComplete: () => {
          if (!slideContainerRef.current) {
            setCurrentSlide(index);
            setIsTransitioning(false);
            return;
          }

          // Critical flash fix: hide incoming frame before React swaps content.
          gsap.set(slideContainerRef.current, {
            opacity: 0,
            x: direction > 0 ? 40 : -40,
          });
          awaitingEnterRef.current = true;
          setCurrentSlide(index);
        },
      });
    });
  }, [currentSlide, isTransitioning]);

  useLayoutEffect(() => {
    if (!awaitingEnterRef.current || !slideContainerRef.current) return;
    awaitingEnterRef.current = false;

    const runEnter = () => {
      const container = slideContainerRef.current;
      if (!container) {
        setIsTransitioning(false);
        return;
      }

      gsap.killTweensOf(container);
      gsap.to(container, {
        opacity: 1,
        x: 0,
        duration: 0.34,
        ease: 'power2.out',
        onComplete: () => setIsTransitioning(false),
      });
    };

    if (transitionContextRef.current) {
      transitionContextRef.current.add(runEnter);
      return;
    }

    runEnter();
  }, [currentSlide]);

  const onNext = useCallback(() => goToSlide(currentSlide + 1), [currentSlide, goToSlide]);
  const onPrev = useCallback(() => goToSlide(currentSlide - 1), [currentSlide, goToSlide]);

  useKeyboardNav({
    currentSlide,
    totalSlides: slides.length,
    onNext,
    onPrev,
    onGoTo: goToSlide,
  });

  // Touch/swipe support
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      touchStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!touchStartRef.current) return;
      const dx = e.changedTouches[0].clientX - touchStartRef.current.x;
      const dy = e.changedTouches[0].clientY - touchStartRef.current.y;

      // Only trigger on horizontal swipes (not scrolls)
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 2) {
        if (dx < 0) onNext();
        else onPrev();
      }

      touchStartRef.current = null;
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [onNext, onPrev]);

  // Keyboard shortcut for overview (O key)
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'o' || e.key === 'O') {
        setShowOverview(v => !v);
      }
      if (e.key === 'Escape' && showOverview) {
        setShowOverview(false);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [showOverview]);

  // Overview mode
  if (showOverview) {
    return (
      <div className="fixed inset-0 bg-bg-primary z-50 overflow-auto p-6">
        <Background module={currentModule} />
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-serif text-2xl text-text-primary">Slide Overview</h2>
            <button
              onClick={() => setShowOverview(false)}
              className="font-mono text-sm text-accent hover:text-accent-hover transition-colors"
            >
              Close (Esc)
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {slides.map((slide, i) => (
              <button
                key={slide.id}
                onClick={() => {
                  goToSlide(i);
                  setShowOverview(false);
                }}
                className={`text-left glass rounded-lg p-3 border transition-all hover:border-accent/30 ${
                  i === currentSlide ? 'border-accent/50 ring-1 ring-accent/20' : 'border-white/5'
                }`}
              >
                <span className="font-mono text-xs text-text-tertiary">{i + 1}</span>
                <p className="text-xs text-text-primary mt-1 line-clamp-2 font-medium">
                  {slide.title || slide.type}
                </p>
                <span className="text-[10px] font-mono text-text-tertiary mt-1 block">
                  {slide.type}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="presentation-stage">
      <Background module={currentModule} />

      {/* Click zones for navigation */}
      <button
        className="fixed left-0 top-0 w-16 h-full z-30 opacity-0 hover:opacity-100 transition-opacity cursor-w-resize"
        onClick={onPrev}
        aria-label="Previous slide"
      >
        <div className="h-full flex items-center justify-center">
          <div className="w-8 h-8 rounded-full glass flex items-center justify-center text-text-tertiary">
            {'\u2190'}
          </div>
        </div>
      </button>
      <button
        className="fixed right-0 top-0 w-16 h-full z-30 opacity-0 hover:opacity-100 transition-opacity cursor-e-resize"
        onClick={onNext}
        aria-label="Next slide"
      >
        <div className="h-full flex items-center justify-center">
          <div className="w-8 h-8 rounded-full glass flex items-center justify-center text-text-tertiary">
            {'\u2192'}
          </div>
        </div>
      </button>

      {/* Slide frame */}
      <div className="presentation-shell">
        <div className="presentation-root">
          <div className="presentation-slide-scroll">
            <div
              ref={slideContainerRef}
              className="presentation-slide relative z-10 w-full h-full"
            >
              <SlideRenderer key={currentSlideData.id} slide={currentSlideData} isActive />
            </div>
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <ProgressBar
        current={currentSlide}
        total={slides.length}
        currentModule={currentModule}
      />

      {/* Overview hint */}
      <div className="fixed top-4 right-4 z-40">
        <button
          onClick={() => setShowOverview(true)}
          className="font-mono text-xs text-text-tertiary hover:text-accent transition-colors glass rounded-md px-2 py-1"
          title="Press O for overview"
        >
          Overview (O)
        </button>
      </div>
    </div>
  );
}
