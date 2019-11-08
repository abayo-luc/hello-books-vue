/* eslint-disable no-shadow */
import {
  FETCHING_ALL_BOOKS,
  FETCHING_ALL_BOOKS_SUCCESS,
  FETCHING_ALL_BOOKS_FAILED,
  HANDLE_PAGINATION,
  HANDLE_PAGINATION_ENDED
} from './constants';
import lFetch from '../../utils/fetch';
import notify from '../../utils/notify';
import transform from '../../utils/transform';

export const state = {
  isLoading: false,
  errors: {},
  data: {},
  page: 1,
  ended: false
};
export const getters = {
  allBooks: state => Object.values(state.data),
  isLoadingMoreBook: state => state.isLoading
    && !transform.isEmpty(state.data)
    && !state.ended
};
export const actions = {
  handleBookPagination: ({
    dispatch,
    commit,
    state
  }) => {
    if (state.isLoading) return '';
    commit(HANDLE_PAGINATION);
    return dispatch('fetchBooks');
  },
  fetchBooks: async ({
    commit,
    state
  }) => {
    if (state.isLoading) return '';
    commit(FETCHING_ALL_BOOKS);
    try {
      const {
        data
      } = await lFetch.get(`/books?limit=30&page=${state.page}`);
      if (!data.length) {
        return commit(HANDLE_PAGINATION_ENDED);
      }
      const books = transform.arrayToObject(data);
      return commit(FETCHING_ALL_BOOKS_SUCCESS, books);
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
    state.isLoading = false;
    state.data = {
      ...state.data,
      ...data
    };
  },
  FETCHING_ALL_BOOKS_FAILED: (state, error) => {
    state.isLoading = false;
    state.errors = error;
  },
  HANDLE_PAGINATION: (state) => {
    state.page += 1;
  },
  HANDLE_PAGINATION_ENDED: (state) => {
    state.isLoading = false;
    state.ended = true;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
