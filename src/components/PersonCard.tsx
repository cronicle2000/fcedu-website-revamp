import React from 'react';
export default function PersonCard({ photo, name, role, bio }:{ photo:string; name:string; role:string; bio:string }) {
  return (
    <article className="card flex gap-4">
      <img src={photo} alt={name} className="h-20 w-20 rounded-2xl object-cover" />
      <div>
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-sm text-conor-primary">{role}</p>
        <p className="mt-2 text-sm text-gray-600 line-clamp-3">{bio}</p>
      </div>
    </article>
  );
}
