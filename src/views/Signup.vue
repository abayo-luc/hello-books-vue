<template>
  <component :is="layout">
    <div class="auth-form">
      <div class="auth-message content" v-show="auth.success">
        <mailer-message
          title="Account Registered"
          description="
        We've sent account confirmation instructions to the primary
        email address on the account."
        />
      </div>

      <form
        method="post"
        class="signup-form"
        @submit.prevent="handleSignupSubmit()"
        v-show="!auth.success"
        id="signup-form"
      >
        <input-icon
          type="text"
          name="name"
          icon-name="user"
          placeholder="Fullname"
          :value="auth.name"
          :on-change-text="onChange"
        />
        <input-icon
          type="email"
          name="email"
          icon-name="email"
          placeholder="Email"
          :value="auth.email"
          :on-change-text="onChange"
        />
        <input-icon
          type="password"
          name="password"
          icon-name="lock"
          placeholder="Password"
          :value="auth.password"
          :on-change-text="onChange"
        />
        <input-icon
          type="password"
          name="passwordConfirmation"
          icon-name="lock"
          placeholder="Password confirmation"
          :value="auth.passwordConfirmation"
          :on-change-text="onChange"
        />
        <div class="group-btns">
          <basic-button title="Signup" classes="default" :disabled="auth.submitting" />
        </div>
      </form>
      <div class="auth-link center">
        <p>
          Already have an account?
          <router-link to="/login" class="link">Login</router-link>
        </p>
      </div>
    </div>
  </component>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Brand from '../components/Brand.vue';
import InputIcon from '../components/TextInputs/InputIcon.vue';
import BasicButton from '../components/Buttons/BasicButton.vue';
import MailerMessage from '../components/MailerMessage.vue';

export default {
  name: 'Signup',
  components: {
    Brand,
    InputIcon,
    BasicButton,
    MailerMessage
  },
  computed: {
    ...mapState(['auth']),
    layout() {
      return this.$route.meta.layout;
    }
  },
  methods: {
    ...mapActions(['handleSignupSubmit', ' handleClearState']),
    onChange(e) {
      const { value, name } = e.target;
      this.$store.dispatch('handleInputChange', { value, name });
    }
  },
  beforeDestroy() {
    this.$store.dispatch('handleClearState');
  }
};
</script>
