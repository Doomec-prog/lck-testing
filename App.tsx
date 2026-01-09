import React from 'react';

// This file is deprecated in favor of Next.js App Router (app/layout.tsx).
// We replace the content to ensure it doesn't import components that use 'next/link' or 'next/navigation',
// which would cause a "useContext" error if run outside of Next.js.

const App: React.FC = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#050505', color: '#fff' }}>
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Migrated to Next.js</h1>
        <p>This application now uses the Next.js App Router.</p>
        <p style={{ marginTop: '1rem', color: '#888' }}>If you are seeing this, please run <code>npm run dev</code> (next dev) instead of vite.</p>
      </div>
    </div>
  );
};

export default App;