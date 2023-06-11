import { fileURLToPath } from 'node:url';
import { defineVitestConfig } from 'nuxt-vitest/config';

process.server = true;
export default defineVitestConfig({
  test: {
    environment: 'nuxt',
    dir: 'tests',
    // you can optionally set nuxt-specific environment options
    environmentOptions: {
      nuxt: {
        rootDir: fileURLToPath(new URL('./', import.meta.url)),
        overrides: {
          // other nuxt config you want to pass
        }
      }
    }
  }
});
