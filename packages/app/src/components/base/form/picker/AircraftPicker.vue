<template>
  <base-dialog v-model="model">
    <template #activator="{ props }">
      <base-input-text-field-protected
        v-bind="props"
        :value="model?.registration"
        :icon="mdiAirplaneSearch"
        type="text"
        label="Aircraft"
        clearable
        @click:clear="onClear" />
    </template>
    <template #default="bind">
      <view-aircraft-finder v-bind="bind"></view-aircraft-finder>
    </template>
  </base-dialog>
</template>

<script setup>
import { mdiAirplaneSearch } from '@mdi/js';
import ViewAircraftFinder from './views/AircraftFinder';
import BaseDialog from '@/components/base/Dialog';
import BaseInputTextFieldProtected from '@/components/base/inputs/TextFieldProtected';
</script>

<script>
export default {
  props: {
    modelValue: {
      type: [Object, null],
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
  },

  methods: {
    onClear() {
      console.log('AA');
      this.model = null;
      this.$emit('update:modelValue', null);
    }
  }
};
</script>
