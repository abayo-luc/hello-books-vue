<template>
  <div class="loader" :style="styleObject" id="activity-indicator"></div>
</template>
<script>
export default {
  name: 'ActivityIndicotor',
  props: {
    styleObject: {
      type: Object,
      required: false
    }
  }
};
</script>
<style lang="scss" scopped>
.loader {
  border: 8px solid #f3f3f3;
  border-radius: 50%;
  border-top: 8px solid rgb(93, 207, 212);
  width: 30px;
  height: 30px;
  -webkit-animation: spin 2s linear infinite; /* Safari */
  animation: spin 2s linear infinite;
}

/* Safari */
@-webkit-keyframes spin {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
