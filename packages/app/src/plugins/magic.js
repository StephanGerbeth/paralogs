import { MagicLink } from '@thirdweb-dev/wallets';
import { getChainByChainId } from '@thirdweb-dev/chains';
import { defineNuxtPlugin, useRuntimeConfig } from '#app';

const createMagicThirdWeb = (key, chainId) => {
  return new MagicLink({
    apiKey: key,
    chains: [getChainByChainId(chainId)]
  });
};

export default defineNuxtPlugin(nuxtApp => {
  const config = useRuntimeConfig();
  return {
    provide: {
      wallet:
        typeof window !== 'undefined' &&
        createMagicThirdWeb(
          config.public.MAGIC_PUBLISHABLE_KEY,
          Number(config.public.CHAIN_ID)
        )
    }
  };
});
