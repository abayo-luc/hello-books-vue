/* eslint-disable no-shadow */
import {
  FETCHING_ALL_BOOKS,
  FETCHING_ALL_BOOKS_SUCCESS,
  FETCHING_ALL_BOOKS_FAILED
} from './constants';
import lFetch from '../../utils/fetch';
import notify from '../../utils/notify';

export const state = {
  isLoading: false,
  errors: {},
  data: []
};
export const getters = {
  allBooks: state => state.data
};
export const actions = {
  fetchBooks: async ({
    commit,
    state
  }) => {
    if (state.isLoading) return '';
    commit(FETCHING_ALL_BOOKS);
    try {
      const {
        data
      } = await lFetch.get('/books?limit=50');
      return commit(FETCHING_ALL_BOOKS_SUCCESS, data);
    } catch (error) {
      notify({
        title: 'Error while fetching',
        text: error.errors ? error.errors[0] : error.message,
        type: 'error'
      });
      return commit(FETCHING_ALL_BOOKS_FAILED, error);
    }
  }
};
export const mutations = {
  FETCHING_ALL_BOOKS: (state) => {
    state.isLoading = true;
  },
  FETCHING_ALL_BOOKS_SUCCESS: (state, data) => {
    Object.assign(state, {
      ...state,
      isLoading: false,
      data: [...new Set([...data, state.data])]
    });
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
