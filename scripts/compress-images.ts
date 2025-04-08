import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

// Configuration
const inputFolder = './original-photos';
const outputFolder = './public/images';
const quality = 80; // 0-100, higher means better quality but larger file size
const maxWidth = 1920; // maximum width for photos

// Ensure output directory exists
if (!fs.existsSync(outputFolder)) {
  fs.mkdirSync(outputFolder, { recursive: true });
}

// Get all files from input directory
const files = fs.readdirSync(inputFolder)
  .filter(file => /\.(jpg|jpeg|png|tiff|heic)$/i.test(file))
  .sort((a, b) => {
    // Natural sort by filename if possible
    const aNum = parseInt(a.match(/\d+/)?.[0] || '0');
    const bNum = parseInt(b.match(/\d+/)?.[0] || '0');
    return aNum - bNum;
  });

// Process each image
(async () => {
  console.log(`Found ${files.length} images to process`);
  
  for (let i = 0; i < files.length; i++) {
    const inputPath = path.join(inputFolder, files[i]);
    const outputFilename = `${i+1}.webp`;
    const outputPath = path.join(outputFolder, outputFilename);
    
    try {
      // Get image metadata
      const metadata = await sharp(inputPath).metadata();
      
      // Calculate new dimensions to maintain aspect ratio
      const resizeWidth = Math.min(metadata.width || maxWidth, maxWidth);
      
      // Process the image
      await sharp(inputPath)
        .resize(resizeWidth, null, { fit: 'inside' })
        .webp({ quality })
        .toFile(outputPath);
      
      const inputStats = fs.statSync(inputPath);
      const outputStats = fs.statSync(outputPath);
      const compressionRatio = ((1 - (outputStats.size / inputStats.size)) * 100).toFixed(2);
      
      console.log(`[${i+1}/${files.length}] ${files[i]} → ${outputFilename} (${compressionRatio}% reduction)`);
    } catch (error) {
      console.error(`Error processing ${files[i]}:`, error);
    }
  }
  
  console.log('Compression complete!');
})();