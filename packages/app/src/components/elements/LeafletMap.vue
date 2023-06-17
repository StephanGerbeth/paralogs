<template>
  <div class="map">
    <l-map v-model:zoom="zoom" :center="center" @update:bounds="onBoundsUpdate">
      <l-tile-layer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        layer-type="base"
        name="OpenStreetMap"
        :attribution="attribution" />
      <l-circle-marker
        v-for="(item, index) in markers"
        :key="index"
        :lat-lng="item"
        :radius="radius"
        :color="color" />
    </l-map>
    {{ markers }}
  </div>
</template>

<script>
import { LMap, LTileLayer, LCircleMarker } from '@vue-leaflet/vue-leaflet';
import 'leaflet/dist/leaflet.css';

export default {
  components: {
    LMap,
    LTileLayer,
    LCircleMarker
  },

  props: {
    markers: {
      type: Array,
      default() {
        return [];
      }
    }
  },

  emits: ['bounds:update'],

  data() {
    return {
      zoom: 13,
      center: [47.41322, -1.219482],
      attribution:
        '&copy; <a target="_blank" href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      radius: 5,
      color: 'red'
    };
  },

  mounted() {},

  methods: {
    onBoundsUpdate(e) {
      this.$emit('bounds:update', e);
    }
  }
};
</script>

<style scoped>
.map {
  width: 100%;
  height: 300px;
}
</style>
