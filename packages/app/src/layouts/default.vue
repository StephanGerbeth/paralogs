<template>
  <div>
    <slot />
  </div>
</template>

<script>
export default {};
</script>

<style lang="postcss">
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
