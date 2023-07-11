<template>
  <v-text-field
    v-if="autocomplete"
    v-model="search"
    :prepend-inner-icon="mdiAirplaneSearch"
    v-bind="props"
    type="text"
    autofocus />
</template>

<script setup>
// https://www.algolia.com/doc/ui-libraries/autocomplete/guides/creating-a-renderer/
import algoliasearch from 'algoliasearch/lite';
import { createAutocomplete } from '@algolia/autocomplete-core';
import { getAlgoliaResults } from '@algolia/autocomplete-preset-algolia';
import { mdiAirplaneSearch } from '@mdi/js';
</script>

<script>
const searchClient = algoliasearch(
  '5H7DL4DG1C',
  '37e927df3239de8ac1ccca15c7a207d7'
);

export default {
  props: {
    modelValue: {
      type: [null, Object],
      required: true
    }
  },

  emits: ['update:modelValue', 'update:items'],

  data() {
    return {
      search: this.modelValue?.registration,
      items: [],
      autocomplete: null,
      value: null,
      props: {}
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

  created() {
    this.autocomplete = createAutocomplete({
      onStateChange: ({ state }) => {
        const list = state.collections
          .map((collection, index) => {
            const { items } = collection;
            return items;
          })
          .flat();
        this.$emit('update:items', list);
      },
      getSources() {
        return [
          {
            sourceId: 'test',
            getItemInputValue({ item }) {
              return item.query;
            },
            getItems({ query }) {
              return getAlgoliaResults({
                searchClient,
                queries: [
                  {
                    indexName: 'aircrafts_rc1',
                    query,
                    params: {
                      hitsPerPage: 4,
                      highlightPreTag: '<mark>',
                      highlightPostTag: '</mark>'
                    }
                  }
                ]
              });
            },
            getItemUrl({ item }) {
              return item.url;
            }
          }
        ];
      }
    });
    const { value, ...props } = this.autocomplete.getInputProps({});
    console.log(value, props, this.model);
    this.search = this.search || value;
    this.props = props;
  },

  mounted() {
    setTimeout(() => {
      this.$el.querySelector('input').focus();
    }, 100);
  }
};
</script>
