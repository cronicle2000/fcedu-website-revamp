import React from 'react';
export default function SectionHeader({ eyebrow, title, blurb }:{ eyebrow?:string; title:string; blurb?:string }) {
  return (
    <div className="container-responsive py-6">
      {eyebrow && <div className="badge">{eyebrow}</div>}
      <h2 className="mt-2 text-2xl md:text-3xl font-bold text-conor-primary">{title}</h2>
      {blurb && <p className="mt-2 text-gray-600 max-w-2xl">{blurb}</p>}
    </div>
  );
}
