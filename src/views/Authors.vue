<template>
  <div class="about">
    <component :is="layout">
      <h1>This is the Author's page</h1>
    </component>
  </div>
</template>
<script>
export default {
  name: 'authors',
  computed: {
    layout() {
      return this.$route.meta.layout;
    }
  }
};
</script>
