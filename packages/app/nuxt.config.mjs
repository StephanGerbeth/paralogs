import { defineNuxtConfig } from 'nuxt/config';
import { resolve } from 'pathe';
import svgLoader from 'vite-svg-loader';
import topLevelAwait from 'vite-plugin-top-level-await';
import { readPackage } from 'read-pkg';
import * as postcssFunctions from './postcss/functions';

const isDev = process.env.NODE_ENV === 'development';

export default defineNuxtConfig(async () => {
  console.log(readPackage);
  const pkg = await readPackage({ cwd: resolve(process.cwd(), '../..') });

  return {
    sourcemap: { server: true, client: false },

    ssr: false,
    dev: isDev,
    srcDir: resolve(__dirname, 'src'),

    alias: {
      '#root': resolve(__dirname, '../..'),
      '#packages': resolve(__dirname, '../')
    },

    runtimeConfig: {
      public: {
        name: pkg.name,
        version: process.env.RELEASE_VERSION || pkg.version || 'NA'
      }
    },

    app: {
      baseUrl: getBaseUrl()
    },

    css: [],

    build: {
      transpile: ['rxjs']
    },

    vite: {
      plugins: [
        svgLoader({
          defaultImport: 'component' // or 'raw'
        }),
        topLevelAwait()
      ]
    },

    devServer: {
      port: getPort(),
      host: getHost()
    },

    modules: ['@nuxtjs/fontaine'],

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
  return process.env.npm_config_port || process.env.PORT || 8050;
}
