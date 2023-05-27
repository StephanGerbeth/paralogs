<template>
  <div>Dashboard</div>
</template>

<script>
import { definePageMeta } from '#imports';
import { uploadBatch } from '@/services/storage';

export default {
  setup() {
    definePageMeta({
      middleware: ['auth']
    });
  },

  async mounted() {
    const connected = await this.$sdk.connector.isConnected();
    console.log(connected);
    console.log(this.$sdk);
    const result = await uploadBatch([{ name: 'JSON 3' }, { name: 'JSON 4' }]);
    console.log(result);
  }
};
</script>
