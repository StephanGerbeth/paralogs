<template>
  <v-text-field
    v-model="model"
    :prepend-inner-icon="icon"
    :label="resolvedLabel"
    :placeholder="resolvedPlaceholder"
    type="text"
    :clearable="model !== defaultValue"
    readonly
    @focus="onFocus"></v-text-field>
</template>

<script>
export default {
  props: {
    modelValue: {
      type: [Object, String, Number, null],
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
    },
    formatter: {
      type: Function,
      default(model) {
        return model;
      }
    }
  },

  emits: ['update:modelValue'],

  data() {
    return {
      defaultValue: this.modelValue
    };
  },

  computed: {
    model: {
      get() {
        return this.formatter(this.modelValue);
      },
      set(e) {
        this.$emit('update:modelValue', e || this.defaultValue);
      }
    },

    resolvedLabel() {
      return ((this.modelValue || this.modelValue === 0) && this.label) || null;
    },
    resolvedPlaceholder() {
      return (!this.modelValue && this.label) || null;
    }
  },

  methods: {
    onFocus(e) {
      e.target.blur();
    }
  }
};
</script>
