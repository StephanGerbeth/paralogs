<template>
  <base-dialog :key="model" v-model="model">
    <template #activator="{ props }">
      <base-input-text-field-protected
        v-bind="{ ...props, ...$attrs }"
        :value="model?.registration"
        :icon="icon"
        clearable
        @click:clear="onClear" />
    </template>
    <template #default="bind">
      <slot v-bind="bind" />
    </template>
  </base-dialog>
</template>

<script setup>
import BaseDialog from '@/components/base/Dialog';
import BaseInputTextFieldProtected from '@/components/base/inputs/TextFieldProtected';
</script>

<script>
export default {
  props: {
    modelValue: {
      type: [Object, null],
      required: true
    },

    icon: {
      type: String,
      required: true
    }
  },

  emits: ['update:modelValue'],

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
    onClear() {
      this.$emit('update:modelValue', null);
    }
  }
};
</script>
