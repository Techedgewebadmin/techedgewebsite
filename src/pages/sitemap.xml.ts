import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { deyeProducts } from '@/data/deye-products';
import { allTechedgeProducts } from '@/data/techedge-products';
import { goldiProducts } from '@/data/goldi-products';
import { hoymilesProducts } from '@/data/hoymiles-products';
import { tsunProducts } from '@/data/tsun-products';
import { coldStorageProducts } from '@/data/cold-storage-products';
import { solintegProducts } from '@/data/solinteg-products';
import { vsoleProducts } from '@/data/vsole-products';
import { renewSysProducts } from '@/data/renewsys-products';
import { rayzonProducts } from '@/data/rayzon-products';
import { lithiumValleyProducts } from '@/data/lithium-valley-products';
import { bplPowerzenProducts } from '@/data/bpl-powerzen-products';
import { solutions } from '@/data/solutions';

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

    // Solution pages (auto from data — includes any newly added solutions)
    ...solutions.map(s => url(`/solutions/${s.slug}/`, '0.8', 'monthly')),
    url('/solutions/micro-inverter/', '0.7', 'monthly'),

    // Brand sub-pages — brands with a single listing page (no per-product route)
    url('/products/deye/',          '0.8', 'weekly'),
    url('/products/goldi/',         '0.8', 'monthly'),
    url('/products/techedge/',      '0.8', 'monthly'),
    url('/products/nunam/',         '0.7', 'monthly'),
    url('/products/hoymiles/',      '0.8', 'monthly'),
    url('/products/tsun/',          '0.8', 'monthly'),
    url('/products/solinteg/',      '0.8', 'monthly'),
    url('/products/vsole/',         '0.8', 'monthly'),
    url('/products/renewsys/',      '0.8', 'monthly'),
    url('/products/rayzon/',        '0.8', 'monthly'),
    url('/products/lithium-valley/','0.8', 'monthly'),
    url('/products/bpl-powerzen/',  '0.8', 'monthly'),
    url('/products/adani/',         '0.8', 'monthly'),

    // Projects (auto from content collection)
    ...projects.map(p => url(`/projects/${p.id}/`, '0.8', 'monthly')),

    // Blog posts (use publish date as lastmod)
    ...posts.map(p => url(
      `/blog/${p.id}/`,
      '0.7',
      'monthly',
      p.data.date ? new Date(p.data.date).toISOString().split('T')[0] : today
    )),

    // Product pages — Deye
    ...deyeProducts.map(p => url(`/products/${p.slug}/`, '0.7', 'monthly')),

    // Product pages — Techedge
    ...allTechedgeProducts.map(p => url(`/products/${p.slug}/`, '0.7', 'monthly')),

    // Product pages — Goldi Solar
    ...goldiProducts.map(p => url(`/products/${p.slug}/`, '0.7', 'monthly')),

    // Product pages — Hoymiles
    ...hoymilesProducts.map(p => url(`/products/${p.slug}/`, '0.7', 'monthly')),

    // Product pages — TSUN
    ...tsunProducts.map(p => url(`/products/${p.slug}/`, '0.7', 'monthly')),

    // Product pages — Techedge Smart Cold Storage
    ...coldStorageProducts.map(p => url(`/products/${p.slug}/`, '0.7', 'monthly')),

    // Product pages — Solinteg
    ...solintegProducts.map(p => url(`/products/${p.slug}/`, '0.7', 'monthly')),

    // Product pages — Vsole
    ...vsoleProducts.map(p => url(`/products/${p.slug}/`, '0.7', 'monthly')),

    // Product pages — RenewSys
    ...renewSysProducts.map(p => url(`/products/${p.slug}/`, '0.7', 'monthly')),

    // Product pages — Rayzon
    ...rayzonProducts.map(p => url(`/products/${p.slug}/`, '0.7', 'monthly')),

    // Product pages — Lithium Valley
    ...lithiumValleyProducts.map(p => url(`/products/${p.slug}/`, '0.7', 'monthly')),

    // Product pages — BPL PowerZen (also has its own listing page above; kept for consistency)
    ...bplPowerzenProducts.map(p => url(`/products/${p.slug}/`, '0.6', 'monthly')),
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
