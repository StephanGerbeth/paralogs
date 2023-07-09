<template>
  <v-card>
    <v-date-picker v-model="model" hide-actions></v-date-picker>
  </v-card>
</template>

<script setup>
import { VDatePicker } from 'vuetify/labs/VDatePicker';
</script>

<script>
export default {
  props: {
    value: {
      type: [Date, null],
      required: true
    }
  },

  emits: ['input'],

  computed: {
    model: {
      get() {
        return [this.value];
      },
      set([e]) {
        e.setHours(this.value.getHours());
        e.setMinutes(this.value.getMinutes());
        e.setSeconds(this.value.getSeconds());
        this.$emit('input', e);
      }
    }
  }
};
</script>
