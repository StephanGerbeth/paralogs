<template>
  <v-card>
    <v-date-picker v-model="model" hide-actions width="100%"></v-date-picker>
  </v-card>
</template>

<script setup>
import { VDatePicker } from 'vuetify/labs/VDatePicker';
import { mdiCalendar } from '@mdi/js';
import BaseInputTextFieldProtected from '@/components/base/inputs/TextFieldProtected';
import { wrapComponent } from '@/utils/component.js';
</script>

<script>
export default {
  icon: mdiCalendar,

  activator() {
    return wrapComponent(BaseInputTextFieldProtected, {
      icon: this.icon,
      formatter: model => {
        return model.toLocaleDateString(undefined, {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
      }
    });
  },

  props: {
    modelValue: {
      type: [Date, null],
      required: true
    }
  },

  emits: ['update:modelValue'],

  computed: {
    model: {
      get() {
        return [this.modelValue];
      },
      set([e]) {
        e.setHours(this.modelValue.getHours());
        e.setMinutes(this.modelValue.getMinutes());
        e.setSeconds(this.modelValue.getSeconds());
        this.$emit('update:modelValue', e);
      }
    }
  }
};
</script>
