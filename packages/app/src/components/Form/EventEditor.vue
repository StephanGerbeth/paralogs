<template>
  <base-form>
    <event-date-definition v-model="model.eventDateRange" />
  </base-form>
</template>

<script setup>
import EventDateDefinition from './collections/EventDateDefinition.vue';
import BaseForm from './';
</script>

<script>
export default {
  data() {
    return {
      model: {
        eventDateRange: {
          start: null,
          end: null
        },
        participants: 1,
        address: null
      }
    };
  },
  watch: {
    model: {
      handler(e) {
        console.log(e);
      },
      deep: true
    }
  }
};
</script>
