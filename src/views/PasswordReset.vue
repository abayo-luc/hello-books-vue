<template>
  <component :is="layout">
    <div class="auth-form">
      <div class="mailer-message" v-show="passwordReset.success">
        <mailer-message
          title="Reset Password"
          description="
        If we found an account associated with that email,
        we've sent password reset instructions to that email address."
        />
      </div>
      <div class="action-details" v-show="!passwordReset.success">
        <h2 class="form-title">Reset Password</h2>
        <p class="info">
          To reset your password, please provide
          your HelloBook account email.
        </p>
      </div>
      <form
        action="post"
        @submit.prevent="onSubmit"
        v-show="!passwordReset.success"
        id="reset-form"
      >
        <input-icon
          name="email"
          type="email"
          placeholder="Email"
          icon-name="email"
          :value="email"
          :on-change-text="handleInputChange"
        />
        <basic-button
          title="Send Reset Instructions"
          type="submit"
          class="default"
          :disabled="passwordReset.isSubmitting"
        />
      </form>
      <div class="auth-link">
        <p>
          Don't have a HelloBook account?
          <router-link to="/signup" class="link">Sign up now!</router-link>
        </p>
      </div>
    </div>
  </component>
</template>

<script>
import { mapState } from 'vuex';
import InputIcon from '../components/TextInputs/InputIcon.vue';
import BasicButton from '../components/Buttons/BasicButton.vue';
import MailerMessage from '../components/MailerMessage.vue';

const DEFAULT_LAYOUT = 'auth-layout';
export default {
  name: 'PasswordReset',
  data() {
    return {
      email: ''
    };
  },
  components: {
    InputIcon,
    BasicButton,
    MailerMessage
  },
  computed: {
    ...mapState(['passwordReset']),
    layout() {
      return this.$route.meta.layout || DEFAULT_LAYOUT;
    }
  },
  methods: {
    handleInputChange(e) {
      this.email = e.target.value;
    },
    onSubmit() {
      this.$store.dispatch('handleResetSubmit', this.email);
    }
  }
};
</script>
