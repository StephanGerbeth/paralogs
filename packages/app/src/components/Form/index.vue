<template>
  <form @submit.prevent="onSubmit">
    <Suspense>
      <default-loading :progress="progress.promise"></default-loading>
      <template #fallback>
        <slot name="default" />
      </template>
    </Suspense>
  </form>
</template>

<script setup>
import DefaultLoading from '@/components/Form/loading/Default.vue';
import Deferred from '@/classes/Deferred';
</script>

<script>
export default {
  data() {
    return {
      progress: new Deferred()
    };
  },

  methods: {
    onProgress(progress) {
      this.progress.resolve(progress);
    }
  }
};
</script>
