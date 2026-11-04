import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import sharp from 'sharp';

// og:image em PNG 1200x630, gerado no build a partir de public/og.svg.
export async function GET() {
  const svg = await readFile(join(process.cwd(), 'public', 'og.svg'));
  const png = await sharp(svg, { density: 72 }).resize(1200, 630).png().toBuffer();
  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
}
