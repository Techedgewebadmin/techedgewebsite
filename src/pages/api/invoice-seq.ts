import type { APIRoute } from 'astro';
import { getStore } from '@netlify/blobs';

// Persistent, cross-device invoice numbering counter for qbuilder.html — backed by
// Netlify Blobs (no external account needed). One counter per doc-type prefix + FY,
// e.g. key "TEQ:2026-27". Protected by the same QBUILDER_USER/QBUILDER_PASS Basic Auth
// as qbuilder.html itself (also enforced at the edge by netlify/edge-functions/qbuilder-auth.js,
// this is a defense-in-depth backstop in case the API is hit directly).

export const prerender = false;

function checkAuth(request: Request): boolean {
  const auth = request.headers.get('authorization');
  const validUser = import.meta.env.QBUILDER_USER;
  const validPass = import.meta.env.QBUILDER_PASS;
  if (!validUser || !validPass || !auth || !auth.startsWith('Basic ')) return false;
  const decoded = atob(auth.slice(6));
  const sepIndex = decoded.indexOf(':');
  const user = decoded.slice(0, sepIndex);
  const pass = decoded.slice(sepIndex + 1);
  return user === validUser && pass === validPass;
}

function unauthorized(): Response {
  return new Response('Authentication required', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="Techedge Internal Tools"' }
  });
}

function badRequest(msg: string): Response {
  return new Response(msg, { status: 400 });
}

function json(body: unknown): Response {
  return new Response(JSON.stringify(body), { headers: { 'Content-Type': 'application/json' } });
}

function keyFor(prefix: string, fy: string): string {
  return prefix + ':' + fy;
}

export const GET: APIRoute = async ({ request, url }) => {
  if (!checkAuth(request)) return unauthorized();
  const prefix = url.searchParams.get('prefix');
  const fy = url.searchParams.get('fy');
  if (!prefix || !fy) return badRequest('prefix and fy query params are required');
  const store = getStore('invoice-sequences');
  const current = await store.get(keyFor(prefix, fy), { type: 'json' }) as { n: number } | null;
  return json({ number: current?.n || 0 });
};

export const POST: APIRoute = async ({ request }) => {
  if (!checkAuth(request)) return unauthorized();
  const body = await request.json().catch(() => null);
  const prefix = body?.prefix;
  const fy = body?.fy;
  if (!prefix || !fy) return badRequest('prefix and fy are required');
  const store = getStore('invoice-sequences');
  const key = keyFor(prefix, fy);
  const current = await store.get(key, { type: 'json' }) as { n: number } | null;
  const next = (current?.n || 0) + 1;
  await store.setJSON(key, { n: next });
  return json({ number: next });
};

export const PUT: APIRoute = async ({ request }) => {
  if (!checkAuth(request)) return unauthorized();
  const body = await request.json().catch(() => null);
  const prefix = body?.prefix;
  const fy = body?.fy;
  const value = body?.value;
  if (!prefix || !fy || typeof value !== 'number' || !Number.isFinite(value) || value < 0) {
    return badRequest('prefix, fy, and a non-negative numeric value are required');
  }
  const store = getStore('invoice-sequences');
  await store.setJSON(keyFor(prefix, fy), { n: value });
  return json({ number: value });
};
