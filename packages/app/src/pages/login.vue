<template>
  <div>
    <h1>LOGIN</h1>
    <form-login></form-login>
  </div>
</template>

<script>
import FormLogin from '@/components/collections/FormLogin.vue';

export default {
  components: {
    FormLogin
  },

  mounted() {
    console.log(this);
  }
};
</script>
