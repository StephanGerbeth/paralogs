<template>
  <base-overlay>
    <date-picker
      v-bind="$attrs"
      v-model:value="model"
      :time-picker-options="options.duration"
      type="time"
      format="HH:mm"
      placeholder="Select duration" />
  </base-overlay>
</template>

<script setup>
import DatePicker from 'vue-datepicker-next';
import 'vue-datepicker-next/index.css';
import BaseOverlay from '@/components/base/Overlay';

const options = {
  duration: {
    start: '00:30',
    step: '00:30',
    end: '04:00'
  }
};
</script>

<script>
export default {
  props: {
    modelValue: {
      type: [Date, null],
      required: true
    },

    baseDate: {
      type: Date,
      default() {
        return new Date();
      }
    }
  },

  emits: ['update:model-value'],

  computed: {
    model: {
      get() {
        if (!this.baseDate || !this.modelValue) {
          return null;
        }
        const date = new Date(this.baseDate);
        date.setHours(this.modelValue.getHours() - this.baseDate.getHours());
        date.setMinutes(
          this.modelValue.getMinutes() - this.baseDate.getMinutes()
        );
        date.setSeconds(0);
        return date;
      },
      set(e) {
        const date = new Date(this.baseDate);
        date.setHours(this.baseDate.getHours() + e.getHours());
        date.setMinutes(this.baseDate.getMinutes() + e.getMinutes());
        date.setSeconds(0);
        this.$emit('update:model-value', date);
      }
    }
  }
};
</script>
