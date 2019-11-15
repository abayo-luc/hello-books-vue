import dotenv from 'dotenv';
import {
  CHECKING_CURRENT_USER,
  CURRENT_USER_FOUND,
  CURRENT_USER_NOT_FOUND,
  EDIT_PROFILE_INPUT_CHANGE,
  EDIT_PROFILE_FAILED,
  REMOVE_CURRENT_USER
} from '../../../src/store/modules/constants';
import {
  getters,
  actions,
  mutations
} from '../../../src/store/modules/currentUser';

jest.mock('../../../src/utils/notify', () => jest.fn().mockImplementation(() => true));
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
    it('should handle profile edit input change', () => {
      const payload = {
        name: 'first_name',
        value: 'Luc'
      };
      actions.handleProfileEditing({
        commit,
        state
      }, payload);
      expect(commit.mock.calls).toEqual([
        [EDIT_PROFILE_INPUT_CHANGE, payload]
      ]);
    });
    it('should handle sign out action', async () => {
      const navigate = jest.fn();
      const clearStorage = jest.spyOn(localStorage, 'clear');
      await actions.handleSignOut({
        commit
      }, navigate);
      expect(commit.mock.calls).toEqual([
        [REMOVE_CURRENT_USER]
      ]);
      expect(clearStorage).toBeCalled();
    });
    describe('update profile action', () => {
      it('should catch and notify if update profile failed', async () => {
        const res = {
          message: 'Action failed',
          errors: {
            phone_number: ['is invalid']
          }
        };
        global.fetch = jest.fn().mockImplementation(() => ({
          json: () => Promise.resolve(res),
          status: 400,
          ok: false
        }));
        const callback = jest.fn();
        state.profile = {
          phone_number: '0789277275'
        };
        await actions.saveProfile({
          commit,
          state
        }, callback);
        expect(commit.mock.calls).toEqual([
          [EDIT_PROFILE_FAILED, res.errors]
        ]);
      });

      it('should  unknown error', async () => {
        const res = {
          message: 'Action failed'
        };
        global.fetch = jest.fn().mockImplementation(() => ({
          json: () => Promise.resolve(res),
          status: 400,
          ok: false
        }));
        const callback = jest.fn();
        await actions.saveProfile({
          commit,
          state
        }, callback);
        expect(commit.mock.calls).toEqual([
          [EDIT_PROFILE_FAILED, res]
        ]);
      });

      it('should catch update profile success', async () => {
        const res = {
          ...profile,
          phone_number: '078345678'
        };
        global.fetch = jest.fn().mockImplementation(() => ({
          json: () => Promise.resolve({
            message: 'Success',
            data: res
          }),
          status: 200,
          ok: true
        }));
        const callback = jest.fn();
        await actions.saveProfile({
          commit,
          state
        }, callback);
        expect(callback).toBeCalled();
        expect(commit.mock.calls).toEqual([
          [CURRENT_USER_FOUND, res]
        ]);
      });
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
    it('should respond to edit profile input change', () => {
      mutations[EDIT_PROFILE_INPUT_CHANGE](state, {
        value: 'Luc',
        name: 'first_name'
      });
      expect(state.profile.first_name).toEqual('Luc');
    });

    it('should update mutate according on edit profile failed', () => {
      mutations[EDIT_PROFILE_FAILED](state, {
        message: 'Action failed'
      });
      expect(state.errors).toEqual(expect.objectContaining({
        message: 'Action failed'
      }));
    });
    it('should update state on successfully login', () => {
      mutations[REMOVE_CURRENT_USER](state);
      expect(state.token).toEqual('');
      expect(Object.values(state.profile).length).toBeFalsy();
    });
  });
});
