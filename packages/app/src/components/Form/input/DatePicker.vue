<template>
  <base-dialog>
    <template #activator="{ props }">
      <base-input-text-field-protected
        v-bind="props"
        :value="format($attrs.modelValue, 'yyyy-MM-dd')"
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
