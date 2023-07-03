<template>
  <v-card>
    <input-autocomplete-aircrafts
      v-model="model"
      @update:items="onUpdateItems" />
    <base-list-radio v-model="model" :items="items" unique-key="objectID">
      <template #default="{ item }">
        <v-list-item
          :title="`${item.registration} - ${item.manufacturername} ${item.model}`"
          :subtitle="item.owner" />
      </template>
    </base-list-radio>
  </v-card>
</template>

<script setup>
import BaseListRadio from '@/components/base/list/RadioList';
import InputAutocompleteAircrafts from '@/components/base/inputs/AutocompleteAircraftsTest.vue';
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
      items: []
    };
  },

  computed: {
    model: {
      get() {
        console.log(this.value);
        return this.value;
      },

      set(value) {
        this.$emit('input', value);
      }
    }
  },

  methods: {
    onUpdateItems(items) {
      this.items = items;
    }
  }
};
</script>
