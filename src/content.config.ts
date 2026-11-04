import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { LICENCE_KEYS, POST_LICENCE_KEYS } from './lib/licences.mjs';

const source = z.object({
  role: z.enum(['A', 'B']),
  name: z.string().min(1),
  url: z.string().url().startsWith('https://'),
  licence: z.enum(LICENCE_KEYS as [string, ...string[]]),
  credit: z.string().optional(),
  accessed: z.coerce.date(),
});

const shorts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/shorts' }),
  schema: z.object({
    youtubeId: z.string().regex(/^[A-Za-z0-9_-]{11}$/),
    title: z.string().min(1),
    description: z.string().max(160),
    // Do YouTube Studio: data (AAAA-MM-DD) ou data e hora ISO com fuso. A hora exata fica [por confirmar].
    uploadDate: z.union([z.string().regex(/^\d{4}-\d{2}-\d{2}$/), z.string().datetime({ offset: true })]).optional(),
    durationSec: z.number().int().positive().optional(),
    thumbnail: z.string().url().startsWith('https://'),
    // Título da página (o title fica igual ao do YouTube, para o VideoObject).
    headline: z.string().optional(),
    // O que foi medido, traduzido e escolhido. Só com texto das fontes A e B.
    explain: z.object({ measured: z.string(), translated: z.string(), chosen: z.string() }).optional(),
    // Descrição visual para quem não vê o vídeo (texto oficial traduzido, com fonte).
    visualDescription: z.object({ text: z.string(), source: z.string().url().startsWith('https://'), credit: z.string() }).optional(),
    // Peça interativa opcional na ficha.
    interactive: z.enum(['oitavas']).optional(),
    // Detalhe técnico para quem quer ir mais fundo. Cada valor tem a sua fonte.
    technical: z.array(z.object({ label: z.string(), value: z.string(), source: z.string().url().startsWith('https://') })).default([]),
    // Campos iguais em todos os cartões, pela mesma ordem.
    object: z.string(),
    instrument: z.string(),
    // Factos em números, todos presentes nas fontes A ou B.
    facts: z.array(z.object({ value: z.string(), label: z.string() })).max(4).default([]),
    sources: z.array(source).min(1),
    sourceBNotFound: z.boolean().default(false),
    confidence: z.enum(['verificado', 'plausivel', 'especulativo']),
    corrections: z.array(z.object({
      date: z.coerce.date(),
      before: z.string(),
      after: z.string(),
      source: z.string().url(),
    })).default([]),
    madeWith: z.object({ voice: z.string(), images: z.string() }),
    draft: z.boolean().default(false),
  }),
});

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string().min(1),
    description: z.string().max(160),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    shortId: z.string().optional(),
    licence: z.enum(POST_LICENCE_KEYS as [string, ...string[]]),
    credit: z.string().optional(),
    madeWith: z.string(),
    // Data da revisão humana. Sem ela o post não pode ser publicado.
    reviewed: z.coerce.date().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { shorts, posts };
