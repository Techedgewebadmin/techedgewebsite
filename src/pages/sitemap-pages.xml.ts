/**
 * Core pages sitemap — /sitemap-pages.xml
 * All static top-level pages. Add new pages here as the site grows.
 */
import type { APIRoute } from 'astro';
import { urlEntry, urlset, xmlResponse, today } from '@/lib/sitemap-utils';

export const prerender = true;

const pages = [
  { path: '/',            priority: '1.0', changefreq: 'weekly'  as const },
  { path: '/about/',      priority: '0.8', changefreq: 'monthly' as const },
  { path: '/services/',   priority: '0.8', changefreq: 'monthly' as const },
  { path: '/contact/',    priority: '0.8', changefreq: 'monthly' as const },
  { path: '/calculator/', priority: '0.7', changefreq: 'monthly' as const },
  { path: '/products/',   priority: '0.9', changefreq: 'weekly'  as const },
  { path: '/projects/',   priority: '0.9', changefreq: 'monthly' as const },
  { path: '/blog/',       priority: '0.8', changefreq: 'weekly'  as const },
  { path: '/solutions/',  priority: '0.9', changefreq: 'monthly' as const },
  { path: '/privacy/',    priority: '0.3', changefreq: 'yearly'  as const },
  { path: '/terms/',      priority: '0.3', changefreq: 'yearly'  as const },
];

export const GET: APIRoute = () => {
  const entries = pages.map(p =>
    urlEntry(p.path, { priority: p.priority, changefreq: p.changefreq, lastmod: today })
  );

  return xmlResponse(urlset(entries));
};
