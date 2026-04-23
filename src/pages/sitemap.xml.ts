/**
 * Master sitemap index — /sitemap.xml
 * Lists all sub-sitemaps. Submit only this URL to Google Search Console.
 * Scales automatically: add a new sub-sitemap here as the site grows.
 */
import type { APIRoute } from 'astro';
import { sitemapEntry, sitemapIndex, xmlResponse, today } from '@/lib/sitemap-utils';

export const prerender = true;

export const GET: APIRoute = () => {
  const body = sitemapIndex([
    sitemapEntry('/sitemap-pages.xml',     today),
    sitemapEntry('/sitemap-solutions.xml', today),
    sitemapEntry('/sitemap-projects.xml',  today),
    sitemapEntry('/sitemap-blog.xml',      today),
    sitemapEntry('/sitemap-products.xml',  today),
  ]);

  return xmlResponse(body);
};
