<template>
  <v-list>
    <v-radio-group v-model="model" :mandatory="true">
      <v-radio
        v-for="item in items"
        :key="item.id"
        :value="item"
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
  }
};
</script>
