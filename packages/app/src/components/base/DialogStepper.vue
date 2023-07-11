<template>
  <v-dialog v-model="dialog" transition="dialog-bottom-transition">
    <template #activator="{ props }">
      <div v-for="({ label, activator }, index) in views" :key="index">
        <component
          :is="activator"
          v-bind="{ ...props }"
          v-model="models[index]"
          :label="label"
          @click="onClick(index)" />
      </div>
    </template>
    <template #default>
      <v-card class="d-flex flex-row-reverse">
        <div>
          <v-tabs v-model="tab" color="primary" direction="vertical">
            <v-tab
              v-for="({ view }, index) in views"
              :key="index"
              class="justify-center"
              size="x-large">
              <v-icon :icon="view.icon" />
            </v-tab>
          </v-tabs>
          <v-card-actions class="pa-0">
            <stepper v-model="tab" :length="views.length">
              <v-btn block class="ma-0" size="x-large" @click="onReady">
                <v-icon :icon="mdiCheck" />
              </v-btn>
            </stepper>
          </v-card-actions>
        </div>
        <div class="flex-fill">
          <v-window v-model="tab" direction="vertical">
            <v-window-item v-for="(item, index) in views" :key="index">
              <component :is="item.view" v-model="models[index]" />
            </v-window-item>
          </v-window>
        </div>
      </v-card>
    </template>
  </v-dialog>
</template>

<script setup>
import { mdiCheck } from '@mdi/js';
import AircraftFinder from '@/components/base/test/AircraftFinder.vue';
import AirportFinder from '@/components/base/test/AirportFinder.vue';
import ParticipantSlider from '@/components/base/test/ParticipantSlider.vue';
import Calendar from '@/components/base/test/Calendar.vue';
import TimeSlider from '@/components/base/test/TimeSlider.vue';
import DurationSlider from '@/components/base/test/DurationSlider.vue';
import Stepper from '@/components/base/Stepper.vue';
</script>

<script>
export default {
  props: {
    views: {
      type: Array,
      default() {
        const date = new Date();
        const hours = date.getHours();
        date.setHours(0);
        date.setMinutes(hours * 60 + Math.ceil(date.getMinutes() / 15) * 15);
        return [
          {
            label: 'Aircraft',
            model: null,
            view: AircraftFinder,
            activator: AircraftFinder.activator()
          },
          {
            label: 'Airport',
            model: null,
            view: AirportFinder,
            activator: AirportFinder.activator()
          },
          {
            label: 'Participants',
            model: 1,
            view: ParticipantSlider,
            activator: ParticipantSlider.activator()
          },
          {
            label: 'Date',
            model: date,
            view: Calendar,
            activator: Calendar.activator()
          },
          {
            label: 'Time',
            model: date,
            view: TimeSlider,
            activator: TimeSlider.activator()
          },
          {
            label: 'Duration',
            model: 1,
            view: DurationSlider,
            activator: DurationSlider.activator()
          }
        ];
      }
    }
  },

  data() {
    return {
      dialog: false,
      tab: null,
      models: this.views.map(({ model }) => {
        return model;
      })
    };
  },

  watch: {
    dialog: {
      handler(e) {
        if (!e) {
          this.tab = null;
        }
      }
    },

    views: {
      handler(e) {
        console.log(e);
      },
      deep: true
    }
  },

  methods: {
    onClick(value) {
      this.tab = value;
    },

    onReady() {
      this.dialog = false;
    }
  }
};
</script>
