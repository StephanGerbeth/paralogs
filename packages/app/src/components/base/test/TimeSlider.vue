<template>
  <v-card>
    <v-card-item>
      <div class="d-flex align-center justify-center">
        <v-icon :size="70" :icon="$options.icon"></v-icon>

        <div>
          <v-card-title class="text-h5">{{
            format(modelValue, 'hh:mm a')
          }}</v-card-title>
          <v-card-subtitle>{{ format(modelValue, 'HH:mm') }}</v-card-subtitle>
        </div>
      </div>
    </v-card-item>

    <div class="container">
      <slider
        v-model="hours"
        class="hours"
        color="#FB278D"
        track-color="#ABABAB"
        orientation="circular"
        :circle-gap="30"
        :step="1"
        :min="0"
        :max="11"
        :sticky="true"
        :always-show-handle="true"
        :handle-scale="2"
        width="100%" />
      <slider
        v-model="minutes"
        class="minutes"
        color="#FB278D"
        track-color="#ABABAB"
        orientation="circular"
        :circle-gap="90"
        :step="stepMinutes"
        :min="0"
        :max="45"
        :sticky="true"
        :always-show-handle="true"
        :handle-scale="2"
        width="50%" />
      <v-btn-toggle v-model="pm" class="toggle" color="primary" mandatory>
        <v-btn :icon="mdiWeatherSunny" size="x-large" :value="false" />
        <v-btn :icon="mdiWeatherNight" size="x-large" :value="true" />
      </v-btn-toggle>
    </div>
  </v-card>
</template>

<script setup>
import slider from 'vue3-slider';
import { format } from 'date-fns';
import { mdiClockOutline, mdiWeatherSunny, mdiWeatherNight } from '@mdi/js';
import BaseInputTextFieldProtected from '@/components/base/inputs/TextFieldProtected';
import { wrapComponent } from '@/utils/component.js';
</script>

<script>
export default {
  icon: mdiClockOutline,

  activator() {
    return wrapComponent(BaseInputTextFieldProtected, {
      icon: this.icon,
      formatter: model => {
        console.log(model);
        return model.toLocaleTimeString(undefined, {
          hour: '2-digit',
          minute: '2-digit'
        });
      }
    });
  },

  props: {
    modelValue: {
      type: Date,
      required: true
    }
  },

  emits: ['update:modelValue'],

  data() {
    return {
      stepMinutes: 15
    };
  },

  computed: {
    pm: {
      get() {
        return this.modelValue.getHours() / 12 >= 1;
      },

      set(isPM) {
        this.$emit(
          'update:modelValue',
          convertTo24Hours(this.modelValue, this.modelValue.getHours(), isPM)
        );
      }
    },
    hours: {
      get() {
        return normHours(this.modelValue.getHours());
      },

      set(hours) {
        this.$emit(
          'update:modelValue',
          convertTo24Hours(this.modelValue, hours, this.pm)
        );
      }
    },

    minutes: {
      get() {
        return normMinutes(this.modelValue.getMinutes(), this.stepMinutes);
      },

      set(e) {
        // TODO: debounce update
        console.log('ALO');
        this.$emit(
          'update:modelValue',
          new Date(this.modelValue.setMinutes(e))
        );
      }
    }
  }
};

const convertTo24Hours = (date, hours, isPM) => {
  return new Date(date.setHours((hours % 12) + 12 * isPM));
};

const normHours = hours => {
  return hours % 12;
};

const normMinutes = (minutes, step) => {
  console.log(Math.round(59 / step) * step);
  return (Math.round(minutes / step) * step) % 60;
};
</script>

<style scoped>
.container {
  position: relative;
  padding: 10%;

  & .minutes {
    position: absolute;
    inset: 0;
    margin: auto;
  }

  & .toggle {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}

:deep(svg) {
  display: block;
}
</style>
