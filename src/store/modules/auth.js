/* eslint-disable no-shadow */
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

export const tokenName = 'qwer-78';

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
export const getters = {
  authData: allState => ({
    ...allState
  })
};
export const actions = {
  handleInputChange: ({
    commit
  }, data) => commit(HANDLE_AUTH_INPUT, data),
  async handleSubmit({
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
      Object.keys(errors).map(key => notify({
        title: 'Validation',
        text: errors[key],
        type: 'error',
        duration: 10000,
        speed: 1000

      }));
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
        type: 'error'
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
