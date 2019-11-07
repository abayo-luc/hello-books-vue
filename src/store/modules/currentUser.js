/* eslint-disable no-shadow */
import dotenv from 'dotenv';
import {
  CURRENT_USER_FOUND,
  CURRENT_USER_NOT_FOUND,
  CHECKING_CURRENT_USER
} from './constants';
import customFetch from '../../utils/fetch';
import getUsername from '../../utils/getUsername';

dotenv.config();
const {
  VUE_APP_TOKEN_STORAGE_KEY
} = process.env;
const INITIAL_STATE = {
  isSubmitting: false,
  profile: null,
  token: localStorage.getItem(VUE_APP_TOKEN_STORAGE_KEY) || ''
};
export const state = {
  ...INITIAL_STATE
};
export const getters = {
  isLoggedIn: state => !!state.token,
  currentUser: state => getUsername(state.profile)
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
  }
};

export const mutations = {
  [CHECKING_CURRENT_USER]: state => Object.assign(state, {
    ...state,
    isSubmitting: true
  }),
  [CURRENT_USER_FOUND]: (state, data) => Object.assign(state, {
    ...INITIAL_STATE,
    profile: data
  }),
  [CURRENT_USER_NOT_FOUND]: state => Object.assign(state, {
    ...INITIAL_STATE,
    token: ''
  })
};
export default {
  state,
  actions,
  getters,
  mutations
};
