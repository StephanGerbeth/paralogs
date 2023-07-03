<template>
  <v-card>
    <base-map :loading="loading" @bounds:update="onBoundsUpdate">
      <template #default>
        <marker-airports v-model="model" :items="markers" />
      </template>
    </base-map>
    <base-list-radio v-model="model" :items="markers">
      <template #default="{ item }">
        <v-list-item :title="item.tags.name" :subtitle="item.id" />
      </template>
    </base-list-radio>
  </v-card>
</template>

<script setup>
import MarkerAirports from '@/components/Map/markers/Airports';
import BaseListRadio from '@/components/base/list/RadioList';
import BaseMap from '@/components/Map/';
import { collectAirports } from '@/services/overpass';
</script>

<script>
export default {
  props: {
    value: {
      type: [null, Object],
      required: true
    }
  },

  emits: ['input'],

  data() {
    return {
      loading: false,
      markers: [],
      selected: null
    };
  },

  computed: {
    model: {
      get() {
        return this.value;
      },

      set(value) {
        this.$emit('input', value);
      }
    }
  },

  methods: {
    onBoundsUpdate(e) {
      this.loading = true;
      this.markers = filterMarkers(this.markers, e);

      collectAirports(e).subscribe({
        next: item => {
          this.markers = filterMarkers(unifyMarkers(this.markers, item), e);
        },
        complete: () => {
          this.loading = false;
        }
      });
    }
  }
};

const unifyMarkers = (markers, item) => {
  const markerMap = new Map(markers.map(item => [item.id, item]));
  markerMap.set(item.id, item);
  return Array.from(markerMap.values());
};

const filterMarkers = (markers, e) => {
  return markers.filter(item => e.contains(item.center));
};
</script>
