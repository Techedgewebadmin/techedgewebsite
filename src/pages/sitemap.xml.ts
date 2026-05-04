import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { deyeProducts } from '@/data/deye-products';

export const prerender = true;

const SITE = 'https://techedgeindia.co.in';
const today = new Date().toISOString().split('T')[0];

function url(path: string, priority: string, changefreq: string, lastmod = today) {
  return `  <url>
    <loc>${SITE}${path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

export const GET: APIRoute = async () => {
  const projects = await getCollection('projects');
  const posts    = await getCollection('blog');

  const entries = [
    // Core pages
    url('/',            '1.0', 'weekly'),
    url('/solutions/',  '0.9', 'monthly'),
    url('/products/',   '0.9', 'weekly'),
    url('/projects/',   '0.9', 'monthly'),
    url('/services/',   '0.8', 'monthly'),
    url('/blog/',       '0.8', 'weekly'),
    url('/about/',      '0.7', 'monthly'),
    url('/contact/',    '0.8', 'monthly'),
    url('/calculator/', '0.7', 'monthly'),
    url('/privacy/',    '0.3', 'yearly'),
    url('/terms/',      '0.3', 'yearly'),

    // Solution pages
    ...['on-grid-solar', 'off-grid-solar', 'hybrid-solar', 'hybrid-solar-cold-storage']
      .map(s => url(`/solutions/${s}/`, '0.8', 'monthly')),

    // Projects (auto from content collection)
    ...projects.map(p => url(`/projects/${p.id}/`, '0.8', 'monthly')),

    // Blog posts (use publish date as lastmod)
    ...posts.map(p => url(
      `/blog/${p.id}/`,
      '0.7',
      'monthly',
      p.data.date ? new Date(p.data.date).toISOString().split('T')[0] : today
    )),

    // Product pages (auto from deye-products.ts)
    ...deyeProducts.map(p => url(`/products/${p.slug}/`, '0.7', 'monthly')),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
