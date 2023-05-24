import { defineNuxtConfig } from 'nuxt/config';
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
import dotenv from 'dotenv-mono';
import vuetify from 'vite-plugin-vuetify';
import { resolve } from 'pathe';
import svgLoader from 'vite-svg-loader';
import topLevelAwait from 'vite-plugin-top-level-await';
import * as postcssFunctions from './postcss/functions';

dotenv.config();

const isDev = process.env.NODE_ENV === 'development';

export default defineNuxtConfig(async () => {
  const readPackage = await import('read-pkg');
  const pkg = (readPackage.readPackage || readPackage)({
    cwd: resolve(process.cwd(), '../..')
  });

  return {
    sourcemap: { server: true, client: false },

    ssr: false,
    dev: isDev,
    srcDir: resolve(__dirname, 'src'),

    alias: {
      '#root': resolve(__dirname, '../..'),
      '#packages': resolve(__dirname, '../'),
      '#lib': resolve(__dirname, '../lib/src/')
    },

    runtimeConfig: {
      public: {
        name: pkg.name,
        version: process.env.nextRelease || pkg.version || 'NA',
        NUXT_ENV_MAGIC_PUBLISHABLE_KEY:
          process.env.NUXT_ENV_MAGIC_PUBLISHABLE_KEY
      }
    },

    app: {
      baseURL: getBaseUrl()
    },

    imports: {
      dirs: ['store']
    },

    css: ['vuetify/lib/styles/main.css'],

    build: {
      transpile: ['rxjs', 'vuetify']
    },

    vite: {
      plugins: [
        svgLoader({
          defaultImport: 'component' // or 'raw'
        }),
        topLevelAwait()
      ],
      optimizeDeps: {
        esbuildOptions: {
          define: {
            global: 'globalThis'
          },
          plugins: [NodeGlobalsPolyfillPlugin()]
        }
      }
    },

    devServer: {
      port: getPort(),
      host: getHost()
    },

    modules: [
      '@pinia/nuxt',
      '@pinia-plugin-persistedstate/nuxt',
      '@nuxtjs/fontaine',
      async (options, nuxt) => {
        nuxt.hooks.hook('vite:extendConfig', config =>
          config.plugins.push(vuetify())
        );
      }
    ],

    postcss: {
      plugins: {
        'postcss-preset-env': {
          preserve: true,
          stage: 0,
          features: {
            'nesting-rules': true
          }
        },
        'postcss-functions': {
          functions: postcssFunctions
        }
        // '@fullhuman/postcss-purgecss': {
        //   content: [
        //     'src/pages/**/*.vue',
        //     'src/layouts/**/*.vue',
        //     'src/components/**/*.vue'
        //   ],
        //   safelist: [
        //     'html', 'body', /^nuxt/
        //   ]
        // }
      },
      order: 'cssnanoLast'
    }
  };
});

function getBaseUrl() {
  return process.env.npm_config_base_url || process.env.BASE_URL || '/';
}

function getHost() {
  return process.env.npm_config_host || process.env.HOST || 'localhost';
}

function getPort() {
  return (
    Number(process.env.npm_config_port) || Number(process.env.PORT) || 8050
  );
}