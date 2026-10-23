import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// One Markdown file per service. The file name is the URL slug: /servizi-dentali/<file-name>/
const services = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/services' }),
  schema: ({ image }) =>
    z.object({
      /** Short label for cards, menus and the footer. */
      title: z.string(),
      /** Page <h1>. */
      h1: z.string(),
      /** <title> (aim for 60 characters or fewer). */
      metaTitle: z.string(),
      /** Meta description (aim for 150–160 characters). */
      metaDescription: z.string(),
      /** One sentence under the h1 and on cards. */
      summary: z.string(),
      order: z.number(),
      image: image(),
      imageAlt: z.string(),
      /** Small coral label, reserved for the children's world (brand rule). */
      kidsTag: z.string().optional(),
      faq: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
    }),
});

export const collections = { services };
