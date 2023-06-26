<template>
  <date-picker v-model="date" />
  <time-picker></time-picker>
  <!-- <time-picker v-model="start" :base-date="date" :disabled="!date" />
  <duration-picker v-model="end" :base-date="start" :disabled="!start" /> -->
</template>

<script setup>
import DatePicker from '../inputs/DatePicker.vue';
import TimePicker from '../inputs/Picker.vue';
// import TimePicker from '../inputs/TimePicker.vue';
// import DurationPicker from '../inputs/DurationPicker.vue';
</script>

<script>
export default {
  props: {
    modelValue: {
      type: Object,
      required: true
    }
  },

  emits: ['update:modelValue'],

  data() {
    return {
      value: new Date()
    };
  },

  computed: {
    date: {
      get() {
        return this.value;
      },
      set(e) {
        this.value = e;
        this.$emit('update:modelValue', {
          ...this.modelValue,
          start: null,
          end: null
        });
      }
    },
    start: {
      get() {
        return this.modelValue.start;
      },
      set(e) {
        this.$emit('update:modelValue', {
          ...this.modelValue,
          start: e,
          end: null
        });
      }
    },
    end: {
      get() {
        return this.modelValue.end;
      },
      set(e) {
        this.$emit('update:modelValue', { ...this.modelValue, end: e });
      }
    }
  }
};
</script>
