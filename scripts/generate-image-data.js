// scripts/generate-image-data.js
const fs = require('fs');
const path = require('path');

const baseDir = path.join(process.cwd(), 'public', 'images');
const outputFile = path.join(process.cwd(), 'src', 'data', 'images.ts');

// Camera metadata
const cameraMeta = {
  'Sony PowerShot': { years: [2018], lens: 'Default PowerShot Lens' },
  'Panasonic Lumix G7': { years: [2018, 2019], lens: 'Panasonic Kit Lens' },
  'Sony A7III': { years: [2020, 2021, 2022], lens: 'Sigma 85mm f/1.4' },
  'Sony A7CR': { years: [2023, 2024], lens: 'Sigma 100-400mm' }
};

// Scan directories
const images = [];
let id = 1;

function scanDir(dir, camera, location) {
  if (!fs.existsSync(dir)) return;
  
  fs.readdirSync(dir).forEach(file => {
    if (file.endsWith('.webp') || file.endsWith('.jpg') || file.endsWith('.jpeg') || file.endsWith('.png')) {
      const year = cameraMeta[camera].years[cameraMeta[camera].years.length - 1];
      images.push({
        id: id++,
        filename: `${camera}/${location}/${file}`,
        camera,
        lens: cameraMeta[camera].lens,
        location,
        year
      });
    }
  });
}

// Scan camera directories
fs.readdirSync(baseDir).forEach(cameraDir => {
  const cameraPath = path.join(baseDir, cameraDir);
  if (fs.statSync(cameraPath).isDirectory() && cameraMeta[cameraDir]) {
    // Scan location directories
    fs.readdirSync(cameraPath).forEach(locationDir => {
      const locationPath = path.join(cameraPath, locationDir);
      if (fs.statSync(locationPath).isDirectory()) {
        scanDir(locationPath, cameraDir, locationDir);
      }
    });
  }
});

// Generate TypeScript data file
const fileContent = `
import { ImageData, Camera, City, Year, FilterOptions } from '@/types';

export const images: ImageData[] = ${JSON.stringify(images, null, 2)};

export function getFilterOptions(): FilterOptions {
  const cameras = [...new Set(images.map(img => img.camera))];
  const cities = [...new Set(images.map(img => img.location))];
  const years = [...new Set(images.map(img => img.year))];
  
  return {
    cameras: cameras as Camera[],
    cities: cities as City[],
    years: years as Year[]
  };
}
`;

fs.writeFileSync(outputFile, fileContent);
console.log(`Generated data file with ${images.length} images`);