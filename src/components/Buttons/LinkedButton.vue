<template>
  <router-link class="btn" :class="getClass()" :to="to">{{title}}</router-link>
</template>

<script>
export default {
  name: 'BasicButton',
  props: {
    title: {
      type: String,
      required: true,
    },
    type: {
      type: String,
    },
    classes: {
      type: String,
      default: '',
    },
    to: {
      type: String,
      required: true,
    },
  },
  methods: {
    getClass() {
      return [this.classes.split(' ')];
    },
  },
};
</script>
