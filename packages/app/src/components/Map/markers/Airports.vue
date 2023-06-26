<template>
  <l-marker
    v-for="item in items"
    :key="item.id"
    :lat-lng="getLatLng(item.center)"
    @click="onClick(item)">
    <l-icon
      class-name="marker-icon"
      :icon-size="dynamicSize(iconSize)"
      :icon-anchor="dynamicAnchor(iconSize)">
      <v-icon class="icon" :icon="mdiMapMarker"></v-icon>
    </l-icon>
  </l-marker>
  <l-circle-marker
    v-for="item in items"
    :key="item.id"
    :lat-lng="getLatLng(item.center)"
    :radius="radius"
    :color="getColor(item)"
    @click="onClick(item)">
  </l-circle-marker>
</template>

<script setup>
import { mdiMapMarker } from '@mdi/js';
import { LCircleMarker, LMarker, LIcon } from '@vue-leaflet/vue-leaflet';
import { dynamicSize, dynamicAnchor } from '@/utils/dynamicIcon.js';

const iconSize = 40;
const radius = 5;
</script>

<script>
export default {
  props: {
    modelValue: {
      type: Object,
      default() {
        return null;
      }
    },

    items: {
      type: Array,
      default() {
        return [];
      }
    }
  },

  emits: ['update:modelValue'],

  methods: {
    getLatLng(point) {
      return [point.lat, point.lon];
    },

    getColor(item) {
      if (item.id === this.modelValue?.id) {
        return 'green';
      }
      return 'red';
    },

    onClick(e) {
      this.$emit('update:modelValue', e);
    }
  }
};
</script>

<style scoped>
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
