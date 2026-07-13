'use client';

import { Suspense, lazy, useRef, useEffect, useState } from 'react';
const Spline = lazy(() => import('@splinetool/react-spline'));

interface InteractiveRobotSplineProps {
  scene: string;
  className?: string;
  /** Inner canvas width in px (default 500). The Spline scene's native width. */
  canvasWidth?: number;
  /** Inner canvas height in px (default 700). The Spline scene's native height. */
  canvasHeight?: number;
}

export function InteractiveRobotSpline({
  scene,
  className,
  canvasWidth = 500,
  canvasHeight = 700,
}: InteractiveRobotSplineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const updateScale = () => {
      if (!containerRef.current) return;
      const containerW = containerRef.current.offsetWidth;
      const containerH = containerRef.current.offsetHeight;
      // Scale to fit the full canvas inside the container (contain)
      const scaleX = containerW / canvasWidth;
      const scaleY = containerH / canvasHeight;
      setScale(Math.min(scaleX, scaleY));
    };

    updateScale();
    const observer = new ResizeObserver(updateScale);
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [canvasWidth, canvasHeight]);

  return (
    <Suspense
      fallback={
        <div className={`w-full h-full flex items-center justify-center text-white ${className}`}>
          <svg className="animate-spin h-5 w-5 text-white mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l2-2.647z"></path>
          </svg>
        </div>
      }
    >
      {/* Outer container — overflow hidden to clip anything outside */}
      <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
        {/*
          Inner div: native Spline canvas size, scaled down to fit the container.
          transform-origin: top center keeps the robot top-anchored so the head is always visible.
        */}
        <div
          style={{
            width: canvasWidth,
            height: canvasHeight,
            position: 'absolute',
            top: 0,
            left: '50%',
            transformOrigin: 'top center',
            transform: `translateX(-50%) scale(${scale})`,
          }}
        >
          <Spline
            scene={scene}
            style={{ width: canvasWidth, height: canvasHeight }}
          />
          {/* Overlay to hide "Built with Spline" watermark at bottom-right of Spline canvas */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              width: '200px',
              height: '60px',
              background: 'oklch(0.18 0 0)',
              zIndex: 10,
              pointerEvents: 'none',
            }}
          />
        </div>
      </div>
    </Suspense>
  );
}
