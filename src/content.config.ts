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
    // ISO com fuso, do YouTube Studio. Por preencher pelo Conde.
    uploadDate: z.string().datetime({ offset: true }).optional(),
    durationSec: z.number().int().positive().optional(),
    thumbnail: z.string().url().startsWith('https://'),
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
