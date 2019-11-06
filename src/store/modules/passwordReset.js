/* eslint-disable no-shadow */
import Vue from 'vue';
import Vuex from 'vuex';
import {
  HANDLE_PASSWORD_RESET_REQUEST,
  HANDLE_PASSWORD_RESET_REQUEST_FAILED,
  HANDLE_PASSWORD_RESET_REQUEST_SUCCESS
} from './mutationTypes';
import {
  validateAuth
} from '../../utils/validate';
import notify from '../../utils/notify';
import clearNotify from '../../utils/clearNotification';
import fetch from '../../utils/fetch';

Vue.use(Vuex);

const state = {
  isSubmitting: false,
  success: false,
  errors: {}
};
const getters = {
  allState: state => ({
    ...state
  })
};
const actions = {
  handleResetSubmit: async ({
    commit,
    state
  }, email) => {
    if (state.isSubmitting) return '';
    commit(HANDLE_PASSWORD_RESET_REQUEST);
    try {
      const {
        isValid,
        errors
      } = validateAuth({
        email
      }, ['email']);
      if (!isValid) {
        clearNotify();
        return setTimeout(() => {
          notify({
            title: 'Validation',
            text: errors.email,
            type: 'error',
            speed: 500
          });
          commit(HANDLE_PASSWORD_RESET_REQUEST_FAILED, errors);
        }, 510);
      }
      const response = await fetch.post('/users/password', {
        email
      });
      notify({
        title: 'Password reset',
        text: response.message,
        type: 'success'
      });
      return commit(HANDLE_PASSWORD_RESET_REQUEST_SUCCESS);
    } catch (err) {
      const message = err.error === 'Record not found'
        ? 'Email provided is not associated to any user account!' : err.message;
      notify({
        title: 'Password reset',
        text: message,
        type: 'error'
      });
      return commit(HANDLE_PASSWORD_RESET_REQUEST_FAILED, {
        message
      });
    }
  },
  handleUpdateSubmit: async ({
    commit,
    state
  }, data) => {
    try {
      const {
        password,
        passwordConfirmation,
        token
      } = data;
      const {
        isValid,
        errors
      } = validateAuth({
        password,
        passwordConfirmation
      }, ['password', 'passwordConfirmation']);
      if (state.isSubmitting) return '';
      commit(HANDLE_PASSWORD_RESET_REQUEST);
      if (!isValid) {
        clearNotify();
        return setTimeout(() => {
          Object.keys(errors).forEach((key) => {
            notify({
              title: 'Validation',
              text: errors[key],
              type: 'error',
              speed: 500
            });
          });
          return commit(HANDLE_PASSWORD_RESET_REQUEST_FAILED, errors);
        }, 510);
      }
      const {
        message
      } = await fetch.put(`/users/password?token=${token}`, {
        password,
        password_confirmation: passwordConfirmation
      });
      notify({
        title: 'Success',
        text: message,
        type: 'success'
      });
      commit(HANDLE_PASSWORD_RESET_REQUEST_SUCCESS);
      return data.navigate();
    } catch (error) {
      const {
        message,
        errors
      } = error;
      clearNotify();
      return setTimeout(() => {
        notify({
          title: 'Action failed',
          text: errors ? errors[0] : message,
          speed: 510,
          type: 'error'
        });
        commit(HANDLE_PASSWORD_RESET_REQUEST_FAILED, {
          errors,
          message
        });
      }, 510);
    }
  }
};

const mutations = {
  [HANDLE_PASSWORD_RESET_REQUEST]: (state) => {
    state.isSubmitting = true;
    state.errors = {};
  },
  [HANDLE_PASSWORD_RESET_REQUEST_FAILED]: (state, errors = {}) => {
    state.isSubmitting = false;
    state.success = false;
    state.errors = errors;
  },
  [HANDLE_PASSWORD_RESET_REQUEST_SUCCESS]: (state) => {
    state.isSubmitting = false;
    state.success = true;
    state.errors = {};
  }
};


export default {
  state,
  getters,
  actions,
  mutations
};
