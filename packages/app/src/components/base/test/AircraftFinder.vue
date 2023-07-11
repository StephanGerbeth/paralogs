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
import { mdiAirplaneSearch } from '@mdi/js';
import BaseListRadio from '@/components/base/list/RadioList';
import InputAutocompleteAircrafts from '@/components/base/inputs/AutocompleteAircraftsTest.vue';
import BaseInputTextFieldProtected from '@/components/base/inputs/TextFieldProtected';
import { wrapComponent } from '@/utils/component.js';
</script>

<script>
export default {
  icon: mdiAirplaneSearch,

  activator() {
    return wrapComponent(BaseInputTextFieldProtected, {
      icon: this.icon,
      formatter: model => model?.registration
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
      items: []
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
    onUpdateItems(items) {
      this.items = items;
    }
  }
};
</script>
