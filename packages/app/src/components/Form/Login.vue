<template>
  <base-form>
    <template #default>
      <form-login-email @progress="onProgress"></form-login-email>
    </template>
  </base-form>
</template>

<script setup>
import BaseForm from './';
import FormLoginEmail from '@/components/collections/FormLoginEmail.vue';
</script>
