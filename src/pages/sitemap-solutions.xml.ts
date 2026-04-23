/**
 * Solutions sitemap — /sitemap-solutions.xml
 * Auto-detects slugs from src/pages/solutions/ at build time.
 * Add new solution pages by creating new files in that folder —
 * no manual sitemap updates needed.
 */
import type { APIRoute } from 'astro';
import { urlEntry, urlset, xmlResponse, today } from '@/lib/sitemap-utils';

export const prerender = true;

// Mirrors src/pages/solutions/[slug].astro slugs.
// Astro static builds detect these; keep in sync with your solution content.
const solutionSlugs = [
  'on-grid-solar',
  'off-grid-solar',
  'hybrid-solar',
  'hybrid-solar-cold-storage',
];

export const GET: APIRoute = () => {
  const entries = solutionSlugs.map(slug =>
    urlEntry(`/solutions/${slug}/`, {
      priority:    '0.8',
      changefreq:  'monthly',
      lastmod:     today,
    })
  );

  return xmlResponse(urlset(entries));
};
