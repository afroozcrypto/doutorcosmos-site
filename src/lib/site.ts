import { getCollection, type CollectionEntry } from 'astro:content';

export const SITE = {
  name: 'Doutor Cosmos',
  email: 'joao@cond3.tech',
  channel: 'https://www.youtube.com/@DoutorCosmosOfficial',
  heroLead: 'Astrofísica em português de Portugal. Dados da NASA e da ESA, fonte em cada vídeo e correções públicas quando erramos.',
};
// Prefixa o base (ex.: /doutorcosmos-site) a caminhos internos.
export const href = (path: string) => `${import.meta.env.BASE_URL.replace(/\/$/, '')}${path}`;
export const IS_PREVIEW = import.meta.env.PUBLIC_ENV === 'preview';

// Rascunhos ficam fora de rotas, sitemap e RSS.
export async function publishedShorts() {
  const all = await getCollection('shorts', ({ data }) => data.draft !== true);
  return all.sort((a, b) => (b.data.uploadDate ?? '').localeCompare(a.data.uploadDate ?? ''));
}
export async function publishedPosts() {
  const all = await getCollection('posts', ({ data }) => data.draft !== true);
  return all.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}
export type Short = CollectionEntry<'shorts'>;
export type Post = CollectionEntry<'posts'>;

export const fmtDate = (d: Date) =>
  new Intl.DateTimeFormat('pt-PT', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(d);
export const isoDuration = (sec: number) => `PT${Math.floor(sec / 60) ? `${Math.floor(sec / 60)}M` : ''}${sec % 60}S`;
export const CONFIDENCE_LABEL = { verificado: 'Verificado', plausivel: 'Plausível', especulativo: 'Especulativo' } as const;
