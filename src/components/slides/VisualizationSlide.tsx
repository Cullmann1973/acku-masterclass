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
      gsap.fromTo(title, { opacity: 0, y: 15 }, {
        opacity: 1, y: 0, duration: 0.5, delay: 0.1,
      });

      const subtitle = containerRef.current!.querySelector('.viz-subtitle');
      if (subtitle) {
        gsap.fromTo(subtitle, { opacity: 0 }, { opacity: 1, duration: 0.4, delay: 0.3 });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [isActive]);

  useEffect(() => {
    if (!isActive) hasAnimated.current = false;
  }, [isActive]);

  const VisualizationComponent = slide.visualization ? visualizationMap[slide.visualization] : null;

  return (
    <div ref={containerRef} className="h-full flex flex-col items-center justify-center px-4 py-8">
      {/* Title */}
      <h2 className="viz-title font-serif text-2xl md:text-3xl font-bold text-text-primary text-center mb-2">
        {slide.title}
      </h2>

      {/* Subtitle */}
      {slide.subtitle && (
        <p className="viz-subtitle text-sm text-text-secondary text-center mb-8 max-w-2xl">
          {slide.subtitle}
        </p>
      )}

      {/* Visualization */}
      <div className="w-full flex-1 flex items-center justify-center min-h-0">
        {VisualizationComponent && <VisualizationComponent isActive={isActive} />}
      </div>
    </div>
  );
}
