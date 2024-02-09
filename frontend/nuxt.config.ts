import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { defineNuxtConfig } from 'nuxt/config';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  workspaceDir: '../',
  srcDir: 'src',
  buildDir: '../dist/frontend/.nuxt',
  devtools: { enabled: true },
  devServer: {
    host: 'localhost',
    port: 3000,
  },
  typescript: {
    typeCheck: true,
    tsConfig: {
      extends: './tsconfig.app.json',
    },
  },
  imports: {
    autoImport: false,
  },

  css: ['~/assets/css/styles.scss'],

  vite: {
    plugins: [nxViteTsPaths()],
  },
  nitro: {
    output: {
      dir: '../dist/frontend/.output',
    },
  },
});
