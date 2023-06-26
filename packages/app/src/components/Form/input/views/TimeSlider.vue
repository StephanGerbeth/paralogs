<template>
  <v-card>
    <v-card-item>
      <div class="d-flex align-center justify-center">
        <v-icon :size="70" :icon="mdiClockOutline"></v-icon>

        <div>
          <v-card-title class="text-h5">{{
            format(value, 'hh:mm a')
          }}</v-card-title>
          <v-card-subtitle>{{ format(value, 'HH:mm') }}</v-card-subtitle>
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
        <v-btn :value="false">AM</v-btn>
        <v-btn :value="true">PM</v-btn>
      </v-btn-toggle>
    </div>
  </v-card>
</template>

<script setup>
import slider from 'vue3-slider';
import { format } from 'date-fns';
import { mdiClockOutline } from '@mdi/js';
</script>

<script>
export default {
  props: {
    value: {
      type: Date,
      required: true
    }
  },

  emits: ['input'],

  data() {
    return {
      stepMinutes: 15
    };
  },

  computed: {
    pm: {
      get() {
        return this.value.getHours() / 12 >= 1;
      },

      set(isPM) {
        this.$emit(
          'input',
          convertTo24Hours(this.value, this.value.getHours(), isPM)
        );
      }
    },
    hours: {
      get() {
        return normHours(this.value.getHours());
      },

      set(hours) {
        this.$emit('input', convertTo24Hours(this.value, hours, this.pm));
      }
    },

    minutes: {
      get() {
        return normMinutes(this.value.getMinutes(), this.stepMinutes);
      },

      set(e) {
        console.log('ALO');
        this.$emit('input', new Date(this.value.setMinutes(e)));
      }
    },

    time() {
      return format(this.value, 'hh:mm aaaaa');
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
