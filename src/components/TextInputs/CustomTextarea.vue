<template>
  <div class="custom-textarea">
    <div class="title">
      <p>{{title}}</p>
    </div>
    <textarea></textarea>
  </div>
</template>

<script>
export default {
  name: 'CustomTextarea',
  props: {
    title: {
      type: String
    }
  }
};
</script>

<style lang="scss" scoped>
.custom-textarea {
  textarea {
    width: 100%;
    border: 1px solid #ccc;
    background-color: #ffff;
  }
}
</style>
