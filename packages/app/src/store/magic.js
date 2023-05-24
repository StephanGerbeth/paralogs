import { navigateTo } from 'nuxt/app';
import { defineStore } from 'pinia';
import { useNuxtApp } from '#app';

export const useMagicStore = defineStore('magic-store', {
  state: () => {
    return {
      user: null,
      authenticated: false
    };
  },

  actions: {
    async loginWithEmail(options) {
      const nuxtApp = useNuxtApp();
      await nuxtApp.$magic.auth.loginWithMagicLink(options);
      const info = await nuxtApp.$magic.user.getInfo();
      this.updateUser(info);
      navigateTo('/dashboard');
    },

    async logout() {
      const nuxtApp = useNuxtApp();
      await nuxtApp.$magic.user.logout();
      this.updateUser();
    },

    updateUser(payload = undefined) {
      this.user = payload;
      this.authenticated = !!payload;
    }
  },

  persist: true
});
