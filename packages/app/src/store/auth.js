import { defineStore, acceptHMRUpdate } from 'pinia';
import { useNuxtApp, navigateTo, useRuntimeConfig } from '#app';

export const useAuthStore = defineStore('auth', {
  state: () => {
    return {
      user: null,
      authenticated: false
    };
  },

  actions: {
    async loginWithEmail(options) {
      const nuxtApp = useNuxtApp();
      const config = useRuntimeConfig();
      await nuxtApp.$wallet.connect({
        ...options,
        chainId: Number(config.public.CHAIN_ID)
      });
      const magicSDK = await nuxtApp.$wallet.getMagic();
      const info = await magicSDK.user.getMetadata();
      this.updateUser(info);
      navigateTo('/dashboard');
    },

    async logout() {
      const nuxtApp = useNuxtApp();
      await nuxtApp.$wallet.disconnect();
      this.updateUser();
      navigateTo('/login');
    },

    async autoLogin() {
      try {
        const nuxtApp = useNuxtApp();
        const config = useRuntimeConfig();
        await nuxtApp.$wallet.autoConnect({
          chainId: Number(config.public.CHAIN_ID)
        });
        const magicSDK = await nuxtApp.$wallet.getMagic();
        const info = await magicSDK.user.getMetadata();
        this.updateUser(info);
      } catch (e) {
        this.updateUser();
      }
    },

    updateUser(payload = undefined) {
      this.user = payload;
      this.authenticated = !!payload;
    }
  },

  persist: {
    storage: localStorage,
    async afterRestore(ctx) {
      ctx.store.autoLogin();
    }
  }
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
}
