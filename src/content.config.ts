import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { CATEGORIAS } from './lib/categorias';

// Um arquivo .md por artigo em src/content/artigos.
const artigos = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/artigos' }),
  schema: z.object({
    titulo: z.string(),
    categoria: z.enum(CATEGORIAS),
    resumo: z.string(),
    data: z.coerce.date(),
    tempoLeitura: z.number(),
    imagem: z.string().optional(),
    rascunho: z.boolean().default(false),
    referencias: z.array(z.object({ titulo: z.string(), url: z.string().url() })).default([]),
  }),
});

export const collections = { artigos };
