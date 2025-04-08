'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import PhotoDetail from './PhotoDetail';
import FilterBar from './FilterBar';
import CategoryView from './CategoryView';
import { ImageData, Camera, City, Year, Category } from '@/types';
import { getFilterOptions } from '@/data/images';
const filterOptions = getFilterOptions();

interface GalleryProps {
  images: ImageData[];
}

export default function Gallery({ images }: GalleryProps) {
  const [selectedImage, setSelectedImage] = useState<ImageData | null>(null);
  const [visibleImages, setVisibleImages] = useState<{[key: number]: boolean}>({});
  const [filteredImages, setFilteredImages] = useState<ImageData[]>(
    [...images].sort((a, b) => b.year - a.year)
  );
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [viewMode, setViewMode] = useState<'categories' | 'gallery'>('categories');
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Group images by category
  const categorizedImages = images.reduce((acc, image) => {
    if (!acc[image.category]) {
      acc[image.category] = [];
    }
    acc[image.category].push(image);
    return acc;
  }, {} as { [key in Category]: ImageData[] });

  // Get list of categories with images
  const availableCategories = Object.keys(categorizedImages) as Category[];

  // Apply filters
  const handleFilterChange = (filters: { cameras: Camera[], cities: City[], years: Year[], categories: Category[] }) => {
    let filtered = [...images];
    
    if (filters.cameras.length > 0) {
      filtered = filtered.filter(img => filters.cameras.includes(img.camera));
    }
    
    if (filters.cities.length > 0) {
      filtered = filtered.filter(img => filters.cities.includes(img.location));
    }
    
    if (filters.years.length > 0) {
      filtered = filtered.filter(img => filters.years.includes(img.year));
    }
    
    if (filters.categories.length > 0) {
      filtered = filtered.filter(img => filters.categories.includes(img.category));
    }
    
    // Sort by year (newest first)
    filtered = filtered.sort((a, b) => b.year - a.year);
    
    setFilteredImages(filtered);
  };

  // Handle category selection
  const handleCategorySelect = (category: Category) => {
    setSelectedCategory(category);
    setViewMode('gallery');
    setFilteredImages(categorizedImages[category].sort((a, b) => b.year - a.year));
  };

  // Return to category view
  const handleBackToCategories = () => {
    setSelectedCategory(null);
    setViewMode('categories');
    setFilteredImages([...images].sort((a, b) => b.year - a.year));
  };

  // Observer for image animations on scroll
  useEffect(() => {
    if (viewMode !== 'gallery') return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && (entry.target as HTMLElement).dataset.index) {
            setVisibleImages((prev) => ({
              ...prev,
              [(entry.target as HTMLElement).dataset.index as string]: true,
            }));
          }
        });
      },
      { threshold: 0.15 }
    );
  
    // Store a copy of the current refs for cleanup
    const currentRefs = imageRefs.current;
    
    currentRefs.forEach((ref) => {
      if (ref) observer.observe(ref);
    });
  
    return () => {
      currentRefs.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [filteredImages, viewMode]);

  return (
    <>
      <div className="max-w-7xl mx-auto w-full">
        {viewMode === 'gallery' && (
          <>
            <div className="flex items-center justify-between mb-8">
              {selectedCategory && (
                <button 
                  onClick={handleBackToCategories}
                  className="flex items-center text-white/70 hover:text-white transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 12H5M12 19l-7-7 7-7"/>
                  </svg>
                  <span className="ml-2">Back to Categories</span>
                </button>
              )}
              <h2 className="text-xl font-light">{selectedCategory || 'All Photos'}</h2>
            </div>
            
            <FilterBar 
              filterOptions={{
                ...filterOptions,
                categories: availableCategories
              }}
              onFilterChange={handleFilterChange}
            />
            
            {filteredImages.length === 0 ? (
              <div className="text-center py-20 text-white/70">
                <p className="text-xl">No photos match your selected filters.</p>
                <p className="mt-2">Try adjusting your filter criteria.</p>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8"
              >
                {filteredImages.map((image, index) => (
                  <div
                    key={image.id}
                    ref={(el) => {imageRefs.current[index] = el}}
                    data-index={index}
                    className={`image-container gallery-image ${
                      visibleImages[index] ? 'visible' : ''
                    }`}
                    style={{ 
                      transitionDelay: `${index % 10 * 0.1}s`,
                    }}
                    onClick={() => setSelectedImage(image)}
                  >
                    <div className="relative aspect-[3/4] overflow-hidden">
                      <Image
                        src={`/images/${image.filename}`}
                        alt={`${image.location}, ${image.year}`}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover"
                        priority={index < 6}
                      />
                    </div>
                    <div className="mt-2 text-sm flex justify-between">
                      <span className="opacity-60">{image.location}</span>
                      <span className="opacity-60">{image.year}</span>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </>
        )}
        
        {viewMode === 'categories' && (
          <CategoryView 
            categories={availableCategories}
            images={categorizedImages}
            onCategorySelect={handleCategorySelect}
          />
        )}
      </div>

      {selectedImage && (
        <PhotoDetail
          image={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </>
  );
}