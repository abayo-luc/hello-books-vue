<template>
  <div class="auth-layout">
    <div class="content-container">
      <div class="brand-container">
        <brand />
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import Brand from '../Brand.vue';

export default {
  name: 'AuthLayout',
  components: {
    Brand
  }
};
</script>

<style lang="scss" scoped>
.auth-layout {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-color: #fff;
  background-image: url("../../assets/superdaman.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
.content-container {
  width: 40%;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
  height: 80%;
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.05);
  background-color: rgba(250, 250, 250, 0.8);
  padding: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .signup-form {
    width: 60%;
  }
  @media (max-width: 1024px) {
    width: 100%;
    height: 100%;
    border-radius: 0;
    justify-content: space-around;
    padding: 5em 2em;
    .signup-form {
      width: 90%;
    }
  }
  .auth-link {
    font-size: 16px;
    color: #546b81;
    align-items: center;
    a.link {
      text-decoration: none;
      color: rgb(93, 207, 212);
      &:hover {
        font-style: italic;
      }
    }
  }
}
</style>
