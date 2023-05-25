<template>
  <form @submit.prevent="onSubmit">
    <input-email v-model="model.email"></input-email>
    <element-button type="submit">Login</element-button>
  </form>
</template>

<script>
// import { createDynamicModelObject } from '@/utils/setup';
import { useMagicStore } from '@/store/magic';
import InputEmail from '@/components/elements/InputEmail.vue';
import ElementButton from '@/components/elements/Button.vue';

export default {
  components: {
    InputEmail,
    ElementButton
  },

  emits: ['progress'],

  // setup(props, { emit }) {
  //   return {
  //     ...props,
  //     ...createDynamicModelObject(props, emit)
  //   };
  // },

  data() {
    return {
      model: {
        email: ''
      }
    };
  },

  methods: {
    async onSubmit() {
      const magic = useMagicStore();
      try {
        this.$emit('progress', {
          complete: magic.loginWithEmail({
            email: this.model.email
          }),
          model: this.model
        });
      } catch (e) {
        console.log(e);
      }
    }
  }
};
</script>
