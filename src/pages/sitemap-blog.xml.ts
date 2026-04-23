/**
 * Blog sitemap — /sitemap-blog.xml
 * Fully automatic — reads every .md file in src/content/blog/.
 * Uses the post's own publish date as lastmod for accurate freshness signals.
 * New posts appear in the sitemap on the next build automatically.
 */
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { urlEntry, urlset, xmlResponse, today } from '@/lib/sitemap-utils';

export const prerender = true;

export const GET: APIRoute = async () => {
  const posts = await getCollection('blog');

  // Sort newest first (helps crawlers prioritise fresh content)
  const sorted = posts.sort(
    (a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
  );

  const entries = sorted.map(p => {
    // Use the post's own publish date as lastmod
    const lastmod = p.data.date
      ? new Date(p.data.date).toISOString().split('T')[0]
      : today;

    return urlEntry(`/blog/${p.id}/`, {
      priority:   '0.7',
      changefreq: 'monthly',
      lastmod,
    });
  });

  return xmlResponse(urlset(entries));
};
