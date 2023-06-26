<template>
  <base-dialog>
    <template #activator="{ props }">
      <base-input-text-field-protected
        v-bind="props"
        :value="format($attrs.modelValue, 'HH:mm')"
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
import { format } from 'date-fns';
import BaseDialog from '@/components/base/Dialog';
import ViewTimeSlider from '@/components/Form/input/views/TimeSlider';
import BaseInputTextFieldProtected from '@/components/base/inputs/TextFieldProtected';
</script>

<!-- <script>
export default {
  computed: {
    model: {
      get
    }
  }
}
</script> -->
