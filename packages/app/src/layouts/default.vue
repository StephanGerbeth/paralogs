<template>
  <v-layout>
    <v-app-bar title="Application bar">
      <page-header></page-header>
    </v-app-bar>
    <v-main>
      <slot />
      <div id="teleported"></div>
    </v-main>
  </v-layout>
</template>

<script>
import PageHeader from '@/components/modules/PageHeader.vue';

export default {
  components: {
    PageHeader
  }
};
</script>

<style scoped>
body {
  margin: 0;
  color: var(--color-base-foreground);
  background: var(--color-base-background-secondary);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body,
button,
input,
textarea,
select {
  font-family: var(--font-base);
}
</style>
