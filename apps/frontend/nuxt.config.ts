import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { defineNuxtConfig } from 'nuxt/config';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  workspaceDir: '../',
  srcDir: 'src',
  buildDir: '../dist/frontend/.nuxt',
  devtools: { enabled: true },
  devServer: {
    host: '127.0.0.1',
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
    'flowbite-nuxt'
  ],
  imports: {
    autoImport: false,
  },
  vite: {
    plugins: [nxViteTsPaths()],
  },
  nitro: {
    output: {
      dir: '../dist/frontend/.output',
    },
  },
});
