import { defineNuxtPlugin, useRuntimeConfig } from 'nuxt/app';
import { Magic } from 'magic-sdk';
import { AuthExtension } from '@magic-ext/auth';
import { MagicLink } from '@thirdweb-dev/wallets';
import { Mumbai } from '@thirdweb-dev/chains';

const createMagic = key => {
  return new Magic(key, {
    extensions: [new AuthExtension()],
    network: {
      rpcUrl: 'https://rpc-mumbai.maticvigil.com/', // Polygon RPC URL
      chainId: 80001 // Polygon chain id
    }
  });
};

const createMagicThirdWeb = key => {
  return new MagicLink({
    apiKey: key,
    chain: [Mumbai]
  });
};

export default defineNuxtPlugin(nuxtApp => {
  const config = useRuntimeConfig();
  return {
    provide: {
      magic:
        typeof window !== 'undefined' &&
        createMagic(config.public.NUXT_ENV_MAGIC_PUBLISHABLE_KEY),
      sdk:
        typeof window !== 'undefined' &&
        createMagicThirdWeb(config.public.NUXT_ENV_MAGIC_PUBLISHABLE_KEY)
    }
  };
});
