<template>
  <button :type="type" class="btn" :class="getClass()">{{ title }}</button>
</template>

<script>
export default {
  name: 'BasicButton',
  props: {
    title: {
      type: String,
      required: true
    },
    type: {
      type: String
    },
    classes: {
      type: String,
      default: ''
    }
  },
  methods: {
    getClass() {
      return [this.classes.split(' ')];
    }
  }
};
</script>

<style lang="scss">
button.btn,
a.btn {
  width: 100%;
  box-shadow: 1px 5px 5px 0 rgba(0, 0, 0, 0.09);
  border: none;
  padding: 10px 0px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 15px 2px;
  cursor: pointer;
  text-decoration: none;
  border-radius: 5px;
  &.default {
    background-color: rgb(93, 207, 212);
    color: #ffffff;
  }
  &.basic {
    background-color: #ffffff;
    color: rgb(93, 207, 212);
    border: 0.5px solid rgba(0, 0, 0, 0.05);
  }
}
</style>
