<template>
  <div>Dashboard</div>
</template>

<script>
import { definePageMeta } from '#imports';

export default {
  setup() {
    definePageMeta({
      middleware: ['magic-auth']
    });
  }
};
</script>
