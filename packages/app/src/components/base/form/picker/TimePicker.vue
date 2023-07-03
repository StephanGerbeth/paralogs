<template>
  <base-dialog v-model="model">
    <template #activator="{ props }">
      <base-input-text-field-protected
        v-bind="props"
        :value="format(model, 'HH:mm')"
        :icon="mdiClockOutline"
        type="time"
        label="Time" />
    </template>
    <template #default="bind">
      <view-time-slider v-bind="bind" />
    </template>
  </base-dialog>
</template>

<script setup>
import { mdiClockOutline } from '@mdi/js';
import { format, roundToNearestMinutes } from 'date-fns';
import ViewTimeSlider from './views/TimeSlider';
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
        return roundToNearestMinutes(this.modelValue, {
          nearestTo: 15,
          roundingMethod: 'ceil'
        });
      },

      set(value) {
        this.$emit(
          'update:modelValue',
          roundToNearestMinutes(value, {
            nearestTo: 15,
            roundingMethod: 'ceil'
          })
        );
      }
    }
  },

  created() {
    this.$emit(
      'update:modelValue',
      roundToNearestMinutes(this.modelValue, {
        nearestTo: 15,
        roundingMethod: 'ceil'
      })
    );
  }
};
</script>
