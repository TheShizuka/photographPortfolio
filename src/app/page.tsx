'use client';

import { useState, useEffect } from 'react';
import Gallery from '@/components/Gallery';
import Navigation from '@/components/Navigation';
import IntroAnimation from '@/components/IntroAnimation';
import { images } from '@/data/images';
import { motion } from 'framer-motion';

export default function Home() {
  const [animationComplete, setAnimationComplete] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  
  // Mark images as loaded
  useEffect(() => {
    const timer = setTimeout(() => {
      setImagesLoaded(true);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <main className="min-h-screen bg-[#141414] text-white overflow-x-hidden">
      {/* Intro Animation */}
      <IntroAnimation onAnimationComplete={() => setAnimationComplete(true)} />
      
      {/* Main Content - Only show navigation when animation is fully complete */}
      {animationComplete && (
        <>
          <Navigation />
          
          <motion.section 
            className="pt-20 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.8, 
              ease: [0.19, 1, 0.22, 1]
            }}
          >
            <Gallery images={images} />
          </motion.section>
          
          <motion.footer
            className="py-10 px-4 text-center text-white/50 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ 
              duration: 0.8, 
              delay: 0.2
            }}
          >
          </motion.footer>
        </>
      )}
    </main>
  );
}