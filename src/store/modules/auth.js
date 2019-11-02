import Vuex from 'vuex';
import Vue from 'vue';
import {
  validateAuth
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

const tokenName = 'qwer-78';

Vue.use(Vuex);
const INITIAL_STATE = {
  email: '',
  password: '',
  name: '',
  submitting: false,
  errors: {}
};
const state = {
  ...INITIAL_STATE
};
const getters = {
  authData: allState => ({
    ...allState
  })
};
const actions = {
  handleInputChange: ({
    commit
  }, data) => commit(HANDLE_AUTH_INPUT, data),
  async handleSubmit({
    commit
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
      Object.keys(errors).map(key => notify({
        title: 'Validation',
        text: errors[key],
        type: 'error',
        duration: 10000,
        // (optional)
        // Overrides default/provided animation speed
        speed: 1000

      }));
      return commit(HANDLE_AUTH_FAILED);
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
      const error = JSON.parse(err.message) || err.message;
      commit(HANDLE_AUTH_FAILED);
      return notify({
        title: error.message,
        text: error.errors[0],
        type: 'error'
      });
    }
  }
};

const mutations = {
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
  [HANDLE_AUTH_FAILED]: (authState, errors = {}) => {
    authState.errors = errors;
    authState.submitting = false;
  },
  [HANDLE_AUTH_SUCCESS]: (authState) => {
    authState.errors = {};
    authState.submitting = false;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
