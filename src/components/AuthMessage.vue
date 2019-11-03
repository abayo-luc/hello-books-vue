<template>
  <div class="singup-success">
    <h2 class="title">Account Registered</h2>
    <p class="description">
      <!-- If we found an account associated with that username, -->
      We've sent account confirmation instructions to the primary
      email address on the account.
    </p>
    <div class="auth-link">
      <p class="description">
        Already have an account?
        <router-link to="/login">Login</router-link>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AuthMessage'
};
</script>

<style lang="scss" scoped>
.singup-success {
  h2.title {
    margin-bottom: 18px;
    font-size: 20px;
    line-height: 30px;
    letter-spacing: -0.5px;
    font-weight: 600;
    color: #294661;
  }
  p.description {
    color: #546b81;
    text-align: left;
    font-size: 13px;
    line-height: 20px;
  }
  a {
    text-decoration: none;
    color: rgba(93, 207, 212, 0.5);
  }
  .auth-link {
    margin-top: 5rem;
    p {
      font-size: 16px;
    }
  }
}
</style>
