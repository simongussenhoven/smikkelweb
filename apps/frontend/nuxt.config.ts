import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { defineNuxtConfig } from 'nuxt/config';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    // Private keys are only available on the server
    apiSecret: '123',

    // Public keys that are exposed to the client
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://localhost:4000',
    }
  },
  workspaceDir: '../',
  srcDir: 'src',
  buildDir: '../../dist/apps/frontend/.nuxt',
  devtools: { enabled: true },
  devServer: {
    port: 3000,
  },
  typescript: {
    typeCheck: true,
    tsConfig: {
      extends: './tsconfig.app.json',
    },
  },
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
    'flowbite-nuxt',
    'nuxt-icon'
  ],
  imports: {
    autoImport: true,
  },
  vite: {
    plugins: [nxViteTsPaths()],
  },
  nitro: {
    output: {
      dir: '../../dist/apps/frontend/.output',
    },
  },
});
