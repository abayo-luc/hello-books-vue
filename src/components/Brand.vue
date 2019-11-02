<template>
  <div class="brand" :class="getClass">
    <img src="../assets/logo.svg" class="icon" />
    <h1>
      <span>HelloBooks</span>
    </h1>
  </div>
</template>
<script>
export default {
  name: 'Brand',
  props: {
    classes: {
      type: String,
      default: ''
    }
  },
  computed: {
    getClass() {
      return this.classes.split('');
    }
  }
};
</script>
<style lang="scss" scoped>
.brand {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 12rem;
  border: 1px dashed #000;
  border-radius: 5px;
  padding: 3px;
  h1 {
    font-family: "Lobster", cursive;
    padding-right: 3px;
  }
  img.icon {
    height: 30px;
  }
  @media (min-width: 320px) and (max-width: 480px) {
    &.short-brand {
      width: 2.5rem;
      margin-left: 5px;
      font-size: 12px;
      padding: 1px;
      // text-align: center;
      .icon,
      span {
        display: none;
      }
      h1::after {
        margin: 0;
        padding: 0;
        content: "HB";
      }
    }
  }
}
</style>
