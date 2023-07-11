<template>
  <v-card>
    <v-card-item>
      <div class="d-flex align-center justify-center">
        <v-icon :size="70" :icon="$options.icon"></v-icon>

        <div>
          <v-card-title class="text-h5">{{ formatted }}</v-card-title>
        </div>
      </div>
    </v-card-item>

    <div class="container">
      {{ duration }}
      <slider
        v-model="duration"
        color="#FB278D"
        track-color="#ABABAB"
        orientation="circular"
        :circle-gap="90"
        :circle-offset="225"
        :step="0.25"
        :min="0"
        :max="4"
        :sticky="true"
        :always-show-handle="true"
        :handle-scale="2"
        width="100%" />
    </div>
  </v-card>
</template>

<script setup>
import slider from 'vue3-slider';
import { format } from 'date-fns';
import { mdiUpdate } from '@mdi/js';
import BaseInputTextFieldProtected from '@/components/base/inputs/TextFieldProtected';
import { wrapComponent } from '@/utils/component.js';
</script>

<script>
export default {
  icon: mdiUpdate,

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

  data() {
    return {
      stepMinutes: 15
    };
  },

  computed: {
    formatted() {
      const date = new Date();
      date.setHours(0);
      date.setMinutes(this.duration * 60);
      date.setSeconds(0);
      return format(date, 'HH:mm');
    },

    duration: {
      get() {
        return this.modelValue;
      },

      set(value) {
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

  & .minutes {
    position: absolute;
    inset: 0;
    margin: auto;
  }

  & .toggle {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}

:deep(svg) {
  display: block;
}
</style>
