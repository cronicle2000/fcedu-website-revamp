import { defineConfig } from 'astro/config';
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import AstroPWA from '@vite-pwa/astro'

// Update this to the final canonical site URL
const SITE_URL = process.env.PUBLIC_SITE_URL ?? "https://fcedu.com.my";

export default defineConfig({
  site: SITE_URL,
  output: "static",
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: true,
    }),
    sitemap(),
    AstroPWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'apple-touch-icon.png'],
      manifest: {
        name: 'FCEDU Conor',
        short_name: 'FCEDU',
        description: 'Conor — FCEDU official site',
        start_url: '/',
        scope: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#0A4D9D',
        icons: [
          { src: '/pwa-192.png', sizes: '192x192', type: 'image/png' },
          { src: '/pwa-512.png', sizes: '512x512', type: 'image/png' }
        ]
      }
    })
  ],
  vite: {
    define: {
      __APP_BUILD_DATE__: JSON.stringify(new Date().toISOString())
    }
  }
});
