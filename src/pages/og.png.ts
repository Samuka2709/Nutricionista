// Imagem de compartilhamento (1200x630) com nome e CRN, gerada no build a partir do arquivo de dados.
import type { APIRoute } from 'astro';
import sharp from 'sharp';
import { nomeCompleto, nome, identificacao, cidade } from '../lib/site';

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const cores = { papel: '#F2F4F0', tinta: '#2443B8', verde: '#183B32', tomate: '#C93D22', grafite: '#1D2321' };

export const GET: APIRoute = async () => {
  const titulo = esc(nomeCompleto || nome || 'Nutricionista');
  const linha = esc([identificacao, cidade].filter(Boolean).join(', '));
  const tamanho = titulo.length > 22 ? 78 : 96;
  const colunas = Array.from({ length: 6 }, (_, i) => 96 + ((1200 - 96) / 7) * (i + 1));
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
    <rect width="1200" height="630" fill="${cores.papel}"/>
    ${colunas.map((x) => `<line x1="${x}" y1="0" x2="${x}" y2="630" stroke="${cores.tinta}" stroke-opacity="0.16"/>`).join('')}
    ${[126, 252, 378, 504].map((y) => `<line x1="0" y1="${y}" x2="1200" y2="${y}" stroke="${cores.tinta}" stroke-opacity="0.16"/>`).join('')}
    <line x1="96" y1="0" x2="96" y2="630" stroke="${cores.tomate}" stroke-opacity="0.6"/>
    <rect x="884" y="126" width="316" height="378" fill="${cores.verde}"/>
    <rect x="726" y="378" width="158" height="126" fill="${cores.tomate}"/>
    <rect x="96" y="0" width="1104" height="6" fill="${cores.tinta}"/>
    <text x="128" y="300" font-family="'Segoe UI', 'Helvetica Neue', Arial, sans-serif" font-weight="700" font-size="${tamanho}" letter-spacing="-2" fill="${cores.tinta}">${titulo}</text>
    <text x="130" y="360" font-family="'Segoe UI', 'Helvetica Neue', Arial, sans-serif" font-weight="500" font-size="34" fill="${cores.grafite}">${linha}</text>
  </svg>`;
  const png = await sharp(Buffer.from(svg)).png().toBuffer();
  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
};
