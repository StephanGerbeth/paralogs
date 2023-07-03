<template>
  <base-dialog v-model="model">
    <template #activator="{ props }">
      <base-input-text-field-protected
        v-bind="props"
        :value="formatted"
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
import { format, intervalToDuration } from 'date-fns';
import ViewDurationSlider from './views/DurationSlider';
import BaseDialog from '@/components/base/Dialog';
import BaseInputTextFieldProtected from '@/components/base/inputs/TextFieldProtected';
</script>

<script>
export default {
  props: {
    modelValue: {
      type: Date,
      required: true
    },

    start: {
      type: Date,
      required: true
    }
  },

  emits: ['update:modelValue'],

  data() {
    return {
      model: 0
    };
  },

  computed: {
    formatted() {
      const d = intervalToDuration({
        start: new Date(this.start),
        end: new Date(this.modelValue)
      });
      return format(new Date(0, 0, 0, d.hours, d.minutes, d.seconds), 'HH:mm');
    }
  },

  watch: {
    start: {
      handler() {
        this.update();
      }
    },
    model: {
      handler() {
        this.update();
      }
    }
  },

  methods: {
    update() {
      const date = new Date(this.start);
      date.setMinutes(date.getMinutes() + this.model * 60);
      this.$emit('update:modelValue', date);
    }
  }
};
</script>
