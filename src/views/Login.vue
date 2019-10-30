<template>
  <div class="login-page">
    <div class="container row">
      <div class="left-container">
        <h1>HelloBooks</h1>
      </div>
      <div class="right-container">
        <div class="right-content">
          <div class="form-header">
            <h3 class="main-title">
              Welcome to
              <span>HelloBooks</span>
            </h3>
            <p class="slogan">We make it easy for everyone to find what interst them to read!</p>
          </div>
          <form action method="post" class="login-form">
            <input-icon type="email" name="email" iconName="email" placeholder="Email" />
            <input-icon type="password" name="password" iconName="lock" placeholder="Password" />
            <div class="extra-det row">
              <div class="labeled-checkbox">
                <input type="checkbox" name="remember" />
                <span>Remember me</span>
              </div>
              <div class="link">
                <a href="#" class="auth-link">Forgot password?</a>
              </div>
            </div>
            <div class="group-buttons">
              <div class="col-45">
                <basic-button type="submit" title="Login" classes="default" />
              </div>
              <div class="col-45">
                <basic-button type="submit" title="Signup" classes="basic" />
              </div>
            </div>
          </form>
          <!-- <div class="social-link">
            <a href="#">Facebook</a>
            <a href="#">Twitter</a>
            <a href="#">Linkden</a>
            <a href="#">About</a>
          </div>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import InputIcon from '../components/TextInputs/InputIcon.vue';
import BasicButton from '../components/Buttons/BasicButton.vue';

export default {
  name: 'login',
  components: {
    InputIcon,
    BasicButton,
  },
};
</script>

<style lang="scss" scoped>
.container {
  margin: 0;
  padding: 0;
  width: 100%;
}

.login-page {
  display: flex;
  justify-content: space-between;
  flex-direction: row;
}
.left-container {
  background-color: #fff;
  background-image: url("../assets/superdaman.png");
  background-size: cover;
  background-repeat: no-repeat;
  height: 100vh;
  width: 50%;
}
.right-container {
  width: 50%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  -webkit-box-shadow: -10px 0px 10px 1px rgba(0, 0, 0, 0.08);
  -moz-box-shadow: -10px 0px 10px 1px rgba(0, 0, 0, 0.08);
  box-shadow: -10px 0px 10px 1px rgba(0, 0, 0, 0.08);
}

.form-header {
  margin-bottom: 25px;
  h3.main-title {
    font-size: 20px;
    font-weight: 200;
    margin: 25px 0px;
    letter-spacing: 3px;
    span {
      color: rgb(93, 207, 212);
    }
  }
  p.slogan {
    font-size: 13px;
    color: #999;
    width: 70%;
    letter-spacing: 1px;
  }
  &::after {
    content: " ";
    display: block;
    width: 30%;
    margin-top: 3rem;
    border-bottom: 1.5px solid rgb(93, 207, 212);
  }
}

.login-form {
  margin-top: 4rem;
}

.extra-det {
  display: flex;
  justify-content: space-between;
  margin: 15px 5px;
  font-size: 12px;
  color: #999;
  align-items: center;
  .labeled-checkbox {
    display: flex;
    align-items: center;
    span {
      margin-left: 5px;
    }
  }

  a.auth-link {
    text-decoration: none;
    color: #999;
    &:hover {
      font-style: italic;
    }
  }
}
.group-buttons {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 25px 0px;
}
.social-links {
  align-self: flex-end;
  bottom: 0;
}
</style>
