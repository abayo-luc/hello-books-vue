<template>
  <div class="account-confirmation">
    <activity-indicator :styleObject="{width: '60px', height: '60px'}" v-show="auth.submitting" />
    <div class="error" v-show="!auth.submitting">
      <h3>{{auth.errors.errors && auth.errors.errors[0]}} !</h3>
      <p class="auth-link">
        Go to
        <router-link to="/login">Login</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import ActivityIndicator from '../components/ActivityIndicator.vue';

export default {
  components: {
    ActivityIndicator
  },
  name: 'AccountConfirmation',
  computed: mapState(['auth']),
  methods: mapActions(['handleConfirmation']),
  created() {
    const { token } = this.$route.query;
    this.handleConfirmation(token);
  }
};
</script>

<style lang="scss" scoped>
.account-confirmation {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  h3,
  p {
    color: #546b81;
  }
  p.auth-link {
    text-align: center;
    font-size: 13px;
    margin: 15px 0px;
    a {
      all: unset;
      color: rgb(93, 207, 212);
      cursor: pointer;
    }
  }
}
</style>
