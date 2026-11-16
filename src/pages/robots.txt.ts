import type { APIRoute } from 'astro';
import { demo } from '../lib/site';

export const GET: APIRoute = ({ site }) => {
  const corpo = demo
    ? 'User-agent: *\nDisallow: /\n'
    : `User-agent: *\nAllow: /\n\nSitemap: ${new URL('sitemap-index.xml', site).href}\n`;
  return new Response(corpo, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
