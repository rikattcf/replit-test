import { defineConfig } from 'astro/config';
import storyblok from '@storyblok/astro';
import vercel from '@astrojs/vercel/serverless';

// https://astro.build/config
export default defineConfig({
  integrations: [
    storyblok({
      accessToken: process.env.STORYBLOK_TOKEN,
      components: {
        // Map Storyblok component names → local Astro files (relative to src/)
        page:      'storyblok/Page',
        hero:      'storyblok/Hero',
        cta_button:'storyblok/CTAButton',
        grid:      'storyblok/Grid',
        card:      'storyblok/Card',
        text_area: 'storyblok/TextArea',
      },
      apiOptions: {
        // Change to '' for Storyblok US region spaces
        region: 'eu',
      },
    }),
  ],

  output: 'server',
  adapter: vercel(),
});
