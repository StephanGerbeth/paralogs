<template>
  <form @submit.prevent="onSubmit">
    <date-picker v-model:value="date" type="date" placeholder="Select date" />
    <date-picker
      v-model:value="start"
      :disabled="!model.date"
      :time-picker-options="options.time"
      type="time"
      format="HH:mm"
      placeholder="Select start time"></date-picker>
    <date-picker
      v-model:value="end"
      :disabled="!model.start"
      :time-picker-options="options.duration"
      type="time"
      format="HH:mm"
      placeholder="Select duration"></date-picker>
    <element-button type="submit">Login</element-button>
  </form>
</template>

<script>
import DatePicker from 'vue-datepicker-next';
import 'vue-datepicker-next/index.css';
import ElementButton from '@/components/elements/Button.vue';

export default {
  components: {
    DatePicker,
    ElementButton
  },

  data() {
    return {
      model: {
        date: null,
        start: null,
        end: null
      },
      options: {
        time: {
          start: '05:00',
          step: '00:30',
          end: '22:00'
        },
        duration: {
          start: '00:30',
          step: '00:30',
          end: '04:00'
        }
      }
    };
  },

  computed: {
    date: {
      get() {
        return this.model.date;
      },

      set(value) {
        this.model.date = value;
        this.model.start = null;
        this.model.end = null;
      }
    },

    start: {
      get() {
        return this.model.start;
      },

      set(value) {
        if (!value) {
          this.model.start = null;
        } else {
          this.model.end = null;
          this.model.start = calcNewDate(
            this.model.date,
            this.model.date,
            value
          );
        }
      }
    },
    end: {
      get() {
        if (!this.model.date || !this.model.start || !this.model.end) {
          return null;
        }
        return calcNewDate(
          this.model.date,
          this.model.end,
          this.model.start,
          true
        );
      },

      set(value) {
        if (!value) {
          this.model.end = null;
        } else {
          this.model.end = calcNewDate(
            this.model.date,
            this.model.start,
            value
          );
        }
      }
    }
  },

  watch: {
    model: {
      handler(e) {
        console.log(e);
      },
      deep: true
    }
  },

  methods: {
    onSubmit(e) {
      console.log(e);
    },

    getNormalizedDate(date = new Date()) {
      const nDate = new Date(date);
      nDate.setHours(0);
      nDate.setMinutes(0);
      nDate.setSeconds(0);
      return nDate;
    }
  }
};

const calcNewDate = (baseDate, leftDate, rightDate, subtract) => {
  const date = new Date(baseDate);
  if (subtract) {
    date.setHours(leftDate.getHours() - rightDate.getHours());
    date.setMinutes(leftDate.getMinutes() - rightDate.getMinutes());
  } else {
    date.setHours(leftDate.getHours() + rightDate.getHours());
    date.setMinutes(leftDate.getMinutes() + rightDate.getMinutes());
  }
  date.setSeconds(0);
  return date;
};
</script>
