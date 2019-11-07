/* eslint-disable no-shadow */
import dotenv from 'dotenv';
import {
  mutations,
  getters,
  actions
} from '../../../src/store/modules/auth';
import {
  HANDLE_AUTH_INPUT,
  HANDLE_AUTH_SUBMIT,
  HANDLE_AUTH_FAILED,
  HANDLE_AUTH_SUCCESS,
  HANDLE_CLEAR_AUTH_STATE
} from '../../../src/store/modules/constants';

dotenv.config();
const {
  VUE_APP_TOKEN_STORAGE_KEY
} = process.env;
jest.mock('../../../src/utils/clearNotification', () => jest.fn().mockImplementation(() => true));
jest.mock('../../../src/utils/notify', () => jest.fn().mockImplementation(() => true));
const INITIAL_STATE = {
  email: '',
  password: '',
  passwordConfirmation: '',
  name: '',
  submitting: false,
  errors: {},
  token: '',
  success: false
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

    it('should respond to HANDLE_CLEAR_AUTH_STATE', () => {
      state.email = 'luc';
      state.submitting = true;
      state.errors = {
        email: 'Invalid email'
      };
      mutations[HANDLE_CLEAR_AUTH_STATE](state);
      expect(state).toEqual(INITIAL_STATE);
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
    it('should get confirmation state', () => {
      state.submitting = true;
      expect(getters.confirmState(state).errors).toEqual({});
      expect(getters.confirmState(state).submitting).toBeTruthy();
      expect(getters.confirmState(state).success).toBeFalsy();
    });
  });

  describe('#actions', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });
    describe('Login', () => {
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
        await actions.handleLoginSubmit({
          commit,
          state
        });
        jest.runOnlyPendingTimers();
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
        await actions.handleLoginSubmit({
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
          password: 'password',
          passwordConfirmation: 'password'
        };
        const navigate = jest.fn();
        await actions.handleLoginSubmit({
          commit,
          state
        }, navigate);
        expect(localStorage.setItem).toBeCalledWith(VUE_APP_TOKEN_STORAGE_KEY,
          'hello-token-123456');
        expect(commit.mock.calls).toEqual([
          ['HANDLE_AUTH_SUBMIT', true],
          ['HANDLE_AUTH_SUCCESS']
        ]);
        expect(navigate).toBeCalled();
      });
      it('should not submit if already submitting', async () => {
        state.submitting = true;
        await actions.handleLoginSubmit({
          commit,
          state
        });
        expect(commit).not.toHaveBeenCalled();
      });
    });
    describe('Account Confirmation', () => {
      let commit;
      let state;
      beforeEach(() => {
        commit = jest.fn();
        state = {
          ...state
        };
      });
      afterEach(() => {
        jest.clearAllMocks();
      });

      it('should respond to confirmation: HANDLE_AUTH_SUCCESS', async () => {
        localStorage.setItem = jest.fn();
        global.fetch = jest.fn().mockImplementation(() => ({
          json: () => Promise.resolve({
            message: 'Account verified successfully',
            token: 'qwerty-123456789'
          }),
          status: 200,
          ok: true
        }));
        const replace = jest.fn();
        await actions.handleConfirmation({
          commit,
          state
        }, 'qwer123', replace);
        expect(commit.mock.calls).toEqual([
          [HANDLE_AUTH_SUBMIT, true],
          [HANDLE_AUTH_SUCCESS]
        ]);
        expect(localStorage.setItem).toBeCalledWith(VUE_APP_TOKEN_STORAGE_KEY,
          'qwerty-123456789');
        expect(replace).toBeCalledWith('/');
      });

      it('should respond to confirmation: HANDLE_AUTH_FAILED', async () => {
        global.fetch = jest.fn().mockImplementation(() => ({
          json: () => Promise.resolve({
            message: 'Account verification failed',
            errors: ['Account already verified']
          }),
          status: 400,
          ok: false
        }));
        const replace = jest.fn();
        await actions.handleConfirmation({
          commit,
          state
        }, 'qwerty123', replace);
        expect(commit.mock.calls).toEqual([
          [HANDLE_AUTH_SUBMIT, true],
          [HANDLE_AUTH_FAILED,
            {
              errors: [
                'Account already verified'
              ],
              message: 'Account verification failed'
            }
          ]
        ]);
        expect(localStorage.setItem).not.toBeCalledWith();
        expect(replace).not.toBeCalledWith();
      });
    });
    describe('Signup', () => {
      let commit;
      let state;
      beforeEach(() => {
        commit = jest.fn();
        state = {
          ...state
        };
        jest.useFakeTimers();
      });
      afterEach(() => {
        jest.clearAllMocks();
        jest.clearAllTimers();
      });
      it('should commit HANDLE_AUTH_FAILED  for empty email or password', async () => {
        await actions.handleSignupSubmit({
          commit,
          state
        });
        expect(setTimeout).toHaveBeenCalledTimes(1);
        jest.runOnlyPendingTimers();
        expect(commit.mock.calls).toEqual([
          ['HANDLE_AUTH_SUBMIT', true],
          [
            'HANDLE_AUTH_FAILED',
            {
              email: "Email can't be empty",
              password: "Password can't be empty",
              passwordConfirmation: "PasswordConfirmation can't be empty"
            }
          ]
        ]);
      });

      it('should commit HANDLE_AUTH_FAILED for already existing email', async () => {
        global.fetch = jest.fn().mockImplementation(() => ({
          json: () => Promise.resolve({
            message: 'Registration failed',
            errors: ['Email already taken']
          }),
          status: 400,
          ok: false
        }));
        state = {
          email: 'me@example.com',
          password: 'password',
          passwordConfirmation: 'password',
          name: 'Me'
        };
        await actions.handleSignupSubmit({
          commit,
          state
        });
        expect(commit.mock.calls).toEqual([
          ['HANDLE_AUTH_SUBMIT', true],
          [
            'HANDLE_AUTH_FAILED',
            {
              message: 'Registration failed',
              errors: ['Email already taken']
            }
          ]
        ]);
      });
      it('should commit HANDLE_AUTH_FAILED for any other reason', async () => {
        global.fetch = jest.fn().mockImplementation(() => ({
          json: () => Promise.resolve({
            message: 'Registration failed'
          }),
          status: 400,
          ok: false
        }));
        state = {
          email: 'me@example.com',
          password: 'password',
          passwordConfirmation: 'password',
          name: 'Me'
        };
        await actions.handleSignupSubmit({
          commit,
          state
        });
        expect(commit.mock.calls).toEqual([
          ['HANDLE_AUTH_SUBMIT', true],
          [
            'HANDLE_AUTH_FAILED',
            {
              message: 'Registration failed'
            }
          ]
        ]);
      });
      it('should commit HANDLE_AUTH_SUCCESS for valid user data', async () => {
        const userInstance = {
          email: 'me@example.com',
          first_name: 'Luc',
          last_name: 'Aba.',
          password: 'password',
          id: '1234567',
          created_at: Date.now().toLocaleString()
        };
        localStorage.setItem = jest.fn();
        global.fetch = jest.fn().mockImplementation(() => ({
          json: () => Promise.resolve({
            message: 'Success',
            data: userInstance
          }),
          status: 200,
          ok: true
        }));
        state = {
          passwordConfirmation: 'password',
          name: 'Luc Ab.',
          email: 'me@example.com',
          password: 'password'
        };
        await actions.handleSignupSubmit({
          commit,
          state
        });
        expect(commit.mock.calls).toEqual([
          ['HANDLE_AUTH_SUBMIT', true],
          ['HANDLE_AUTH_SUCCESS']
        ]);
      });
      it('should should not commit any action if already submitting', () => {
        state.submitting = true;
        actions.handleSignupSubmit({
          commit,
          state
        });
        expect(commit).not.toBeCalled();
      });
      it('should commit HANDLE_CLEAR_AUTH_STATE', () => {
        actions.handleClearState({
          commit
        });
        expect(commit.mock.calls).toEqual([
          [HANDLE_CLEAR_AUTH_STATE]
        ]);
      });
    });
  });
});
