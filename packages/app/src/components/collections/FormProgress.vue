<template>
  <div>LOADING</div>
</template>

<script>
export default {
  props: {
    progress: {
      type: Promise,
      required: true
    }
  },

  async setup(props) {
    await props.progress;
  },

  errorCaptured(e) {
    console.error(e);
  }
};
</script>
