import React from 'react';

export default function BranchCard(
  { name, address, hours, whatsapp, mapEmbed }:
  { name:string; address:string; hours:string; whatsapp:string; mapEmbed?:string }
) {
  return (
    <article className="card flex flex-col gap-3">
      <h3 className="text-lg font-semibold text-conor-primary">{name}</h3>
      <p className="text-gray-700">{address}</p>
      <p className="text-sm text-gray-500">{hours}</p>
      <div className="aspect-video rounded-xl overflow-hidden bg-gray-100">
        <iframe
          title={`${name} map`}
          src={mapEmbed || import.meta.env.PUBLIC_GOOGLE_MAPS_EMBED_SRC || "https://maps.google.com"}
          className="w-full h-full"
          loading="lazy"
        ></iframe>
      </div>
      <a href={whatsapp} className="btn btn-primary" target="_blank" rel="noreferrer">Chat on WhatsApp</a>
    </article>
  );
}
