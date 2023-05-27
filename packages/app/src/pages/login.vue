<template>
  <div>
    <login-mask></login-mask>
  </div>
</template>

<script>
import { definePageMeta } from '#imports';
import LoginMask from '@/components/modules/LoginMask.vue';

export default {
  components: {
    LoginMask
  },

  setup() {
    definePageMeta({
      middleware: ['auth']
    });
  }
};
</script>
