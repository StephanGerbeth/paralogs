<template>
  <v-card>
    <v-card-item>
      <div class="d-flex align-center justify-center">
        <v-icon :size="70" :icon="$options.icon"></v-icon>

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
import slider from 'vue3-slider';
import { mdiAccountGroup } from '@mdi/js';
import BaseInputTextFieldProtected from '@/components/base/inputs/TextFieldProtected';
import { wrapComponent } from '@/utils/component.js';
</script>

<script>
export default {
  icon: mdiAccountGroup,

  activator() {
    return wrapComponent(BaseInputTextFieldProtected, {
      icon: this.icon
    });
  },

  props: {
    modelValue: {
      type: Number,
      required: true
    }
  },

  emits: ['update:modelValue'],

  computed: {
    amount: {
      get() {
        console.log('GET');
        return this.modelValue;
      },

      set(value) {
        console.log('SET');
        this.$emit('update:modelValue', value);
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
