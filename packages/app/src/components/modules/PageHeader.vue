<template>
  <header>
    <element-button v-if="auth.authenticated" @click="onLogout"
      >Logout</element-button
    >
  </header>
</template>

<script>
import { reactive } from 'vue';
import { useAuthStore } from '@/store/auth';
import ElementButton from '@/components/elements/Button.vue';

export default {
  components: {
    ElementButton
  },

  async setup() {
    return reactive({
      auth: useAuthStore()
    });
  },

  methods: {
    async onLogout() {
      await this.auth.logout();
    }
  }
};
</script>
