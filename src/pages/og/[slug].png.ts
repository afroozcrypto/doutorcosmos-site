import type { APIContext } from 'astro';
import sharp from 'sharp';
import { ogEntries } from '../../lib/og';

// Imagem OG 1200x630 por página: só texto e formas, sem imagens de terceiros.
export async function getStaticPaths() {
  return (await ogEntries()).map((e) => ({ params: { slug: e.slug }, props: { title: e.title } }));
}

const esc = (t: string) => t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
function wrap(text: string, max = 26, lines = 3) {
  const out: string[] = []; let cur = '';
  for (const w of text.replace(/[^\p{L}\p{N}\s.,:;«»()'-]/gu, '').split(/\s+/)) {
    if ((cur + ' ' + w).trim().length > max && cur) { out.push(cur); cur = w; } else cur = (cur + ' ' + w).trim();
  }
  if (cur) out.push(cur);
  if (out.length > lines) { out.length = lines; out[lines - 1] += '…'; }
  return out;
}

export async function GET({ props }: APIContext) {
  const lines = wrap(props.title as string);
  const y0 = 300 - (lines.length - 1) * 38;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs><radialGradient id="n" cx="80%" cy="25%" r="75%"><stop offset="0" stop-color="#26388f"/><stop offset=".55" stop-color="#111a3d"/><stop offset="1" stop-color="#070b17"/></radialGradient></defs>
  <rect width="1200" height="630" fill="url(#n)"/>
  <g fill="none" stroke="#7cc6ff" stroke-opacity=".35"><circle cx="1010" cy="170" r="60"/><circle cx="1010" cy="170" r="120"/><circle cx="1010" cy="170" r="180"/></g>
  <circle cx="1010" cy="170" r="10" fill="#ffd166"/>
  <text x="80" y="110" font-family="DejaVu Sans Mono, monospace" font-size="28" fill="#7cc6ff">DOUTOR COSMOS</text>
  ${lines.map((l, i) => `<text x="80" y="${y0 + i * 76}" font-family="DejaVu Sans, Arial, sans-serif" font-size="64" font-weight="700" fill="#e8ecff">${esc(l)}</text>`).join('')}
  <text x="80" y="560" font-family="DejaVu Sans, Arial, sans-serif" font-size="30" fill="#ffd166">Astrofísica em português de Portugal, com fontes</text>
</svg>`;
  const png = await sharp(Buffer.from(svg)).png().toBuffer();
  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
}
