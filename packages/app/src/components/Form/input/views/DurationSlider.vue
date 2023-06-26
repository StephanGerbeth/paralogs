<template>
  <v-card>
    <v-card-item>
      <div class="d-flex align-center justify-center">
        <v-icon :size="70" :icon="mdiUpdate"></v-icon>

        <div>
          <v-card-title class="text-h5">{{
            format(value, 'hh:mm a')
          }}</v-card-title>
          <v-card-subtitle>{{ format(value, 'HH:mm') }}</v-card-subtitle>
        </div>
      </div>
    </v-card-item>

    <div class="container">
      {{ duration }} {{ start }}
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
import { format, differenceInMinutes } from 'date-fns';
import { mdiUpdate } from '@mdi/js';
</script>

<script>
export default {
  props: {
    value: {
      type: Date,
      required: true
    },
    start: {
      type: Date,
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
    duration: {
      get() {
        return differenceInMinutes(this.value, this.start) / 60;
      },

      set(value) {
        const date = new Date(this.start);
        date.setMinutes(date.getMinutes() + value * 60);
        this.$emit('input', date);
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
