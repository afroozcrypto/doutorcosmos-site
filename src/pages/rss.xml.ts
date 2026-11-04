import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { publishedPosts } from '../lib/site';

export async function GET(context: APIContext) {
  const posts = await publishedPosts();
  return rss({
    title: 'Doutor Cosmos: notícias',
    description: 'Astrofísica em português de Portugal, com fontes.',
    site: context.site!,
    customData: '<language>pt-PT</language>',
    items: posts.map((p) => ({
      title: p.data.title,
      description: p.data.description,
      pubDate: p.data.pubDate,
      link: `/noticias/${p.id}/`,
    })),
  });
}
