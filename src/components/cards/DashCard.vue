<template>
  <div
    class="dash-card"
    :style="{backgroundImage: 'url(\'' + require('../../assets/' + img ) + '\')'}"
  >
    <div class="container">
      <p>{{title}}</p>
    </div>
  </div>
</template>
<script>
export default {
  name: 'DashCard',
  props: {
    title: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
  },
};
</script>
<style lang="scss" scoped>
.dash-card {
  border-radius: 15px;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.08);
  transition: 0.3s;
  width: 23%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  cursor: pointer;
  &:hover {
    box-shadow: 0 10px 18px 0 rgba(0, 0, 0, 0.2);
  }
  .container {
    height: 5em;
    display: flex;
    padding: 15px;
    justify-content: flex-start;
    align-items: flex-end;
    color: #fff;
    p {
      text-transform: capitalize;
      font-weight: 600;
    }
  }
}
</style>
