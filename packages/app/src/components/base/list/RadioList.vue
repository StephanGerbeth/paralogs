<template>
  <v-list>
    <v-radio-group v-model="model" :mandatory="true">
      <v-radio
        v-for="item in items"
        :key="item[uniqueKey]"
        :value="item"
        :value-comparator="compare"
        :false-icon="mdiRadioboxBlank"
        :true-icon="mdiRadioboxMarked">
        <template #label>
          <slot name="default" :item="item"></slot>
        </template>
      </v-radio>
    </v-radio-group>
  </v-list>
</template>

<script>
import { mdiRadioboxBlank, mdiRadioboxMarked } from '@mdi/js';

export default {
  props: {
    modelValue: {
      type: Object,
      default() {
        return null;
      }
    },

    items: {
      type: Array,
      default() {
        return [];
      }
    },

    uniqueKey: {
      type: String,
      default: 'id'
    }
  },

  emits: ['update:modelValue'],

  data() {
    return {
      mdiRadioboxBlank,
      mdiRadioboxMarked
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
    compare(selected, current) {
      return (
        selected &&
        current &&
        selected[this.uniqueKey] === current[this.uniqueKey]
      );
    }
  }
};
</script>
