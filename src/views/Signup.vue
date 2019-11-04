<template>
  <div class="signup">
    <component :is="layout">
      <div class="auth-message content" v-show="auth.success">
        <auth-message />
      </div>
      <form
        method="post"
        class="signup-form content"
        @submit.prevent="handleSignupSubmit()"
        v-show="!auth.success"
      >
        <input-icon
          type="text"
          name="name"
          icon-name="user"
          placeholder="Fullname"
          :value="auth.name"
          :on-change-text="handleInputChange"
        />
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
        <input-icon
          type="password"
          name="passwordConfirmation"
          icon-name="lock"
          placeholder="Password confirmation"
          :value="auth.passwordConfirmation"
          :on-change-text="handleInputChange"
        />
        <div class="group-btns">
          <basic-button title="Signup" classes="default" :disabled="auth.submitting" />
        </div>
      </form>
      <div class="auth-link" v-show="!auth.success">
        <p>
          Already have an account?
          <router-link to="/login" class="link">Login</router-link>
        </p>
      </div>
    </component>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Brand from '../components/Brand.vue';
import InputIcon from '../components/TextInputs/InputIcon.vue';
import BasicButton from '../components/Buttons/BasicButton.vue';
import AuthMessage from '../components/AuthMessage.vue';

export default {
  name: 'Signup',
  components: {
    Brand,
    InputIcon,
    BasicButton,
    AuthMessage
  },
  computed: {
    ...mapState(['auth']),
    layout() {
      return this.$route.meta.layout;
    }
  },
  methods: {
    ...mapActions(['handleSignupSubmit', ' handleClearState']),
    handleInputChange(e) {
      const { value, name } = e.target;
      this.$store.dispatch('handleInputChange', { value, name });
    }
  },
  beforeDestroy() {
    this.$store.dispatch('handleClearState');
  }
};
</script>

<style lang="scss" scoped>
.content-container {
  .content {
    width: 60%;
  }
  .auth-message {
    margin: 5rem;
  }
  @media (max-width: 1024px) {
    .signup-form {
      width: 90%;
    }
    .auth-message {
      width: 80%;
      justify-content: center;
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
