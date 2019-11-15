/* eslint-disable no-shadow */
import dotenv from 'dotenv';
import {
  CURRENT_USER_FOUND,
  CURRENT_USER_NOT_FOUND,
  CHECKING_CURRENT_USER,
  REMOVE_CURRENT_USER,
  EDIT_PROFILE_INPUT_CHANGE,
  EDIT_PROFILE_FAILED
} from './constants';
import customFetch from '../../utils/fetch';
import notify from '../../utils/notify';

dotenv.config();
const {
  VUE_APP_TOKEN_STORAGE_KEY
} = process.env;
const INITIAL_STATE = {
  isSubmitting: false,
  profile: {},
  token: localStorage.getItem(VUE_APP_TOKEN_STORAGE_KEY) || ''
};
export const state = {
  ...INITIAL_STATE
};
export const getters = {
  isLoggedIn: state => !!state.token,
  currentUser: state => state.profile
};
export const actions = {
  checkCurrentUser: async ({
    commit,
    state
  }) => {
    if (!state.token || state.isSubmitting) return '';
    commit(CHECKING_CURRENT_USER);
    try {
      const {
        data
      } = await customFetch.get('/users/current');
      return commit(CURRENT_USER_FOUND, data);
    } catch (error) {
      localStorage.clear();
      return commit(CURRENT_USER_NOT_FOUND);
    }
  },
  handleSignOut: async ({
    commit
  }, navigate) => {
    await localStorage.clear();
    await commit(REMOVE_CURRENT_USER);
    navigate();
  },
  handleProfileEditing: ({
    commit
  }, data) => {
    commit(EDIT_PROFILE_INPUT_CHANGE, data);
  },
  saveProfile: async ({
    commit,
    state
  }, toggleEdit) => {
    try {
      const data = {};
      ({
        first_name: data.first_name,
        last_name: data.last_name,
        bio: data.bio,
        address: data.address,
        phone_number: data.phone_number
      } = state.profile);
      const response = await customFetch.put('/profiles/update', data);
      commit(CURRENT_USER_FOUND, response.data);
      notify({
        title: 'Success',
        text: response.message,
        type: 'success'
      });
      toggleEdit();
    } catch (error) {
      const {
        errors,
        message
      } = error;
      if (errors) {
        let message = '';
        await Object.keys(errors).forEach((key) => {
          errors[key].forEach((err) => {
            message += `<p>${key}${err}</p>`;
          });
        });
        notify({
          title: 'Action failed',
          text: message,
          type: 'error'
        });
      }

      commit(EDIT_PROFILE_FAILED, errors || {
        message
      });
    }
  }
};

export const mutations = {
  [CHECKING_CURRENT_USER]: state => Object.assign(state, {
    ...state,
    isSubmitting: true
  }),
  [CURRENT_USER_FOUND]: (state, data) => Object.assign(state, {
    ...INITIAL_STATE,
    profile: {
      ...state.profile,
      ...data
    }
  }),
  [CURRENT_USER_NOT_FOUND]: state => Object.assign(state, {
    ...INITIAL_STATE,
    token: ''
  }),
  [REMOVE_CURRENT_USER]: state => Object.assign(state, {
    ...INITIAL_STATE,
    token: ''
  }),
  [EDIT_PROFILE_INPUT_CHANGE]: (state, data) => {
    state.profile[data.name] = data.value;
  },
  [EDIT_PROFILE_FAILED]: (state, errors) => {
    state.errors = errors;
  }
};
export default {
  state,
  actions,
  getters,
  mutations
};
