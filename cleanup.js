const fs = require('fs');
const path = require('path');

// List of files that conflict with Next.js or are duplicates of new structure
const filesToDelete = [
  'vite.config.ts',
  'index.html',
  'index.tsx',
  'App.tsx',
  'types.ts',          // Replaced by types/index.ts
  'services/wpApi.ts', // Replaced by lib/wpApi.ts
  'constants/translations.ts', // Replaced by lib/translations.ts
  'postcss.config.js', // Next.js handles this, keeping it clean
];

// List of folders to remove if empty or legacy
const foldersToDelete = [
  'services',
  'constants'
];

console.log('🧹 STARTING AUTO-CLEANUP for Next.js Migration...');

filesToDelete.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    try {
      fs.unlinkSync(filePath);
      console.log(`✅ Deleted File: ${file}`);
    } catch (err) {
      console.error(`❌ Error deleting ${file}:`, err.message);
    }
  } else {
    // console.log(`cw Skipped (already gone): ${file}`);
  }
});

foldersToDelete.forEach(folder => {
  const folderPath = path.join(__dirname, folder);
  if (fs.existsSync(folderPath)) {
    try {
      // Only delete if empty or force recursive if you are sure
      // using recursive: true just in case loose files remain
      fs.rmSync(folderPath, { recursive: true, force: true });
      console.log(`✅ Deleted Folder: ${folder}`);
    } catch (err) {
      console.error(`❌ Error deleting folder ${folder}:`, err.message);
    }
  }
});

console.log('✨ Cleanup complete! Building Next.js app...');
// NOTE: cleanup.js is no longer used in CI. It can be removed.

