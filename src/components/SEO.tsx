import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  noindex?: boolean;
}

export default function SEO({ title, description, keywords, canonical, noindex }: SEOProps) {
  const fullTitle = `${title} | ClearCut`;
  const siteUrl = 'https://removethebackground.fun'; // Replace with actual URL when deployed

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={canonical || siteUrl} />
      {noindex && <meta name="robots" content="noindex" />}
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${siteUrl}/og-image.png`} />
      <meta property="og:site_name" content="ClearCut" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${siteUrl}/og-image.png`} />

      {/* Structured Data (Schema.org) for SoftwareApp */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "ClearCut",
          "operatingSystem": "Web Browser",
          "applicationCategory": "MultimediaApplication",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          },
          "description": description,
          "aggregateRating": {
             "@type": "AggregateRating",
             "ratingValue": "4.9",
             "reviewCount": "1250"
          }
        })}
      </script>
    </Helmet>
  );
}
