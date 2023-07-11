<template>
  <v-autocomplete
    v-model="model"
    v-model:search="search"
    :loading="loading"
    :items="items"
    item-title="display_name"
    return-object
    class="autocomplete"
    density="comfortable"
    hide-no-data
    hide-details
    label="Ort"
    @update:search="e => debounce(querySelection(e))">
    <template #prepend-inner>
      <v-btn :icon="mdiCrosshairsGps" @click="onClickLocate">
        <v-progress-circular
          v-if="loading"
          :size="25"
          class="spinner"
          color="primary"
          indeterminate />
        <v-icon v-else :icon="mdiCrosshairsGps"></v-icon>
      </v-btn>
    </template>
  </v-autocomplete>
</template>

<script setup>
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import { useDebounceFn } from '@vueuse/core';
import { mdiCrosshairsGps } from '@mdi/js';
import Deferred from '@/classes/Deferred';

const debounce = useDebounceFn(async fn => fn(), 1000);
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

  data() {
    return {
      loading: false,
      items: [],
      search: null,
      provider: new OpenStreetMapProvider()
    };
  },

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
    async onClickLocate(e) {
      this.loading = true;
      const geo = await getGeoLocation(await this.map.promise);
      const result = await reverseGeo(geo);
      this.model = result;
      this.search = result.display_name;
      this.loading = false;
    },

    getLatLng(point) {
      return [point.lat, point.lon];
    },

    querySelection(e) {
      return async () => {
        this.items = (await this.provider.search({ query: e })).map(
          ({ raw }) => raw
        );
      };
    }
  }
};

const getGeoLocation = map => {
  return new Promise(resolve => {
    map.locate({ setView: true, maxZoom: 10 });
    map.on('locationfound', e => resolve(e));
  });
};

const reverseGeo = async e => {
  const url = new URL('https://nominatim.openstreetmap.org/reverse');
  url.searchParams.append('format', 'json');
  url.searchParams.append('lat', e.latitude);
  url.searchParams.append('lon', e.longitude);
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('cant reverse geocode');
  }
  return response.json();
};
</script>
