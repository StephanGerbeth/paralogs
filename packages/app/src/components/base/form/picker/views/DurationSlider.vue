<template>
  <v-card>
    <v-card-item>
      <div class="d-flex align-center justify-center">
        <v-icon :size="70" :icon="mdiUpdate"></v-icon>

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
