'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Gallery from '@/components/Gallery';
import Navigation from '@/components/Navigation';
import IntroAnimation from '@/components/IntroAnimation';
import { getAllImages } from '@/lib/images';
import { motion } from 'framer-motion';

// Get images on the server
const images = getAllImages();

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
      
      {/* Main Content */}
      {(animationComplete || imagesLoaded) && (
        <>
          <Navigation />
          
          <motion.section 
            className="pt-20 px-4 md:px-12 lg:px-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.8, 
              ease: [0.19, 1, 0.22, 1],
              delay: animationComplete ? 0 : 0.5
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
              delay: animationComplete ? 0.2 : 0.7
            }}
          >
            <p>© {new Date().getFullYear()} Photography Portfolio</p>
          </motion.footer>
        </>
      )}
    </main>
  );
}