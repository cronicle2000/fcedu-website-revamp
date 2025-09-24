import React from 'react';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <div className="py-10 text-sm text-gray-500 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <div className="flex items-center gap-2">
        <img src="/logo.png" alt="" className="h-6 w-6" />
        <span>Conor by FCEDU</span>
      </div>
      <div className="flex gap-4">
        <a href="/privacy">Privacy</a>
        <a href="/terms">Terms</a>
        <a href="/sitemap-index.xml">Sitemap</a>
      </div>
      <div>© {year} FCEDU. All rights reserved.</div>
    </div>
  );
}
