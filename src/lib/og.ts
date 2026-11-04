import { publishedShorts, publishedPosts } from './site';

// Título de cada imagem OG. A chave é o caminho da página sem barras ('' = início).
const STATIC: Record<string, string> = {
  '': 'O universo em 30 segundos. Com fontes.',
  noticias: 'Notícias: o que sabemos e o que não sabemos',
  fontes: 'As fontes de cada vídeo',
  sessoes: 'Ouve o Universo: sessão ao vivo de escuta guiada',
  'ouve-o-universo': 'Ouve o Universo',
  'como-verificamos': 'Como verificamos',
  correcoes: 'Correções públicas',
  sobre: 'Sobre o Doutor Cosmos',
  '404': 'Página não encontrada',
};

export const ogSlug = (path: string) => path.replace(/^\/+|\/+$/g, '').replace(/\//g, '-') || 'inicio';

export async function ogEntries() {
  const list = Object.entries(STATIC).map(([path, title]) => ({ slug: ogSlug(path), title }));
  for (const s of await publishedShorts()) list.push({ slug: ogSlug(`fontes/${s.id}`), title: s.data.headline ?? s.data.title });
  for (const p of await publishedPosts()) list.push({ slug: ogSlug(`noticias/${p.id}`), title: p.data.title });
  return list;
}
