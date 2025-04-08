'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ImageData, Category } from '@/types';

interface CategoryViewProps {
  categories: Category[];
  images: { [key in Category]: ImageData[] };
  onCategorySelect: (category: Category) => void;
}

export default function CategoryView({ categories, images, onCategorySelect }: CategoryViewProps) {
  return (
    <div className="space-y-12">
      <h2 className="text-xl font-light mb-6">Browse by Category</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((category) => {
          // Get the first image from each category to use as thumbnail
          const thumbnail = images[category]?.[0];
          if (!thumbnail) return null;
          
          return (
            <motion.div
              key={category}
              className="category-card cursor-pointer group"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
              onClick={() => onCategorySelect(category)}
            >
              <div className="aspect-[3/4] overflow-hidden relative">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all z-10" />
                <Image
                  src={`/images/${thumbnail.filename}`}
                  alt={category}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 flex items-center justify-center z-20">
                  <h3 className="text-white text-2xl font-medium tracking-wide">
                    {category}
                  </h3>
                </div>
              </div>
              <p className="mt-2 text-sm text-white/60">
                {images[category].length} photos
              </p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}