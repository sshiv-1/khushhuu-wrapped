const fs = require('fs');
const path = require('path');

const dir = './src/components/wrapped';
const files = fs.readdirSync(dir).filter(f => f.startsWith('Slide'));

files.forEach(file => {
  const filepath = path.join(dir, file);
  let content = fs.readFileSync(filepath, 'utf-8');
  
  if (!content.includes('useSlideAudio')) {
    // Add import
    content = content.replace(
      'import { motion', 
      'import { useSlideAudio } from "@/hooks/useSlideAudio";\nimport { motion'
    );
    
    // For files that don't have motion imported but are slides
    if (!content.includes('useSlideAudio')) {
      content = content.replace(
        '"use client";\n',
        '"use client";\n\nimport { useSlideAudio } from "@/hooks/useSlideAudio";\n'
      );
    }
    
    // Replace export default function Slide...() {
    content = content.replace(
      /export default function (\w+)\(\) \{/g,
      'export default function $1({ isActive = false, previewUrl }: { isActive?: boolean, previewUrl?: string }) {\n  useSlideAudio(previewUrl, isActive);'
    );
    
    fs.writeFileSync(filepath, content);
  }
});
