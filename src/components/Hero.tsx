import React from 'react';
import Button from './Button';

export default function Hero({ title, subtitle, primaryHref = '/programs', secondaryHref = '/contact' }:
  { title: string; subtitle?: string; primaryHref?: string; secondaryHref?: string; }) {
  return (
    <section className="container-responsive py-16 md:py-24">
      <div className="grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="font-heading text-4xl md:text-5xl font-extrabold tracking-tight text-conor-primary">{title}</h1>
          {subtitle && <p className="mt-4 text-lg text-gray-600">{subtitle}</p>}
          <div className="mt-8 flex items-center gap-4">
            <Button asChild={false} variant="primary" onClick={() => (window.location.href = primaryHref)}>Explore Programs</Button>
            <Button asChild={false} variant="ghost" onClick={() => (window.location.href = secondaryHref)}>Contact Us</Button>
          </div>
        </div>
        <div className="rounded-3xl overflow-hidden shadow-[var(--shadow-card)] bg-gradient-to-br from-conor-secondary/10 to-conor-primary/10 min-h-[240px] md:min-h-[320px] flex items-center justify-center">
          <img src="/hero-illustration.png" alt="" className="w-3/4 max-w-[420px]" />
        </div>
      </div>
    </section>
  );
}
