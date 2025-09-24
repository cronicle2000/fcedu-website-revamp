import React from 'react';
export default function ValuePropCard({ title, desc }:{ title:string; desc:string }) {
  return (
    <div className="card h-full">
      <h3 className="text-lg font-semibold text-conor-primary">{title}</h3>
      <p className="mt-2 text-gray-600">{desc}</p>
    </div>
  );
}
