'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import type { Slide } from '@/lib/slideData';
import { MaturityModel } from '@/components/visualizations/MaturityModel';
import { ImpactMatrix } from '@/components/visualizations/ImpactMatrix';
import { AckuPipeline } from '@/components/visualizations/AckuPipeline';
import { AdoptionCurve } from '@/components/visualizations/AdoptionCurve';
import { TrustEquation } from '@/components/visualizations/TrustEquation';
import { Timeline } from '@/components/visualizations/Timeline';
import { RiskFramework } from '@/components/visualizations/RiskFramework';
import { RiskTiers } from '@/components/visualizations/RiskTiers';
import { UseCaseTiers } from '@/components/visualizations/UseCaseTiers';
import { CapabilityTiers } from '@/components/visualizations/CapabilityTiers';

interface VisualizationSlideProps {
  slide: Slide;
  isActive: boolean;
}

const visualizationMap: Record<string, React.ComponentType<{ isActive: boolean }>> = {
  'maturity-model': MaturityModel,
  'impact-matrix': ImpactMatrix,
  'acku-pipeline': AckuPipeline,
  'adoption-curve': AdoptionCurve,
  'trust-equation': TrustEquation,
  'timeline': Timeline,
  'risk-framework': RiskFramework,
  'risk-tiers': RiskTiers,
  'use-case-tiers': UseCaseTiers,
  'capability-tiers': CapabilityTiers,
};

export function VisualizationSlide({ slide, isActive }: VisualizationSlideProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isActive || !containerRef.current || hasAnimated.current) return;
    hasAnimated.current = true;

    const ctx = gsap.context(() => {
      const title = containerRef.current!.querySelector('.viz-title');
      gsap.fromTo(title, { opacity: 0, y: 18 }, {
        opacity: 1, y: 0, duration: 0.6, delay: 0.1, ease: 'power3.out',
      });

      const subtitle = containerRef.current!.querySelector('.viz-subtitle');
      if (subtitle) {
        gsap.fromTo(subtitle, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5, delay: 0.25, ease: 'power3.out' });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [isActive]);

  useEffect(() => {
    if (!isActive) hasAnimated.current = false;
  }, [isActive]);

  const VisualizationComponent = slide.visualization ? visualizationMap[slide.visualization] : null;

  return (
    <div ref={containerRef} className="h-full flex flex-col items-center justify-start md:justify-center px-4 md:px-8 py-12 md:py-8">
      {/* Title - refined sizing */}
      <h2 className="viz-title font-serif text-xl md:text-2xl lg:text-3xl font-bold text-text-primary text-center mb-2 shrink-0 tracking-tight">
        {slide.title}
      </h2>

      {/* Subtitle */}
      {slide.subtitle && (
        <p className="viz-subtitle text-sm text-text-tertiary text-center mb-6 md:mb-8 max-w-2xl shrink-0 font-light">
          {slide.subtitle}
        </p>
      )}

      {/* Visualization */}
      <div className="w-full flex-1 flex items-start md:items-center justify-center min-h-0 max-h-[calc(100%-6rem)] overflow-y-auto overflow-x-hidden">
        {VisualizationComponent && <VisualizationComponent isActive={isActive} />}
      </div>
    </div>
  );
}
