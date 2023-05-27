import { defineStore, acceptHMRUpdate } from 'pinia';
import { useNuxtApp, navigateTo } from '#app';

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
      await nuxtApp.$sdk.connect(options);
      const magicSDK = await nuxtApp.$sdk.getMagic();
      const info = await magicSDK.user.getMetadata();
      // await nuxtApp.$magic.auth.loginWithMagicLink(options);
      // const info = await nuxtApp.$magic.user.getInfo();
      this.updateUser(info);
      navigateTo('/dashboard');
    },

    async logout() {
      const nuxtApp = useNuxtApp();
      await nuxtApp.$sdk.disconnect();
      // await nuxtApp.$magic.user.logout();
      this.updateUser();
      navigateTo('/login');
    },

    async autoLogin() {
      const nuxtApp = useNuxtApp();
      try {
        await nuxtApp.$sdk.autoConnect();
        const magicSDK = await nuxtApp.$sdk.getMagic();
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
