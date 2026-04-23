/**
 * Projects sitemap — /sitemap-projects.xml
 * Fully automatic — reads every .md file in src/content/projects/.
 * New projects appear in the sitemap on the next build with zero manual work.
 */
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { urlEntry, urlset, xmlResponse, today } from '@/lib/sitemap-utils';

export const prerender = true;

export const GET: APIRoute = async () => {
  const projects = await getCollection('projects');

  const entries = projects.map(p =>
    urlEntry(`/projects/${p.id}/`, {
      priority:   '0.8',
      changefreq: 'monthly',
      lastmod:    today,
    })
  );

  return xmlResponse(urlset(entries));
};
