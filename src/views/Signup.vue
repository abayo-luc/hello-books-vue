<template>
  <div class="signup-page">
    <div class="content-container">
      <div class="brand-container">
        <brand />
      </div>
      <form action method="post" class="signup-form">
        <input-icon type="text" iconName="user" placeholder="Name" />
        <input-icon type="email" iconName="email" placeholder="Email" />
        <input-icon type="password" iconName="lock" placeholder="Password" />
        <input-icon type="password" iconName="lock" placeholder="Confirm password" />
        <div class="group-btns">
          <basic-button title="Signup" classes="default" />
        </div>
      </form>
      <div class="auth-link">
        <p>
          Already have an account?
          <router-link to="/login" class="link">Login</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import Brand from '../components/Brand.vue';
import InputIcon from '../components/TextInputs/InputIcon.vue';
import BasicButton from '../components/Buttons/BasicButton.vue';

export default {
  name: 'Signup',
  components: {
    Brand,
    InputIcon,
    BasicButton,
  },
};
</script>

<style lang="scss" scoped>
.signup-page {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-color: #fff;
  background-image: url("../assets/superdaman.png");
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
  @media (max-width: 1024px) {
    width: 100%;
    height: 100%;
    border-radius: 0;
    justify-content: space-around;
    padding: 5em 2em;
  }
  .signup-form {
    width: 60%;
    @media (max-width: 1024px) {
      width: 80%;
    }
  }
  .auth-link {
    font-size: 16px;
    color: #666666;
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
