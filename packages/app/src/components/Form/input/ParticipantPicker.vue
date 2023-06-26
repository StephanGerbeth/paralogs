<template>
  <base-dialog>
    <template #activator="{ props }">
      <base-input-text-field-protected
        v-bind="props"
        :value="$attrs.modelValue"
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
