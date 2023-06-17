<template>
  <div>
    <element-leaflet-map :markers="markers" @bounds:update="onBoundsUpdate" />
  </div>
</template>

<script>
import ElementLeafletMap from '@/components/elements/LeafletMap.vue';
import { collectAirports } from '@/services/overpass';

export default {
  components: {
    ElementLeafletMap
  },

  data() {
    return {
      markers: []
    };
  },

  methods: {
    onBoundsUpdate(e) {
      this.markers = filterMarkers(this.markers, e);
      collectAirports({
        minlat: e.getSouth(),
        maxlat: e.getNorth(),
        minlon: e.getWest(),
        maxlon: e.getEast()
      }).subscribe(item => {
        this.markers = filterMarkers(unifyMarkers(this.markers, item), e);
      });
    }
  }
};

const unifyMarkers = (markers, item) => {
  const list = new Set(markers.map(item => JSON.stringify(item)));
  list.add(JSON.stringify([item.center.lat, item.center.lon]));
  return Array.from(list.values()).map(item => JSON.parse(item));
};

const filterMarkers = (markers, e) => {
  return markers.filter(([lat, lon]) => {
    return !(
      lat < e.getSouth() ||
      lat > e.getNorth() ||
      lon < e.getWest() ||
      lon > e.getEast()
    );
  });
};
</script>
