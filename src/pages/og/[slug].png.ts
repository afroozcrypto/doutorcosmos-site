import type { APIContext } from 'astro';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import sharp from 'sharp';
import { ogEntries } from '../../lib/og';

// Imagem OG 1200x630 por página: título da página à esquerda e a personagem do canal
// (imagem canónica, quadrada 630x630, sem deformar) à direita, sobre o fundo escuro do site.
export async function getStaticPaths() {
  return (await ogEntries()).map((e) => ({ params: { slug: e.slug }, props: { title: e.title } }));
}

const esc = (t: string) => t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
function wrap(text: string, max = 18, lines = 5) {
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
  const y0 = 320 - (lines.length - 1) * 27;
  const bg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <radialGradient id="n" cx="25%" cy="30%" r="80%"><stop offset="0" stop-color="#1b2a6b"/><stop offset=".6" stop-color="#0e1530"/><stop offset="1" stop-color="#070b17"/></radialGradient>
    <linearGradient id="fade" x1="0" x2="1"><stop offset="0" stop-color="#070b17" stop-opacity="1"/><stop offset="1" stop-color="#070b17" stop-opacity="0"/></linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#n)"/>
</svg>`;
  const text = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs><linearGradient id="fade" x1="0" x2="1"><stop offset="0" stop-color="#070b17" stop-opacity=".95"/><stop offset="1" stop-color="#070b17" stop-opacity="0"/></linearGradient></defs>
  <rect x="560" y="0" width="220" height="630" fill="url(#fade)"/>
  <text x="64" y="110" font-family="DejaVu Sans Mono, monospace" font-size="26" fill="#7cc6ff">DOUTOR COSMOS</text>
  ${lines.map((l, i) => `<text x="64" y="${y0 + i * 54}" font-family="DejaVu Sans, Arial, sans-serif" font-size="44" font-weight="700" fill="#e8ecff">${esc(l)}</text>`).join('')}
  <text x="64" y="560" font-family="DejaVu Sans, Arial, sans-serif" font-size="24" fill="#ffd166">Astrofísica em português de Portugal, com fontes</text>
</svg>`;
  const character = await readFile(join(process.cwd(), 'src', 'assets', 'doutor-cosmos-630.webp'));
  const png = await sharp(Buffer.from(bg))
    .composite([
      { input: character, left: 570, top: 0 },
      { input: Buffer.from(text), left: 0, top: 0 },
    ])
    .png()
    .toBuffer();
  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
}
