<template>
  <div>Dashboard</div>
</template>

<script>
import { definePageMeta } from 'nuxt/app';

export default {
  setup() {
    definePageMeta({
      middleware: ['magic-auth']
    });
  }
};
</script>
