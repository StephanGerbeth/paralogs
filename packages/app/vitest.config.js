import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  test: {
    globals: false,
    environment: 'jsdom',
    deps: {
      inline: [/vuetify/]
    },
    root: fileURLToPath(new URL('./', import.meta.url))
  }
});
