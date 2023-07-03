<template>
  <base-dialog v-model="model">
    <template #activator="{ props }">
      <base-input-text-field-protected
        v-bind="props"
        :value="format(model, 'yyyy-MM-dd')"
        :icon="mdiCalendarBlank"
        type="date"
        label="Date" />
    </template>
    <template #default="bind">
      <view-calendar v-bind="bind" />
    </template>
  </base-dialog>
</template>

<script setup>
import { mdiCalendarBlank } from '@mdi/js';
import { format } from 'date-fns';
import ViewCalendar from './views/Calendar.vue';
import BaseDialog from '@/components/base/Dialog';
import BaseInputTextFieldProtected from '@/components/base/inputs/TextFieldProtected';
</script>

<script>
export default {
  props: {
    modelValue: {
      type: Date,
      required: true
    }
  },

  emits: ['update:modelValue'],

  computed: {
    model: {
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
