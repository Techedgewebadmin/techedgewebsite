/**
 * Sitemap utilities — shared across all sitemap endpoints.
 * Keeps every sub-sitemap DRY and consistent.
 */

export const SITE = 'https://techedgeindia.co.in';

export const today = new Date().toISOString().split('T')[0];

/** Single <url> entry */
export function urlEntry(
  path: string,
  opts: {
    priority: string;
    changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
    lastmod?: string;
  }
) {
  return [
    '  <url>',
    `    <loc>${SITE}${path}</loc>`,
    opts.lastmod ? `    <lastmod>${opts.lastmod}</lastmod>` : '',
    `    <changefreq>${opts.changefreq}</changefreq>`,
    `    <priority>${opts.priority}</priority>`,
    '  </url>',
  ]
    .filter(Boolean)
    .join('\n');
}

/** Wrap entries in a <urlset> */
export function urlset(entries: string[]): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
>
${entries.join('\n')}
</urlset>`;
}

/** Build one <sitemap> entry for the master index */
export function sitemapEntry(path: string, lastmod?: string) {
  return [
    '  <sitemap>',
    `    <loc>${SITE}${path}</loc>`,
    lastmod ? `    <lastmod>${lastmod}</lastmod>` : '',
    '  </sitemap>',
  ]
    .filter(Boolean)
    .join('\n');
}

/** Wrap entries in a <sitemapindex> */
export function sitemapIndex(entries: string[]): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.join('\n')}
</sitemapindex>`;
}

/** Standard XML response headers */
export function xmlResponse(body: string): Response {
  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
