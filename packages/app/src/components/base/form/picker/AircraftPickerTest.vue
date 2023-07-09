<template>
  <default-picker label="Aircraft" type="text" :icon="mdiAirplaneSearch">
    <template #default="bind">
      <view-aircraft-finder v-bind="bind"></view-aircraft-finder>
    </template>
  </default-picker>
</template>

<script setup>
import { mdiAirplaneSearch } from '@mdi/js';
import ViewAircraftFinder from './views/AircraftFinder';
import DefaultPicker from '@/components/base/form/picker/DefaultPicker.vue';
</script>
