<template>
  <v-text-field
    :model-value="value"
    :prepend-inner-icon="icon"
    :label="resolvedLabel"
    :placeholder="resolvedPlaceholder"
    readonly></v-text-field>
</template>

<script>
export default {
  props: {
    value: {
      type: [String, Number, null],
      default() {
        return null;
      }
    },
    icon: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    }
  },

  computed: {
    resolvedLabel() {
      return ((this.value || this.value === 0) && this.label) || null;
    },
    resolvedPlaceholder() {
      return (!this.value && this.label) || null;
    }
  }
};
</script>
