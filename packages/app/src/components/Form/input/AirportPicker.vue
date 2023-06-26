<template>
  <base-dialog>
    <template #activator="{ props }">
      <base-input-text-field-protected
        v-bind="props"
        :value="$attrs.modelValue?.tags.name"
        :icon="mdiMapMarkerRadiusOutline"
        type="text"
        label="Location" />
    </template>
    <template #default="bind">
      <view-airport-finder v-bind="bind"></view-airport-finder>
    </template>
  </base-dialog>
</template>

<script setup>
import { mdiMapMarkerRadiusOutline } from '@mdi/js';
import ViewAirportFinder from './views/AirportFinder';
import BaseDialog from '@/components/base/Dialog';
import BaseInputTextFieldProtected from '@/components/base/inputs/TextFieldProtected';
</script>
