<template>
  <base-dialog>
    <template #activator="{ props }">
      <base-input-text-field-protected
        v-bind="props"
        :value="format(duration, 'HH:mm')"
        :icon="mdiUpdate"
        type="time"
        label="Duration" />
    </template>
    <template #default="bind">
      <view-duration-slider v-bind="{ ...bind, ...$attrs }" />
    </template>
  </base-dialog>
</template>

<script setup>
import { mdiUpdate } from '@mdi/js';
import { format, differenceInMinutes } from 'date-fns';
import BaseDialog from '@/components/base/Dialog';
import ViewDurationSlider from '@/components/Form/input/views/DurationSlider';
import BaseInputTextFieldProtected from '@/components/base/inputs/TextFieldProtected';
</script>

<script>
export default {
  emits: ['update:modelValue'],

  computed: {
    duration() {
      const diffMin = differenceInMinutes(
        this.$attrs.modelValue,
        this.$attrs.start
      );

      const date = new Date(this.$attrs.start);
      date.setHours(0);
      date.setMinutes(diffMin);
      date.setSeconds(0);
      return date;
    }
  },

  watch: {
    '$attrs.start': {
      handler(newValue, oldValue) {
        const diffMin = differenceInMinutes(this.$attrs.modelValue, oldValue);

        const date = new Date(newValue);
        date.setMinutes(date.getMinutes() + diffMin);
        this.$emit('update:modelValue', date);
      }
    }
  }
};
</script>
