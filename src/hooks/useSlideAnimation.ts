'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export function useSlideAnimation(slideId: string, isActive: boolean) {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isActive || !containerRef.current || hasAnimated.current) return;

    hasAnimated.current = true;
    const ctx = gsap.context(() => {
      // Animate elements with data-animate attribute
      const elements = containerRef.current!.querySelectorAll('[data-animate]');
      
      gsap.fromTo(
        elements,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          delay: 0.15,
        }
      );

      // Count-up animations for stats
      const counters = containerRef.current!.querySelectorAll('[data-count]');
      counters.forEach((el) => {
        const target = parseFloat(el.getAttribute('data-count') || '0');
        const prefix = el.getAttribute('data-prefix') || '';
        const suffix = el.getAttribute('data-suffix') || '';
        const isDecimal = target % 1 !== 0;

        gsap.fromTo(
          { val: 0 },
          { val: 0 },
          {
            val: target,
            duration: 2,
            delay: 0.5,
            ease: 'power2.out',
            onUpdate: function () {
              const current = this.targets()[0].val;
              const display = isDecimal
                ? current.toFixed(current < 10 ? 1 : 0)
                : Math.round(current).toString();
              (el as HTMLElement).textContent = `${prefix}${display}${suffix}`;
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, [isActive, slideId]);

  // Reset animation state when slide becomes inactive
  useEffect(() => {
    if (!isActive) {
      hasAnimated.current = false;
    }
  }, [isActive]);

  return containerRef;
}
