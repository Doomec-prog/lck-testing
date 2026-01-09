const fs = require('fs');
const path = require('path');

const filesToDelete = [
  'index.html',
  'index.tsx',
  'App.tsx',
  'vite.config.ts',
  'api/chat.js',
  'postcss.config.js', // We will stick to the Next.js standard config if needed, or recreate it correctly
];

console.log('🧹 Cleaning up legacy files for Structural Hygiene...');

filesToDelete.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    try {
      fs.unlinkSync(filePath);
      console.log(`✅ Deleted: ${file}`);
    } catch (err) {
      console.error(`❌ Error deleting ${file}:`, err.message);
    }
  } else {
    console.log(`cw Skipped (not found): ${file}`);
  }
});

console.log('\n✨ Root cleanup complete!');
console.log('👉 Next step: We will update component imports and then delete "services/", "constants/", and "types.ts".');
