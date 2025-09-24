import React, { useId, useState } from 'react';
import Button from './Button';

export type Program = {
  slug: string;
  title: string;
  description?: string;
  image?: string;
  levels?: string[];
  ageRange?: string;
  outcomes?: string[];
};

export default function ProgramCard({ program }: { program: Program }) {
  const [open, setOpen] = useState(false);
  const id = useId();

  return (
    <article className="card flex flex-col">
      <img src={program.image || '/placeholder-program.jpg'} alt="" className="rounded-xl object-cover w-full h-40" />
      <h3 className="mt-3 text-lg font-semibold text-conor-primary">{program.title}</h3>
      {program.ageRange && <p className="text-sm text-gray-500">Age: {program.ageRange}</p>}
      <p className="mt-2 text-gray-600 line-clamp-3">{program.description}</p>
      <div className="mt-4">
        <Button onClick={() => setOpen(true)}>See details</Button>
      </div>

      {open && (
        <div role="dialog" aria-modal="true" aria-labelledby={`${id}-title`} className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="max-w-xl w-full bg-white rounded-2xl p-6">
            <div className="flex items-start justify-between gap-6">
              <div>
                <h3 id={`${id}-title`} className="text-xl font-bold text-conor-primary">{program.title}</h3>
                {program.ageRange && <p className="text-sm text-gray-500 mt-1">Age: {program.ageRange}</p>}
              </div>
              <button className="btn btn-ghost" onClick={() => setOpen(false)} aria-label="Close">✕</button>
            </div>
            {program.outcomes && (
              <ul className="mt-4 list-disc pl-5 text-gray-700 space-y-1">
                {program.outcomes.map((o,i) => <li key={i}>{o}</li>)}
              </ul>
            )}
            <div className="mt-6 flex justify-end">
              <Button variant="ghost" onClick={() => setOpen(false)}>Close</Button>
            </div>
          </div>
        </div>
      )}
    </article>
  );
}
