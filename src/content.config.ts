import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  loader: glob({ base: "./src/content/blog", pattern: "**/*.{md,mdx}" }),
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string(),
    date: z.string(),
    category: z.string(),
    image: image(),
    author: z.string().default("Techedge Team"),
    tags: z.array(z.string()).optional(),
  }),
});

const projects = defineCollection({
  loader: glob({ base: "./src/content/projects", pattern: "**/*.{md,mdx}" }),
  schema: ({ image }) => z.object({
    title: z.string(),
    category: z.enum(['Residential', 'Commercial', 'Community', 'Industrial']),
    location: z.string(),
    capacity: z.string(),
    date: z.string(),
    image: image(),
    description: z.string(),
    isFeatured: z.boolean().default(false),
    stats: z.object({
      panelCount: z.number(),
      co2Saved: z.string(),
      energyGenerated: z.string(),
      paybackPeriod: z.string(),
    }),
    client: z.string().optional(),
    clientImage: image().optional(),
    additionalImages: z.array(image()).optional(),
    galleryImages: z.array(image()).optional(),
    logo: z.string().optional(),
    heroFit: z.enum(['cover', 'contain']).optional().default('cover'),
    challenges: z.array(z.string()).optional(),
    solutions: z.array(z.string()).optional(),
  }),
});

export const collections = { projects, blog };
