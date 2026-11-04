// Verifica o conteúdo antes do build. Sai com código 1 se houver erros.
// Uso: node scripts/check-content.mjs [pasta-do-conteudo]
import { readFileSync, readdirSync } from 'node:fs';
import { join, basename } from 'node:path';
import { parse } from 'yaml';
import { LICENCE_KEYS, POST_LICENCE_KEYS, IGO_URL } from '../src/lib/licences.mjs';

const root = process.argv[2] ?? 'src/content';
const errors = [];
const warnings = [];

function read(dir) {
  return readdirSync(join(root, dir))
    .filter((f) => f.endsWith('.md'))
    .map((f) => {
      const raw = readFileSync(join(root, dir, f), 'utf8');
      const m = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
      if (!m) {
        errors.push(`${dir}/${f}: sem frontmatter`);
        return null;
      }
      return { file: `${dir}/${f}`, slug: basename(f, '.md'), data: parse(m[1]) ?? {}, body: m[2] };
    })
    .filter(Boolean);
}

// Texto do corpo sem comentários HTML.
const prose = (body) => body.replace(/<!--[\s\S]*?-->/g, '').trim();

const shorts = read('shorts');
const posts = read('posts');
const shortBySlug = new Map(shorts.map((s) => [s.slug, s]));

for (const s of shorts) {
  const d = s.data;
  const where = s.file;
  if (!d.confidence) errors.push(`${where}: falta confidence`);
  const sources = Array.isArray(d.sources) ? d.sources : [];
  if (sources.length === 0) errors.push(`${where}: sem fontes`);
  sources.forEach((src, i) => {
    const tag = `${where}: fonte ${i + 1} (${src.name ?? 'sem nome'})`;
    if (typeof src.url !== 'string' || !src.url.startsWith('https://')) errors.push(`${tag}: URL tem de ser https`);
    if (!src.licence) errors.push(`${tag}: falta licence`);
    else if (!LICENCE_KEYS.includes(src.licence)) errors.push(`${tag}: licence desconhecida "${src.licence}"`);
    if (src.licence !== 'resumo' && !src.credit) errors.push(`${tag}: falta credit`);
  });
  const hasB = sources.some((src) => src.role === 'B');
  if (!hasB && d.sourceBNotFound !== true) errors.push(`${where}: sem fonte B e sem sourceBNotFound`);
  if (d.sourceBNotFound === true && !prose(s.body)) errors.push(`${where}: sourceBNotFound sem motivo no corpo`);
  if (d.draft !== true && !d.uploadDate) warnings.push(`${where}: publicado sem uploadDate (o VideoObject não é gerado)`);
}

for (const p of posts) {
  const d = p.data;
  const where = p.file;
  if (!d.licence) errors.push(`${where}: falta licence`);
  else if (!POST_LICENCE_KEYS.includes(d.licence)) errors.push(`${where}: licence desconhecida "${d.licence}"`);
  if (typeof d.description === 'string' && d.description.length > 160) errors.push(`${where}: description com mais de 160 caracteres`);
  if (d.licence && d.licence !== 'original' && !d.credit) errors.push(`${where}: adaptação sem credit`);

  if (d.draft !== true && !d.reviewed) errors.push(`${where}: publicado sem revisão humana (campo reviewed)`);

  const short = d.shortId ? shortBySlug.get(d.shortId) : null;
  if (d.shortId && !short) errors.push(`${where}: shortId "${d.shortId}" não existe`);
  if (short && d.draft !== true && short.data.draft === true) errors.push(`${where}: post publicado liga a um Short em rascunho`);

  const fromIgo = short?.data.sources?.some((src) => src.licence === 'esa-cc-by-sa-igo');
  if (fromIgo || d.licence === 'cc-by-sa-3.0-igo') {
    if (d.licence !== 'cc-by-sa-3.0-igo') errors.push(`${where}: adaptado de ESA CC BY-SA IGO, licence tem de ser cc-by-sa-3.0-igo`);
    const text = `${p.body}\n${d.credit ?? ''}`;
    if (!text.includes(IGO_URL)) errors.push(`${where}: falta o link da licença ${IGO_URL}`);
  }
}

for (const w of warnings) console.log(`AVISO  ${w}`);
for (const e of errors) console.log(`ERRO   ${e}`);
console.log(`check-content: ${shorts.length} shorts, ${posts.length} posts, ${errors.length} erros, ${warnings.length} avisos`);
process.exit(errors.length ? 1 : 0);
