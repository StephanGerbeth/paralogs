<template>
  <l-control position="topleft">
    <input-autocomplete-location v-model="model" :map="map" />
  </l-control>
  <l-marker v-if="model" :lat-lng="getLatLng(model)">
    <l-icon
      class-name="marker-icon"
      :icon-size="dynamicSize(iconSize)"
      :icon-anchor="dynamicAnchor(iconSize)">
      <v-icon class="icon" color="green" :icon="mdiMapMarker"></v-icon>
    </l-icon>
  </l-marker>
</template>
<script setup>
import { LControl, LMarker, LIcon } from '@vue-leaflet/vue-leaflet';
import { mdiMapMarker } from '@mdi/js';
import InputAutocompleteLocation from '@/components/base/inputs/AutocompleteLocation';
import { dynamicSize, dynamicAnchor } from '@/utils/dynamicIcon.js';

import Deferred from '@/classes/Deferred';
const iconSize = 40;
</script>

<script>
export default {
  props: {
    modelValue: {
      type: [null, Object],
      required: true
    },

    map: {
      type: Deferred,
      required: true
    }
  },

  emits: ['update:modelValue'],

  computed: {
    model: {
      get() {
        return this.modelValue;
      },

      set(e) {
        this.$emit('update:modelValue', e);
      }
    }
  },

  methods: {
    getLatLng(point) {
      return [point.lat, point.lon];
    }
  }
};
</script>

<style scoped>
.autocomplete {
  width: 400px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  /* stylelint-disable-next-line selector-class-pattern */
  & :deep(.v-autocomplete__selection) {
    overflow: hidden;
  }
}

.marker-icon {
  width: auto !important;
  height: auto !important;
  padding: 10px;
  margin: 0 !important;
  text-align: center;
  background-color: aqua;
  border: 1px solid #333;
  border-radius: 0 20px 20px;
  box-shadow: 5px 3px 10px rgb(0 0 0 / 20%);
}

.icon {
  width: 100%;
  height: 100%;
}
</style>
