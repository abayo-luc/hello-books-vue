/* eslint-disable no-shadow */
import Vuex from 'vuex';
import Vue from 'vue';
import {
  validateAuth,
  capitalize
} from '../../utils/validate';
import fetch from '../../utils/fetch';
import {
  HANDLE_AUTH_INPUT,
  HANDLE_AUTH_SUBMIT,
  HANDLE_AUTH_FAILED,
  HANDLE_AUTH_SUCCESS
} from './mutationTypes';
import router from '../../router';
import notify from '../../utils/notify';
import clearNotification from '../../utils/clearNotification';

export const tokenName = 'qwer-78';

Vue.use(Vuex);
const INITIAL_STATE = {
  email: '',
  password: '',
  passwordConfirmation: '',
  name: '',
  submitting: false,
  success: false,
  errors: {}
};
const state = {
  ...INITIAL_STATE
};
export const getters = {
  authData: allState => ({
    ...allState
  }),
  confirmState: allState => ({
    submitting: allState.submitting,
    errors: allState.errors,
    success: allState.success
  })
};
export const actions = {
  handleInputChange: ({
    commit
  }, data) => commit(HANDLE_AUTH_INPUT, data),
  async handleLoginSubmit({
    commit,
    state
  }) {
    const {
      email,
      password,
      submitting
    } = state;
    if (submitting) return '';
    commit(HANDLE_AUTH_SUBMIT, true);
    const {
      errors,
      isValid
    } = validateAuth({
      email,
      password
    });
    if (!isValid) {
      clearNotification();
      setTimeout(() => Object.keys(errors).map(key => notify({
        title: 'Validation',
        text: errors[key],
        type: 'error',
        speed: 500
      })), 510);
      return commit(HANDLE_AUTH_FAILED, errors);
    }
    try {
      const {
        token
      } = await fetch.post('/users/login', {
        email,
        password
      });
      await localStorage.setItem(tokenName, token);
      commit(HANDLE_AUTH_SUCCESS);
      return router.push('/');
    } catch (err) {
      commit(HANDLE_AUTH_FAILED, {
        credentials: err.errors[0]
      });
      return notify({
        title: err.message,
        text: err.errors && err.errors[0],
        type: 'error',
        speed: 500
      });
    }
  },
  handleSignupSubmit: async ({
    commit,
    state
  }) => {
    if (state.submitting) return '';
    commit(HANDLE_AUTH_SUBMIT, true);
    const {
      errors,
      isValid
    } = validateAuth(state, ['passwordConfirmation', 'password', 'email']);
    if (!isValid) {
      clearNotification();
      setTimeout(() => Object.keys(errors).forEach(key => notify({
        type: 'error',
        title: 'Validation',
        text: errors[key],
        speed: 500
      })), 510);
      return commit(HANDLE_AUTH_FAILED, errors);
    }
    try {
      const user = {
        first_name: state.name,
        email: state.email,
        password: state.password
      };
      const {
        data
      } = await fetch.post('/users', user);
      await localStorage.setItem('user', JSON.stringify(data));
      return commit(HANDLE_AUTH_SUCCESS);
    } catch (error) {
      const {
        errors = {},
        message
      } = error;
      if (Object.keys(errors)) {
        Object.keys(errors).forEach(key => notify({
          title: message,
          text: `${capitalize(key)} ${errors[key][0]}`,
          type: 'error'
        }));
      } else {
        notify({
          title: error.message,
          type: 'error'
        });
      }
      return commit(HANDLE_AUTH_FAILED, error.errors);
    }
  },
  handleConfirmation: async ({
    commit
  }, confirmationToken) => {
    commit(HANDLE_AUTH_SUBMIT, true);
    try {
      const {
        token
      } = await fetch.put(`/users/confirmation?token=${confirmationToken}`);
      await localStorage.setItem(tokenName, token);
      commit(HANDLE_AUTH_SUCCESS);
      return router.replace('/');
    } catch (error) {
      const {
        errors,
        message
      } = error;
      commit(HANDLE_AUTH_FAILED, error);
      return notify({
        title: message,
        text: errors[0],
        type: 'warn'
      });
    }
  }
};

export const mutations = {
  [HANDLE_AUTH_INPUT]: (authState, {
    value,
    name
  }) => {
    authState[name] = value;
    authState.errors = {};
    authState.submitting = false;
  },
  [HANDLE_AUTH_SUBMIT]: (authState, value) => {
    authState.submitting = value;
  },
  [HANDLE_AUTH_FAILED]: (state, errors = {}) => {
    state.errors = errors;
    state.submitting = false;
    state.success = false;
  },
  [HANDLE_AUTH_SUCCESS]: (authState) => {
    authState.errors = {};
    authState.submitting = false;
    authState.success = true;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
