<template>
  <v-card>
    <v-card-item>
      <div class="d-flex align-center justify-center">
        <v-icon :size="70" :icon="mdiAccountGroup"></v-icon>

        <div>
          <v-card-title class="text-h5">{{ amount }}</v-card-title>
        </div>
      </div>
    </v-card-item>
    <div class="container">
      <slider
        v-model="amount"
        color="#FB278D"
        track-color="#ABABAB"
        orientation="circular"
        :circle-gap="90"
        :circle-offset="225"
        :step="1"
        :min="1"
        :max="20"
        :sticky="true"
        :always-show-handle="true"
        :handle-scale="2"
        width="100%" />
    </div>
  </v-card>
</template>

<script setup>
import { mdiAccountGroup } from '@mdi/js';
import slider from 'vue3-slider';
</script>

<script>
export default {
  props: {
    value: {
      type: Number,
      required: true
    }
  },

  emits: ['input'],

  computed: {
    amount: {
      get() {
        return this.value;
      },

      set(value) {
        this.$emit('input', value);
      }
    }
  }
};
</script>

<style scoped>
.container {
  position: relative;
  padding: 10%;
}

:deep(svg) {
  display: block;
}
</style>
