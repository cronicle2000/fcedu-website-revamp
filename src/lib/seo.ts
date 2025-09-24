export type SeoInput = {
  title: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  noindex?: boolean;
};

export function getSeoTags(input: SeoInput) {
  const siteUrl = import.meta.env.PUBLIC_SITE_URL || "https://fcedu.com.my";
  const title = input.title ? `${input.title} | Conor` : "Conor";
  const description = input.description || "Conor by FCEDU — professional coaching, caring mentors, confident outcomes.";
  const canonical = input.canonical || siteUrl;
  const ogImage = input.ogImage || `${siteUrl}/og-default.jpg`;

  return /* html */ `
    <title>${title}</title>
    <meta name="description" content="${description}" />
    ${input.noindex ? '<meta name="robots" content="noindex,nofollow" />' : ''}
    <link rel="canonical" href="${canonical}" />

    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${canonical}" />
    <meta property="og:image" content="${ogImage}" />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${description}" />
    <meta name="twitter:image" content="${ogImage}" />

    <script type="application/ld+json">
    ${JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Conor by FCEDU",
      "url": siteUrl,
      "logo": `${siteUrl}/logo.png`,
      "sameAs": []
    })}
    </script>
  `;
}

export function getLocalBusinessJsonLd(b) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": b.name,
    "address": b.address,
    "telephone": b.phone ?? "",
    "openingHours": b.hours ?? "",
    "url": b.url ?? "",
  };
}
