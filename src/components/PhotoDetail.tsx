'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ImageData } from '@/types';

interface PhotoDetailProps {
  image: ImageData;
  onClose: () => void;
}

export default function PhotoDetail({ image, onClose }: PhotoDetailProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Disable body scroll when modal is open
    document.body.style.overflow = 'hidden';
    
    // Handle escape key press
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);
  
  // Close when clicking outside the image
  const handleOutsideClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  return (
    <motion.div 
      className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 md:p-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      onClick={handleOutsideClick}
    >
      <button 
        className="absolute top-6 right-6 text-white opacity-70 hover:opacity-100 z-10 transition-opacity"
        onClick={onClose}
        aria-label="Close"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
      
      <div 
        ref={modalRef}
        className="relative w-full max-w-5xl max-h-[85vh] flex flex-col"
      >
        {/* White border design for the image */}
        <div className="relative h-[75vh] w-full p-3 bg-white">
          {/* Add a film-like frame design with small perforations */}
          <div className="absolute top-0 bottom-0 left-0 w-6 flex flex-col justify-between py-4">
            {Array.from({ length: 20 }).map((_, i) => (
              <div key={i} className="w-3 h-2 bg-gray-300 rounded-sm"></div>
            ))}
          </div>
          
          {/* Main image area */}
          <div className="relative h-full w-full bg-black">
            <Image
              src={`/images/${image.filename}`}
              alt={`${image.location}, ${image.year}`}
              fill
              sizes="(max-width: 1024px) 100vw, 80vw"
              className="object-contain"
              priority
            />
          </div>
          
          {/* Photo info banner at the bottom */}
          <div className="absolute bottom-3 left-6 right-0 px-4 py-2 bg-white/90 text-black text-xs font-mono flex justify-between">
            <span>{image.location} · {image.year}</span>
            <span>{image.camera} · {image.lens} {image.aperture && `· f/${image.aperture}`}</span>
          </div>
        </div>
        
        <motion.div 
          className="photo-detail visible mt-6 flex flex-col md:flex-row md:justify-between text-white/80"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div>
            <h2 className="text-xl font-light">{image.location}</h2>
            <p className="text-sm opacity-70 mt-1">{image.description}</p>
            <p className="text-sm mt-2">Category: <span className="opacity-90">{image.category}</span></p>
          </div>
          <div className="mt-4 md:mt-0 md:text-right space-y-1">
            <p className="text-sm">{image.camera}</p>
            <p className="text-sm opacity-70">{image.lens}</p>
            {image.aperture && <p className="text-sm opacity-70">f/{image.aperture}</p>}
            <p className="text-sm opacity-70">{image.year}</p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}