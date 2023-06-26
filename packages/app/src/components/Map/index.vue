<template>
  <div class="map">
    <l-map
      v-if="center"
      v-model:zoom="zoom"
      :center="center"
      :use-global-leaflet="false"
      :options="{ zoomControl: false }"
      @ready="onReady"
      @update:bounds="onBoundsUpdate">
      <l-tile-layer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        layer-type="base"
        name="OpenStreetMap"
        :attribution="attribution" />
      <slot name="default"></slot>

      <controls-autocomplete
        v-model="model"
        :map="map"
        @update:model-value="onUpdate" />
      <controls-zoom />
    </l-map>
    <v-progress-circular
      v-if="loading"
      class="spinner"
      :size="25"
      color="primary"
      indeterminate></v-progress-circular>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { LMap, LTileLayer } from '@vue-leaflet/vue-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-geosearch/dist/geosearch.css';
import ControlsAutocomplete from './controls/Autocomplete.vue';
import ControlsZoom from './controls/Zoom.vue';
import Deferred from '@/classes/Deferred';
import { useRuntimeConfig } from '#app';

const attribution =
  '&copy; <a target="_blank" href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';

const config = useRuntimeConfig();
const url = `${config.public.GEOAPIFY_URL_IPINFO}?apiKey=${config.public.GEOAPIFY_API_KEY}`;
const center = ref(null);
fetch(url)
  .then(response => response.json())
  .then(
    ({ location: { latitude, longitude } }) =>
      (center.value = [latitude, longitude])
  )
  .catch(error => console.log('error', error));
</script>

<script>
export default {
  props: {
    loading: {
      type: Boolean,
      default: false
    }
  },

  emits: ['bounds:update'],

  data() {
    return {
      model: null,
      map: new Deferred(),
      zoom: 10
    };
  },

  methods: {
    async onReady(e) {
      this.map.resolve(e);
      this.onBoundsUpdate(e.getBounds());
    },

    async onUpdate(e) {
      (await this.map.promise).panTo(e);
    },

    onBoundsUpdate(e) {
      this.$emit('bounds:update', e);
    }
  }
};
</script>

<style scoped>
.map {
  position: relative;
  width: 100%;
  height: 300px;

  & .spinner {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 401;
  }
}
</style>
