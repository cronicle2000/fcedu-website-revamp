import React from 'react';

export default function LogoWall({ logos }:{ logos: {src:string; alt:string; href?:string;}[]}) {
  return (
    <section className="container-responsive py-8 md:py-12">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 opacity-80">
        {logos.map((l, i) => (
          <a key={i} href={l.href ?? '#'} className="flex items-center justify-center grayscale hover:grayscale-0 transition" aria-label={l.alt}>
            <img src={l.src} alt={l.alt} className="max-h-10 object-contain" />
          </a>
        ))}
      </div>
    </section>
  );
}
