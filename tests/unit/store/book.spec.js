import {
  getters,
  mutations,
  actions
} from '../../../src/store/modules/books';
import {
  HANDLE_PAGINATION,
  FETCHING_ALL_BOOKS,
  FETCHING_ALL_BOOKS_SUCCESS,
  HANDLE_PAGINATION_ENDED,
  FETCHING_ALL_BOOKS_FAILED
} from '../../../src/store/modules/constants';

jest.mock('../../../src/utils/notify', () => jest.fn().mockImplementation(() => true));
const book = {
  title: 'Hello world',
  page: 23,
  id: '123'
};
const INITIAL_STATE = {
  isLoading: false,
  errors: {},
  data: {},
  page: 1,
  ended: false
};
const state = {
  ...INITIAL_STATE
};

describe('Books Module', () => {
  describe('#getters', () => {
    it('should return books array', () => {
      state.data = {
        123: book
      };
      expect(getters.allBooks(state)[0].title).toEqual('Hello world');
    });
    it('should return false if not loading more books', () => {
      expect(getters.isLoadingMoreBook(state)).toBeFalsy();
    });
  });
  describe('#actions', () => {
    let commit;
    let dispatch;
    beforeEach(() => {
      commit = jest.fn();
      dispatch = jest.fn();
    });
    afterEach(() => {
      jest.clearAllMocks();
    });
    it('should commit HANDLE_PAGINATION and dispatch fetchBooks', () => {
      actions.handleBookPagination({
        dispatch,
        commit,
        state
      });
      expect(commit.mock.calls).toEqual([
        [HANDLE_PAGINATION]
      ]);
      expect(dispatch).toBeCalledWith('fetchBooks');
    });
    it('should not commit HANDLE_PAGINATION if is loading', () => {
      state.isLoading = true;
      actions.handleBookPagination({
        dispatch,
        commit,
        state
      });
      expect(commit).not.toBeCalled();
      expect(dispatch).not.toBeCalled();
    });
    it('should not commit FETCHING_ALL_BOOKS if is loading', () => {
      state.isLoading = true;
      actions.fetchBooks({
        dispatch,
        state
      });
      expect(commit).not.toBeCalled();
    });
    it('should commit FETCHING_ALL_BOOKS', async () => {
      state.isLoading = false;
      global.fetch = jest.fn().mockImplementation(() => ({
        json: () => Promise.resolve({
          message: 'Success',
          data: [book]
        }),
        status: 200,
        ok: true
      }));
      await actions.fetchBooks({
        commit,
        state
      });
      expect(commit.mock.calls).toEqual([
        ['FETCHING_ALL_BOOKS'],
        ['FETCHING_ALL_BOOKS_SUCCESS', {
          123: book
        }]
      ]);
    });
    it('should commit FETCHING_ALL_BOOKS and mark pagination end', async () => {
      state.isLoading = false;
      global.fetch = jest.fn().mockImplementation(() => ({
        json: () => Promise.resolve({
          message: 'Success',
          data: []
        }),
        status: 200,
        ok: true
      }));
      await actions.fetchBooks({
        commit,
        state
      });
      expect(commit.mock.calls).toEqual([
        ['FETCHING_ALL_BOOKS'],
        ['HANDLE_PAGINATION_ENDED']
      ]);
    });
    it('should commit FETCHING_ALL_BOOKS_FAILED', async () => {
      state.isLoading = false;
      global.fetch = jest.fn().mockImplementation(() => ({
        json: () => Promise.resolve({
          message: 'Invalid token'
        }),
        status: 400,
        ok: false
      }));
      await actions.fetchBooks({
        commit,
        state
      });
      expect(commit.mock.calls).toEqual([
        ['FETCHING_ALL_BOOKS'],
        ['FETCHING_ALL_BOOKS_FAILED', {
          message: 'Invalid token'
        }]
      ]);
    });

    it('should commit FETCHING_ALL_BOOKS_FAILED', async () => {
      state.isLoading = false;
      const response = {
        message: 'Query failed',
        errors: ['Invalid limit']
      };
      global.fetch = jest.fn().mockImplementation(() => ({
        json: () => Promise.resolve(response),
        status: 400,
        ok: false
      }));
      await actions.fetchBooks({
        commit,
        state
      });
      expect(commit.mock.calls).toEqual([
        ['FETCHING_ALL_BOOKS'],
        ['FETCHING_ALL_BOOKS_FAILED', response]
      ]);
    });
  });

  describe('#mutations', () => {
    it('should mutate state to isLoading', () => {
      mutations[FETCHING_ALL_BOOKS](state);
      expect(state.isLoading).toBeTruthy();
    });
    it('should mutate state with data', () => {
      mutations[FETCHING_ALL_BOOKS_SUCCESS](state, {
        123: book
      });
      expect(state.data).toEqual(expect.objectContaining({
        123: book
      }));
      expect(state.isLoading).toBeFalsy();
    });
    it('should change page number', () => {
      mutations[HANDLE_PAGINATION](state);
      expect(state.page).toEqual(2);
    });
    it('should mark the end of pagination', () => {
      state.isLoading = true;
      mutations[HANDLE_PAGINATION_ENDED](state);
      expect(state.isLoading).toBeFalsy();
      expect(state.ended).toBeTruthy();
    });
    it('should mutate state with some error', () => {
      state.isLoading = true;
      state.errors = {};
      const error = {
        message: 'Invalid page number'
      };
      mutations[FETCHING_ALL_BOOKS_FAILED](state, error);
      expect(state.isLoading).toBeFalsy();
      expect(state.errors).toEqual(expect.objectContaining(error));
    });
  });
});
