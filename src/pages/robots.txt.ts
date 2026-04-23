/**
 * robots.txt — /robots.txt
 * Production-ready for Netlify + Astro static builds.
 * Points to the master sitemap index for multi-sitemap support.
 */
import type { APIRoute } from 'astro';

const SITE = import.meta.env.SITE ?? 'https://techedgeindia.co.in';

const robots = `
# ─── Techedge India — robots.txt ────────────────────────────────────────────
# Hosted on Netlify | Built with Astro (static)
# Updated: ${new Date().toISOString().split('T')[0]}

# ── Allow all legitimate crawlers ────────────────────────────────────────────
User-agent: *
Allow: /

# ── Block Netlify system paths ────────────────────────────────────────────────
Disallow: /.netlify/
Disallow: /api/

# ── Block Astro build artifacts ───────────────────────────────────────────────
Disallow: /_astro/
Disallow: /404
Disallow: /404.html

# ── Block query-string duplicates ────────────────────────────────────────────
Disallow: /*?*

# ── Crawl-delay hint for generic bots ────────────────────────────────────────
Crawl-delay: 2

# ── Google ────────────────────────────────────────────────────────────────────
User-agent: Googlebot
Allow: /
Disallow: /.netlify/
Disallow: /api/
Disallow: /_astro/

# ── Bing ─────────────────────────────────────────────────────────────────────
User-agent: Bingbot
Allow: /
Crawl-delay: 5

# ── Sitemaps ──────────────────────────────────────────────────────────────────
Sitemap: ${SITE}/sitemap.xml
`.trim();

export const GET: APIRoute = () =>
  new Response(robots, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  });
