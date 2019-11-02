/* eslint-disable no-shadow */
import {
  mutations,
  getters,
  actions,
  tokenName
} from '../../../src/store/modules/auth';
import {
  HANDLE_AUTH_INPUT,
  HANDLE_AUTH_SUBMIT,
  HANDLE_AUTH_FAILED,
  HANDLE_AUTH_SUCCESS
} from '../../../src/store/modules/mutationTypes';

jest.mock('../../../src/utils/notify', () => jest.fn().mockImplementation(() => true));
const INITIAL_STATE = {
  email: '',
  password: '',
  name: '',
  submitting: false,
  errors: {}
};
describe('Store Auth', () => {
  describe('#mutations', () => {
    let state;
    beforeEach(() => {
      state = {
        ...INITIAL_STATE
      };
    });

    it('should respond to HANDLE_AUTH_INPUT', () => {
      mutations[HANDLE_AUTH_INPUT](state, {
        value: 'me@example.com',
        name: 'email'
      });
      expect(state.email).toEqual('me@example.com');
    });
    it('should respond to HANDLE_AUTH_SUBMIT', () => {
      mutations[HANDLE_AUTH_SUBMIT](state, true);
      expect(state.submitting).toBeTruthy();
    });

    it('should respond to HANDLE_AUTH_FAILED', () => {
      state.submitting = true;
      mutations[HANDLE_AUTH_FAILED](state);
      expect(state.submitting).toBeFalsy();
    });

    it('should respond to HANDLE_AUTH_SUCCESS', () => {
      state.submitting = true;
      mutations[HANDLE_AUTH_SUCCESS](state);
      expect(state.submitting).toBeFalsy();
    });
  });

  describe('#getters', () => {
    let state;
    beforeEach(() => {
      state = {
        email: 'me@example.com',
        password: 'password',
        name: 'Me',
        submitting: false,
        errors: {}
      };
    });
    it('should get all the state', () => {
      expect(getters.authData(state).email).toEqual('me@example.com');
      expect(getters.authData(state).password).toEqual('password');
      expect(getters.authData(state).name).toEqual('Me');
    });
  });

  describe('#actions', () => {
    let commit;
    let state;
    beforeEach(() => {
      state = {
        ...INITIAL_STATE
      };
      commit = jest.fn();
    });
    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should commit HANDLE_AUTH_INPUT mutation', () => {
      const payload = {
        value: 'me@example.com',
        password: 'password'
      };
      actions.handleInputChange({
        commit
      }, payload);
      expect(commit).toBeCalledWith(HANDLE_AUTH_INPUT, payload);
    });

    it('should commit HANDLE_AUTH_FAILED  for empty email or password', async () => {
      await actions.handleSubmit({
        commit,
        state
      });
      expect(commit.mock.calls).toEqual([
        ['HANDLE_AUTH_SUBMIT', true],
        [
          'HANDLE_AUTH_FAILED',
          {
            email: "Email can't be empty",
            password: "Password can't be empty"
          }
        ]
      ]);
    });
    it('should commit HANDLE_AUTH_FAILED for invalid email or password', async () => {
      global.fetch = jest.fn().mockImplementation(() => ({
        json: () => Promise.resolve({
          message: 'Action failed',
          errors: ['Invalid email or password']
        }),
        status: 400,
        ok: false
      }));
      state = {
        email: 'me@example.com',
        password: 'password'
      };
      await actions.handleSubmit({
        commit,
        state
      });
      expect(commit.mock.calls).toEqual([
        ['HANDLE_AUTH_SUBMIT', true],
        [
          'HANDLE_AUTH_FAILED',
          {
            credentials: 'Invalid email or password'
          }
        ]
      ]);
    });
    it('should commit HANDLE_AUTH_SUCCESS valid credentials', async () => {
      localStorage.setItem = jest.fn();
      global.fetch = jest.fn().mockImplementation(() => ({
        json: () => Promise.resolve({
          message: 'Success',
          token: 'hello-token-123456'
        }),
        status: 200,
        ok: true
      }));
      state = {
        ...INITIAL_STATE,
        email: 'me@example.com',
        password: 'password'
      };
      await actions.handleSubmit({
        commit,
        state
      });
      expect(localStorage.setItem).toBeCalledWith(tokenName, 'hello-token-123456');
      expect(commit.mock.calls).toEqual([
        ['HANDLE_AUTH_SUBMIT', true],
        ['HANDLE_AUTH_SUCCESS']
      ]);
    });
    it('should not submit if already submitting', async () => {
      state.submitting = true;
      await actions.handleSubmit({
        commit,
        state
      });
      expect(commit).not.toHaveBeenCalled();
    });
  });
});
