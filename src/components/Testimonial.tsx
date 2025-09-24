import React from 'react';
export default function Testimonial({ quote, author }:{ quote:string; author:string }) {
  return (
    <figure className="card">
      <blockquote className="text-gray-800 text-lg">“{quote}”</blockquote>
      <figcaption className="mt-3 text-sm text-gray-600">— {author}</figcaption>
    </figure>
  );
}
