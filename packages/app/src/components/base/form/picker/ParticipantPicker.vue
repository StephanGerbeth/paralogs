<template>
  <base-dialog v-model="model">
    <template #activator="{ props }">
      <base-input-text-field-protected
        v-bind="props"
        :value="model"
        :icon="mdiAccountGroup"
        type="number"
        label="Participants" />
    </template>
    <template #default="bind">
      <view-participant-slider v-bind="bind"></view-participant-slider>
    </template>
  </base-dialog>
</template>

<script setup>
import { mdiAccountGroup } from '@mdi/js';
import ViewParticipantSlider from './views/ParticipantSlider.vue';
import BaseDialog from '@/components/base/Dialog';
import BaseInputTextFieldProtected from '@/components/base/inputs/TextFieldProtected';
</script>

<script>
export default {
  props: {
    modelValue: {
      type: Number,
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
