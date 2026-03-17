import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ParallaxWrapper = ({ children, speed = 1, className = '' }) => {
  const triggerRef = useRef(null);
  const targetRef = useRef(null);

  useEffect(() => {
    const yValue = 100 * speed;

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: triggerRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });

    timeline.fromTo(
      targetRef.current,
      { y: -yValue },
      { y: yValue, ease: 'none' }
    );

    return () => {
      if (timeline) timeline.kill();
    };
  }, [speed]);

  return (
    <div ref={triggerRef} className={`overflow-hidden ${className}`}>
      <div ref={targetRef} className="h-full w-full">
        {children}
      </div>
    </div>
  );
};

export default ParallaxWrapper;
