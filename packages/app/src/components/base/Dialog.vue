<template>
  <div>
    <v-dialog v-model="dialog" transition="dialog-bottom-transition">
      <template #activator="props">
        <slot name="activator" v-bind="props" />
      </template>
      <template #default>
        <v-card>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="close" size="48" @click="onClose">
              <v-icon :icon="mdiCloseCircleOutline" size="48"></v-icon>
            </v-btn>
          </v-card-actions>
          <slot v-bind="{ value: model, onInput: updateModel }" />
          <v-card-actions>
            <v-btn block variant="flat" color="primary" @click="onSubmit">
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
  </div>
</template>

<script setup>
import { mdiCloseCircleOutline } from '@mdi/js';
</script>

<script>
export default {
  // eslint-disable-next-line vue/require-prop-types
  props: ['modelValue'],

  emits: ['update:modelValue'],

  data() {
    return {
      dialog: false,
      model: this.modelValue
    };
  },

  methods: {
    updateModel(value) {
      this.model = value;
    },

    onClose() {
      this.dialog = false;
      this.model = this.modelValue;
    },

    onSubmit() {
      this.dialog = false;
      this.$emit('update:modelValue', this.model);
    }
  }
};
</script>

<style scoped>
/* stylelint-disable-next-line selector-class-pattern */
:deep(.v-overlay .v-overlay__content) {
  width: 75%;
}
</style>
