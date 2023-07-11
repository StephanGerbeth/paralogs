<template>
  <v-autocomplete
    v-model="model"
    v-model:search="search"
    :items="items"
    item-title="display_name"
    return-object
    class="autocomplete"
    density="comfortable"
    hide-no-data
    hide-details
    label="Ort"
    @update:search="e => debounce(querySelection(e))" />
</template>

<script setup>
import algoliasearch from 'algoliasearch/lite';
import { useDebounceFn } from '@vueuse/core';
const debounce = useDebounceFn(async fn => fn(), 1000);
</script>

<script>
const searchClient = algoliasearch(
  '5H7DL4DG1C',
  '37e927df3239de8ac1ccca15c7a207d7'
);
const index = searchClient.initIndex('aircrafts_rc1');

export default {
  props: {
    modelValue: {
      type: [null, Object],
      required: true
    }
  },

  emits: ['update:modelValue'],

  data() {
    return {
      search: null,
      items: []
    };
  },

  computed: {
    model: {
      get() {
        return this.modelValue;
      },

      set(e) {
        this.$emit('update:modelValue', e);
      }
    }
  },

  async mounted() {
    // document.activeElement.blur();
    // console.log(searchClient);
    // await this.$nextTick();
    // this.$el.focus();
  },

  methods: {
    querySelection(e) {
      console.log('E', e);
      return async () => {
        const result = await index.search(e);
        console.log(result);
        return [];
      };
    }
  }
};
</script>
