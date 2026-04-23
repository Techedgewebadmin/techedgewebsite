/**
 * Products sitemap — /sitemap-products.xml
 * Fully automatic — reads every product from src/data/deye-products.ts.
 * Scales to 500+ products: if the list exceeds 45,000 URLs, split into
 * sitemap-products-1.xml, sitemap-products-2.xml etc. and reference both
 * in the master sitemap.xml index.
 *
 * Adding a new product = add one entry to deye-products.ts → sitemap
 * updates automatically on the next `npm run build`.
 */
import type { APIRoute } from 'astro';
import { deyeProducts, type ProductCategory } from '@/data/deye-products';
import { urlEntry, urlset, xmlResponse, today } from '@/lib/sitemap-utils';

export const prerender = true;

// Priority map by category — products Google should crawl most often first
const PRIORITY: Record<ProductCategory, string> = {
  'On-Grid':    '0.8',
  'Micro':      '0.7',
  'Hybrid':     '0.8',
  'Battery':    '0.7',
  'All-in-One': '0.6',
};

export const GET: APIRoute = () => {
  // Sort by category priority then by id for stable ordering across builds
  const sorted = [...deyeProducts].sort((a, b) => {
    const pa = parseFloat(PRIORITY[a.category]);
    const pb = parseFloat(PRIORITY[b.category]);
    return pb - pa || a.id - b.id;
  });

  const entries = sorted.map(p =>
    urlEntry(`/products/${p.slug}/`, {
      priority:   PRIORITY[p.category],
      changefreq: 'monthly',
      lastmod:    today,
    })
  );

  // Catalogue index page — highest priority
  const catalogueEntry = urlEntry('/products/', {
    priority:   '0.9',
    changefreq: 'weekly',
    lastmod:    today,
  });

  return xmlResponse(urlset([catalogueEntry, ...entries]));
};
