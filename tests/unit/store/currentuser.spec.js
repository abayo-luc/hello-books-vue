import dotenv from 'dotenv';
import {
  CHECKING_CURRENT_USER,
  CURRENT_USER_FOUND,
  CURRENT_USER_NOT_FOUND
} from '../../../src/store/modules/constants';
import {
  getters,
  actions,
  mutations
} from '../../../src/store/modules/currentUser';

dotenv.config();
const {
  VUE_APP_TOKEN_STORAGE_KEY
} = process.env;
const profile = {
  email: 'me@example.com',
  role: 'user',
  created_at: new Date()
};
const INITIAL_STATE = {
  isSubmitting: false,
  profile: {},
  token: localStorage.getItem(VUE_APP_TOKEN_STORAGE_KEY) || ''
};
describe('Current User Module', () => {
  describe('#getters', () => {
    let state;
    beforeEach(() => {
      state = {
        ...INITIAL_STATE
      };
    });
    it('should check if isLoggedIn', () => {
      state.token = '';
      expect(getters.isLoggedIn(state)).toBeFalsy();
    });
    it('should return true if token exist', () => {
      state.token = 'QWERTY-1234567890';
      expect(getters.isLoggedIn(state)).toBeTruthy();
    });
    it('should return current user profile', () => {
      state.profile = profile;
      expect(getters.currentUser(state)).toEqual(expect.objectContaining(profile));
    });
  });
  describe('#mutations', () => {
    let state;
    let commit;
    beforeEach(() => {
      state = {
        ...INITIAL_STATE
      };
      commit = jest.fn();
    });
    afterEach(() => {
      jest.clearAllMocks();
    });
    it('should commit CURRENT_USER_FOUND', async () => {
      state.token = 'qwerty-1234567890';
      global.fetch = jest.fn().mockImplementation(() => ({
        json: () => Promise.resolve({
          message: 'Success',
          data: profile
        }),
        status: 200,
        ok: true
      }));
      await actions.checkCurrentUser({
        commit,
        state
      });
      expect(commit.mock.calls).toEqual([
        [CHECKING_CURRENT_USER],
        [CURRENT_USER_FOUND, profile]
      ]);
    });
    it('should not fetch if no token', () => {
      state.token = '';
      actions.checkCurrentUser({
        commit,
        state
      });
      expect(commit).not.toBeCalled();
    });

    it('should commit CURRENT_USER_NOT_FOUND', async () => {
      state.token = 'qwerty-1234567890';
      const clearLocalStorage = jest.spyOn(localStorage, 'clear');
      global.fetch = jest.fn().mockImplementation(() => ({
        json: () => Promise.resolve({
          message: 'Current user not found'
        }),
        status: 401,
        ok: false
      }));
      await actions.checkCurrentUser({
        commit,
        state
      });
      expect(commit.mock.calls).toEqual([
        [CHECKING_CURRENT_USER],
        [CURRENT_USER_NOT_FOUND]
      ]);
      expect(clearLocalStorage).toBeCalledTimes(1);
    });
  });
  describe('#mutations', () => {
    let state;
    beforeEach(() => {
      state = {
        ...INITIAL_STATE
      };
    });
    it('should update state with isSubmitting', () => {
      mutations[CHECKING_CURRENT_USER](state);
      expect(state.isSubmitting).toBeTruthy();
    });
    it('should update state with profile info', () => {
      mutations[CURRENT_USER_FOUND](state, profile);
      expect(state.isSubmitting).toBeFalsy();
      expect(state.profile).toEqual(profile);
    });
    it('should update reset state on user not found', () => {
      state = {
        profile,
        isSubmitting: true,
        token: 'qwerty-1234567890'
      };
      mutations[CURRENT_USER_NOT_FOUND](state);
      expect(state).toEqual({
        ...INITIAL_STATE,
        token: ''
      });
    });
  });
});
