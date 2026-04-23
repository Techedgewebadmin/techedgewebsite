import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { deyeProducts } from '@/data/deye-products';

export const prerender = true;

const SITE = 'https://techedgeindia.co.in';

const staticPages = [
  { url: '/',            priority: '1.0', changefreq: 'weekly'  },
  { url: '/solutions/',  priority: '0.9', changefreq: 'monthly' },
  { url: '/products/',   priority: '0.9', changefreq: 'weekly'  },
  { url: '/projects/',   priority: '0.9', changefreq: 'monthly' },
  { url: '/services/',   priority: '0.8', changefreq: 'monthly' },
  { url: '/blog/',       priority: '0.8', changefreq: 'weekly'  },
  { url: '/about/',      priority: '0.7', changefreq: 'monthly' },
  { url: '/contact/',    priority: '0.8', changefreq: 'monthly' },
  { url: '/calculator/', priority: '0.7', changefreq: 'monthly' },
  { url: '/privacy/',    priority: '0.3', changefreq: 'yearly'  },
  { url: '/terms/',      priority: '0.3', changefreq: 'yearly'  },
];

const solutionSlugs = [
  'on-grid-solar',
  'off-grid-solar',
  'hybrid-solar',
  'hybrid-solar-cold-storage',
];

function url(path: string, priority: string, changefreq: string, lastmod?: string) {
  return `
  <url>
    <loc>${SITE}${path}</loc>
    ${lastmod ? `<lastmod>${lastmod}</lastmod>` : ''}
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`.trim();
}

export const GET: APIRoute = async () => {
  const projects = await getCollection('projects');
  const posts    = await getCollection('blog');

  const today = new Date().toISOString().split('T')[0];

  const entries: string[] = [];

  // Static pages
  for (const p of staticPages) {
    entries.push(url(p.url, p.priority, p.changefreq, today));
  }

  // Solution pages
  for (const slug of solutionSlugs) {
    entries.push(url(`/solutions/${slug}/`, '0.8', 'monthly', today));
  }

  // Project pages
  for (const p of projects) {
    entries.push(url(`/projects/${p.id}/`, '0.8', 'monthly', today));
  }

  // Blog posts
  for (const p of posts) {
    const lastmod = p.data.date ? p.data.date.split('T')[0] : today;
    entries.push(url(`/blog/${p.id}/`, '0.7', 'monthly', lastmod));
  }

  // Product pages
  for (const p of deyeProducts) {
    entries.push(url(`/products/${p.slug}/`, '0.7', 'monthly', today));
  }

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
