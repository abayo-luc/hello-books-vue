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
      const error = JSON.parse(err.message);
      return commit(HANDLE_AUTH_FAILED, {
        backError: error.errors[0]
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
  [HANDLE_AUTH_FAILED]: (authState, errors) => {
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
