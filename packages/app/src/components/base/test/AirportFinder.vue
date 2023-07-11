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
import { mdiMapMarkerRadiusOutline } from '@mdi/js';
import BaseInputTextFieldProtected from '@/components/base/inputs/TextFieldProtected';
import MarkerAirports from '@/components/Map/markers/Airports';
import BaseListRadio from '@/components/base/list/RadioList';
import BaseMap from '@/components/Map/';
import { collectAirports } from '@/services/overpass';
import { wrapComponent } from '@/utils/component.js';
</script>

<script>
export default {
  icon: mdiMapMarkerRadiusOutline,

  activator() {
    return wrapComponent(BaseInputTextFieldProtected, {
      icon: this.icon,
      formatter: model => {
        return model?.tags.name;
      }
    });
  },

  props: {
    modelValue: {
      type: [null, Object],
      required: true
    }
  },

  emits: ['update:modelValue'],

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
        return this.modelValue;
      },

      set(value) {
        this.$emit('update:modelValue', value);
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
