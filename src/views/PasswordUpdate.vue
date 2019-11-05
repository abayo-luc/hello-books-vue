<template>
  <component :is="layout">
    <div class="auth-form">
      <form action="post" @submit.prevent="onSubmit" id="update-password-form">
        <input-icon
          name="password"
          type="password"
          placeholder="password"
          icon-name="lock"
          :value="password"
          :on-change-text="handleInputChange"
        />
        <input-icon
          name="passwordConfirmation"
          type="password"
          placeholder="Password confirmation"
          icon-name="lock"
          :value="passwordConfirmation"
          :on-change-text="handleInputChange"
        />
        <basic-button title="Subimt" class="default" :disabled="passwordReset.isSubmitting" />
      </form>
      <div class="auth-link">
        <p>
          Go to login:
          <router-link to="/login" class="link">Login</router-link>
        </p>
      </div>
    </div>
  </component>
</template>

<script>
import { mapState } from 'vuex';
import InputIcon from '../components/TextInputs/InputIcon.vue';
import BasicButton from '../components/Buttons/BasicButton.vue';

export default {
  name: 'PasswordUpdate',
  components: {
    InputIcon,
    BasicButton
  },
  data() {
    return {
      password: '',
      passwordConfirmation: ''
    };
  },
  computed: {
    ...mapState(['passwordReset']),
    layout() {
      return this.$route.meta.layout;
    }
  },
  methods: {
    handleInputChange(e) {
      const { name, value } = e.target;
      this[name] = value;
    },
    onSubmit() {
      const { token } = this.$route.query;
      this.$store.dispatch('handleUpdateSubmit', {
        password: this.password,
        passwordConfirmation: this.passwordConfirmation,
        token
      });
    }
  }
};
</script>
