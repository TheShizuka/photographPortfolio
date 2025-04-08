'use client';

import { useEffect, useState, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import gsap from 'gsap';

interface IntroAnimationProps {
  onAnimationComplete: () => void;
}

export default function IntroAnimation({ onAnimationComplete }: IntroAnimationProps) {
  const [animationComplete, setAnimationComplete] = useState(false);
  const [introSequenceComplete, setIntroSequenceComplete] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const pathName = usePathname();
  const isAnimatingOut = useRef(false);
  
  // Skip animation for non-home pages or returning visitors
  useEffect(() => {
    if (pathName !== '/') {
      setAnimationComplete(true);
      onAnimationComplete();
      return;
    }
    
    const hasVisited = sessionStorage.getItem('hasVisited');
    if (hasVisited) {
      setAnimationComplete(true);
      onAnimationComplete();
      return;
    }
    
    // Temporarily disable scrolling until animation completes
    document.body.style.overflow = 'hidden';
    
    // Run the initial animation sequence with optimized timing
    const timeline = gsap.timeline({
      delay: 0.3, // Reduced delay
      onComplete: () => {
        setIntroSequenceComplete(true);
      }
    });
    

    // Initial columns animation with reduced duration
    timeline.to(".col", {
      top: "0",
      duration: 2.5, // Reduced from 3.5
      ease: "power4.inOut",
      stagger: 0.05
    });

    // Staggered items animations with reduced duration
    timeline.to(".c-1 .item", {
      top: "0",
      stagger: 0.15, // Reduced from 0.25
      duration: 2, // Reduced from 3
      ease: "power4.inOut"
    }, "-=2.5");

    timeline.to(".c-2 .item", {
      top: "0",
      stagger: -0.15, // Reduced from -0.25
      duration: 2, // Reduced from 3
      ease: "power4.inOut"
    }, "-=2.5");

    timeline.to(".c-3 .item", {
      top: "0",
      stagger: 0.15, // Reduced from 0.25
      duration: 2, // Reduced from 3
      ease: "power4.inOut"
    }, "-=2.5");

    timeline.to(".c-4 .item", {
      top: "0",
      stagger: -0.15, // Reduced from -0.25
      duration: 2, // Reduced from 3
      ease: "power4.inOut"
    }, "-=2.5");

    timeline.to(".c-5 .item", {
      top: "0",
      stagger: 0.15, // Reduced from 0.25
      duration: 2, // Reduced from 3
      ease: "power4.inOut"
    }, "-=2.5");

    // Optimized zoom effect with reduced duration
    timeline.to(".intro-container", {
      scale: 3.5, // Reduced from 6 for less intensity
      duration: 2.5, // Shortened duration
      ease: "power3.inOut", // Smoother easing
      force3D: true
    }, "-=1.5");

    // Title animation with reduced duration
    timeline.fromTo(".portfolio-title", 
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1.5, ease: "power2.out" }, // Reduced from 2
      "-=1.5"
    );

    return () => {
      timeline.kill();
      document.body.style.overflow = 'auto';
    };
  }, [pathName, onAnimationComplete]);

  // Add event listeners for scroll/click to transition to gallery with improved handling
  useEffect(() => {
    if (!introSequenceComplete) return;

    // Show the continue text when intro sequence is complete
    gsap.fromTo(".continue-text", 
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
    );

    const handleInteraction = () => {
      // Prevent multiple animations from triggering
      if (isAnimatingOut.current) return;
      isAnimatingOut.current = true;
      
      // Faster transition out
      const outTimeline = gsap.timeline({
        onComplete: () => {
          // Ensure we're at the top of the page when showing the gallery
          window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'auto'
          });
          
          // Re-enable scrolling
          document.body.style.overflow = 'auto';
          setAnimationComplete(true);
          onAnimationComplete();
          sessionStorage.setItem('hasVisited', 'true');
        }
      });

      // Faster fade with scale adjustment
      outTimeline.to(".intro-container", {
        opacity: 0,
        scale: 7,
        duration: 1.3, // Reduced from 2.2
        ease: "power2.inOut"
      });

      outTimeline.to(".portfolio-title, .continue-text", {
        opacity: 0,
        y: -30,
        duration: 0.8, // Reduced from 1.4
        ease: "power3.inOut"
      }, "-=1.3");
    };

    // Use simpler event listeners for better cross-device compatibility
    window.addEventListener('wheel', handleInteraction, { once: true });
    window.addEventListener('touchstart', handleInteraction, { once: true });
    window.addEventListener('click', handleInteraction, { once: true });
    window.addEventListener('keydown', handleInteraction, { once: true });
    
    return () => {
      window.removeEventListener('wheel', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('keydown', handleInteraction);
      document.body.style.overflow = 'auto';
    };
  }, [introSequenceComplete, onAnimationComplete]);
  
  if (animationComplete) return null;
  
  const columns = 5;
  const itemsPerColumn = 5;
  
  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-[#141414]">
      <div ref={containerRef} className="intro-container w-full h-full flex relative">
        {Array.from({ length: columns }).map((_, colIndex) => (
          <div
            key={`col-${colIndex}`}
            className={`col c-${colIndex + 1} flex-1 flex flex-col gap-1 relative`}
            style={{ 
              top: colIndex % 2 === 0 ? '100%' : '-100%'
            }}
          >
            {Array.from({ length: itemsPerColumn }).map((_, itemIndex) => (
              <div
                key={`item-${colIndex}-${itemIndex}`}
                className="item flex-1 w-full overflow-hidden bg-gray-800 relative"
                style={{ 
                  top: colIndex % 2 === 0 ? '100%' : '-100%'
                }}
              >
                <div className="w-full h-full relative">
                  <Image 
                    src={`/images/intro/${colIndex * itemsPerColumn + itemIndex + 1}.webp`}
                    alt=""
                    fill
                    sizes="20vw"
                    className="object-cover"
                    priority={colIndex * itemsPerColumn + itemIndex < 10}
                  />
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Simplified UI with only the necessary elements */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center z-10 max-w-3xl px-4">
          <h1 className="portfolio-title text-white text-5xl md:text-7xl font-light tracking-tighter opacity-0">
            Photography Portfolio
          </h1>
          
          {introSequenceComplete && (
            <p className="continue-text text-white/70 mt-6 text-lg opacity-0">
              Click or tap to continue
            </p>
          )}
        </div>
      </div>
    </div>
  );
}