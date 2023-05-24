import { defineNuxtPlugin, useRuntimeConfig } from 'nuxt/app';
import { Magic } from 'magic-sdk';
import { AuthExtension } from '@magic-ext/auth';
import { WebAuthnExtension } from '@magic-ext/webauthn';

const createMagic = key => {
  return (
    typeof window !== 'undefined' &&
    new Magic(key, {
      extensions: [new AuthExtension(), new WebAuthnExtension()],
      network: {
        rpcUrl: 'https://rpc-mumbai.maticvigil.com/', // Polygon RPC URL
        chainId: 80001 // Polygon chain id
      }
    })
  );
};

export default defineNuxtPlugin(nuxtApp => {
  const config = useRuntimeConfig();
  return {
    provide: {
      magic: createMagic(config.public.NUXT_ENV_MAGIC_PUBLISHABLE_KEY)
    }
  };
});
