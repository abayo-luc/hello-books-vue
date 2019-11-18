<template>
  <div class="login-page">
    <div class="container row">
      <div class="left-container">
        <div class="left-content">
          <brand />
        </div>
      </div>
      <div class="right-container">
        <div class="container">
          <div class="right-content">
            <div class="only-sm">
              <brand />
            </div>
            <div class="form-header">
              <h3 class="main-title">
                Welcome to
                <span>HelloBooks</span>
              </h3>
              <p class="slogan">
                We make it easy for everyone to find what interst them to read!
              </p>
            </div>
            <form method="post" class="login-form" @submit.prevent="onSubmit" id="login-form">
              <input-icon
                type="email"
                name="email"
                icon-name="email"
                placeholder="Email"
                :value="auth.email"
                :on-change-text="handleInputChange"
              />
              <input-icon
                type="password"
                name="password"
                icon-name="lock"
                placeholder="Password"
                :value="auth.password"
                :on-change-text="handleInputChange"
              />
              <div class="extra-det row">
                <div class="labeled-checkbox">
                  <input type="checkbox" name="remember" />
                  <span>Remember me</span>
                </div>
                <div class="link">
                  <router-link :to="forgetPath" class="auth-link" id="forget-password"
                    >Forgot password?</router-link
                  >
                </div>
              </div>
              <div class="group-buttons">
                <div class="col-45">
                  <basic-button
                    type="submit"
                    title="Login"
                    classes="default"
                    :disabled="auth.submitting"
                  />
                </div>
                <div class="col-45">
                  <linked-button title="Signup" classes="basic" to="/signup" />
                </div>
              </div>
            </form>
            <div class="social-links">
              <div v-for="(link, index) in links" :key="index" class="link">
                <a :href="link.to">{{ link.name }}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import InputIcon from '../components/TextInputs/InputIcon.vue';
import BasicButton from '../components/Buttons/BasicButton.vue';
import Brand from '../components/Brand.vue';
import LinkedButton from '../components/Buttons/LinkedButton.vue';

export default {
  name: 'Login',
  components: {
    InputIcon,
    BasicButton,
    Brand,
    LinkedButton
  },
  data() {
    return {
      links: [
        {
          name: 'Facebook',
          to: '#'
        },
        {
          name: 'Twitter',
          to: '#'
        },
        {
          name: 'Linkden',
          to: '#'
        },
        {
          name: 'about',
          to: '#'
        }
      ],
      forgetPath: '/users/password/reset'
    };
  },
  computed: {
    ...mapState(['auth'])
  },
  methods: {
    ...mapActions(['handleLoginSubmit', 'handleClearState']),
    handleInputChange(e) {
      const { value, name } = e.target;
      this.$store.dispatch('handleInputChange', { value, name });
    },
    onSubmit() {
      const navigate = () => this.$router.go('/');
      this.handleLoginSubmit(navigate);
    }
  },
  beforeDestroy() {
    this.$store.dispatch('handleClearState');
  }
};
</script>

<style lang="scss" scoped>
.login-page {
  height: 100vh;
  width: 100vw;
  overflow: scroll;
}
.container {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}
.left-container {
  background-color: #fff;
  background-image: url('../assets/spiderman.png');
  background-size: cover;
  background-repeat: no-repeat;
  height: 100%;
  width: 50%;
  background-color: #000;
  @media (max-width: 1024px) {
    display: none;
  }
}
.left-content {
  background-color: rgba(250, 250, 250, 0.3);
  height: 100%;
  width: 100%;
  padding: 15px;
}
.only-sm {
  display: none;
  @media (max-width: 1024px) {
    display: block;
  }
}
.right-container {
  width: 50%;
  height: 100%;
  -webkit-box-shadow: -10px 0px 10px 1px rgba(0, 0, 0, 0.08);
  -moz-box-shadow: -10px 0px 10px 1px rgba(0, 0, 0, 0.08);
  box-shadow: -10px 0px 10px 1px rgba(0, 0, 0, 0.08);
  overflow: scroll;
  .container {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
  @media (max-width: 320px) {
    width: 100%;
    .right-content {
      width: 90%;
    }
  }
  @media (min-width: 320px) and (max-width: 767px) {
    background: url('../assets/spiderman.png');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    width: 100%;
    .container {
      background-color: rgba(250, 250, 250, 0.8);
    }
    .right-content {
      width: 80%;
    }
  }
  @media (min-width: 768px) and (max-width: 1024px) {
    width: 100%;
    .right-content {
      width: 60%;
    }
  }
}
.right-content {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: 80%;
  padding: 1rem 0px 15px 0px;
  @media (max-width: 1024px) {
    padding: 0;
  }
}
.form-header {
  margin-bottom: 25px;
  h3.main-title {
    font-size: 20px;
    font-weight: 200;
    margin: 15px 0px;
    letter-spacing: 3px;
    span {
      color: rgb(93, 207, 212);
    }
  }
  p.slogan {
    font-size: 13px;
    color: #546b81;
    width: 70%;
    letter-spacing: 1px;
    @media (max-width: 320px) {
      width: 90%;
    }
  }
  &::after {
    content: ' ';
    display: block;
    width: 30%;
    margin-top: 5%;
    border-bottom: 1.5px solid rgb(93, 207, 212);
  }
}
.extra-det {
  display: flex;
  justify-content: space-between;
  margin: 15px 5px;
  font-size: 12px;
  color: #546b81;
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
    color: #546b81;
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
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  a {
    text-decoration: none;
    text-transform: capitalize;
    color: #546b81;
    &:hover {
      font-style: italic;
    }
  }
  div.errors {
    font-size: 11px;
    margin: 0;
    padding: 0;
    justify-self: flex-start;
    align-self: flex-start;
    p {
      text-align: left;
      float: left;
    }
  }
}
</style>
