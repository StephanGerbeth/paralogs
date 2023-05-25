<template>
  <div>
    <h1>LOGIN</h1>
    <Suspense>
      <form-progress :progress="progress.promise"></form-progress>
      <template #fallback>
        <form-login-email @progress="onProgress"></form-login-email>
      </template>
    </Suspense>
  </div>
</template>

<script>
import FormLoginEmail from '@/components/collections/FormLoginEmail.vue';
import FormProgress from '@/components/collections/FormProgress.vue';
import Deferred from '@/classes/Deferred';

export default {
  components: {
    FormLoginEmail,
    FormProgress
  },

  data() {
    return {
      progress: new Deferred()
    };
  },

  methods: {
    onProgress(progress) {
      this.progress.resolve(progress);
    }
  }
};
</script>
