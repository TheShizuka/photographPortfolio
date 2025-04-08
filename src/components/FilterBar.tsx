'use client';

import { useState } from 'react';
import { Camera, City, Year, Category, FilterOptions } from '@/types';
import { motion } from 'framer-motion';

interface FilterBarProps {
  filterOptions: FilterOptions;
  onFilterChange: (filters: { cameras: Camera[], cities: City[], years: Year[], categories: Category[] }) => void;
}

export default function FilterBar({ filterOptions, onFilterChange }: FilterBarProps) {
  const [selectedCameras, setSelectedCameras] = useState<Camera[]>([]);
  const [selectedCities, setSelectedCities] = useState<City[]>([]);
  const [selectedYears, setSelectedYears] = useState<Year[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  
  const handleCameraToggle = (camera: Camera) => {
    setSelectedCameras(prev => 
      prev.includes(camera) 
        ? prev.filter(c => c !== camera) 
        : [...prev, camera]
    );
  };
  
  const handleCityToggle = (city: City) => {
    setSelectedCities(prev => 
      prev.includes(city) 
        ? prev.filter(c => c !== city) 
        : [...prev, city]
    );
  };
  
  const handleYearToggle = (year: Year) => {
    setSelectedYears(prev => 
      prev.includes(year) 
        ? prev.filter(y => y !== year) 
        : [...prev, year]
    );
  };
  
  const handleCategoryToggle = (category: Category) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category) 
        : [...prev, category]
    );
  };
  
  const handleReset = () => {
    setSelectedCameras([]);
    setSelectedCities([]);
    setSelectedYears([]);
    setSelectedCategories([]);
    onFilterChange({ cameras: [], cities: [], years: [], categories: [] });
  };
  
  const applyFilters = () => {
    onFilterChange({
      cameras: selectedCameras,
      cities: selectedCities,
      years: selectedYears,
      categories: selectedCategories
    });
    setIsOpen(false);
  };
  
  return (
    <div className="w-full mb-10">
      <div className="flex justify-between items-center mb-4">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="px-4 py-2 bg-white/10 hover:bg-white/15 rounded-md transition-colors"
        >
          {isOpen ? 'Close Filter' : 'Filter Photos'}
        </button>
        
        {(selectedCameras.length > 0 || selectedCities.length > 0 || selectedYears.length > 0 || selectedCategories.length > 0) && (
          <div className="flex items-center gap-4">
            <div className="flex flex-wrap gap-2">
              {selectedCameras.map(camera => (
                <span key={camera} className="px-2 py-1 bg-white/10 rounded text-xs">
                  {camera}
                </span>
              ))}
              {selectedCities.map(city => (
                <span key={city} className="px-2 py-1 bg-white/10 rounded text-xs">
                  {city}
                </span>
              ))}
              {selectedYears.map(year => (
                <span key={year} className="px-2 py-1 bg-white/10 rounded text-xs">
                  {year}
                </span>
              ))}
              {selectedCategories.map(category => (
                <span key={category} className="px-2 py-1 bg-white/10 rounded text-xs">
                  {category}
                </span>
              ))}
            </div>
            <button 
              onClick={handleReset}
              className="text-white/60 hover:text-white text-sm transition-colors"
            >
              Reset
            </button>
          </div>
        )}
      </div>
      
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-black/30 backdrop-blur-sm rounded-lg p-6 mb-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg mb-3 font-medium">Category</h3>
              <div className="space-y-2">
                {filterOptions.categories?.map(category => (
                  <label key={category} className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(category)}
                      onChange={() => handleCategoryToggle(category)}
                      className="mr-2 accent-white"
                    />
                    <span className="text-sm">{category}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg mb-3 font-medium">Camera</h3>
              <div className="space-y-2">
                {filterOptions.cameras.map(camera => (
                  <label key={camera} className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedCameras.includes(camera)}
                      onChange={() => handleCameraToggle(camera)}
                      className="mr-2 accent-white"
                    />
                    <span className="text-sm">{camera}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg mb-3 font-medium">Location</h3>
              <div className="space-y-2">
                {filterOptions.cities.map(city => (
                  <label key={city} className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedCities.includes(city)}
                      onChange={() => handleCityToggle(city)}
                      className="mr-2 accent-white"
                    />
                    <span className="text-sm">{city}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg mb-3 font-medium">Year</h3>
              <div className="space-y-2">
                {filterOptions.years.sort((a, b) => b - a).map(year => (
                  <label key={year} className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedYears.includes(year)}
                      onChange={() => handleYearToggle(year)}
                      className="mr-2 accent-white"
                    />
                    <span className="text-sm">{year}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex justify-end">
            <button
              onClick={applyFilters}
              className="px-4 py-2 bg-white text-black rounded-md hover:bg-white/90 transition-colors"
            >
              Apply Filters
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}