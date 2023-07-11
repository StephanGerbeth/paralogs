<template>
  <v-slide-group direction="vertical" class="flex-grow-1">
    <v-slide-group-item>
      <v-btn
        block
        class="ma-0"
        size="x-large"
        :disabled="modelValue <= 0"
        @click="prev">
        <v-icon :icon="mdiChevronUp" />
      </v-btn>
    </v-slide-group-item>
    <slot />

    <v-btn
      block
      class="ma-0"
      size="x-large"
      :disabled="modelValue >= length - 1"
      @click="next">
      <v-icon :icon="mdiChevronDown" />
    </v-btn>
  </v-slide-group>
</template>

<script setup>
import { mdiChevronUp, mdiChevronDown } from '@mdi/js';
</script>

<script>
export default {
  props: {
    modelValue: {
      type: Number,
      required: true
    },

    length: {
      type: Number,
      required: true
    }
  },

  emits: ['update:modelValue'],

  methods: {
    prev() {
      this.$emit('update:modelValue', this.modelValue - 1);
    },

    next() {
      this.$emit('update:modelValue', this.modelValue + 1);
    }
  }
};
</script>
