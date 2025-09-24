import React from 'react';
import { Menu } from 'lucide-react';
import { useState } from 'react';

const links = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/programs', label: 'Programs' },
  { href: '/branches', label: 'Branches' },
  { href: '/news', label: 'News' },
  { href: '/contact', label: 'Contact' },
];

export default function NavBar() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="flex items-center justify-between py-3" aria-label="Primary">
      <a href="/" className="flex items-center gap-2 font-semibold text-conor-primary">
        <img src="/logo.png" alt="Conor logo" className="h-8 w-8" />
        <span>Conor</span>
      </a>
      <div className="hidden md:flex items-center gap-6">
        {links.map(l => (
          <a key={l.href} href={l.href} className="text-sm text-gray-700 hover:text-conor-primary font-medium">{l.label}</a>
        ))}
        <a href="/zh/" className="text-sm text-gray-700 hover:text-conor-primary font-medium">中文</a>
      </div>
      <button aria-label="Menu" className="md:hidden btn btn-ghost" onClick={() => setOpen(!open)}>
        <Menu aria-hidden="true" />
      </button>
      {open && (
        <div className="absolute left-0 right-0 top-full bg-white border-b border-black/10 md:hidden">
          <div className="container-responsive py-3 flex flex-col gap-2">
            {links.map(l => (
              <a key={l.href} href={l.href} className="py-2">{l.label}</a>
            ))}
            <a href="/zh/" className="py-2">中文</a>
          </div>
        </div>
      )}
    </nav>
  );
}
