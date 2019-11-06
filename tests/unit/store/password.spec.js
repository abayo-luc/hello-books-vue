import {
  HANDLE_PASSWORD_RESET_REQUEST,
  HANDLE_PASSWORD_RESET_REQUEST_FAILED,
  HANDLE_PASSWORD_RESET_REQUEST_SUCCESS
} from '../../../src/store/modules/constants';
import passwordModule from '../../../src/store/modules/passwordReset';

jest.mock('../../../src/utils/clearNotification', () => jest.fn().mockImplementation(() => true));
jest.mock('../../../src/utils/notify', () => jest.fn().mockImplementation(() => true));
jest.useFakeTimers();
const {
  state,
  actions,
  mutations,
  getters
} = passwordModule;
const INITIAL_STATE = {
  isSubmitting: false,
  success: false,
  errors: {}
};
describe('Password Vuex Module', () => {
  describe('#Getters', () => {
    it('should get all state', () => {
      expect(getters.allState(state)).toEqual(INITIAL_STATE);
    });
  });
  describe('#Actions', () => {
    describe('Password Reset', () => {
      let commit;
      beforeEach(() => {
        commit = jest.fn();
      });
      afterEach(() => {
        jest.clearAllMocks();
        jest.clearAllTimers();
      });
      it('should respond with errors on INVALID EMAIL', async () => {
        await actions.handleResetSubmit({
          commit,
          state
        }, 'luc');
        expect(setTimeout).toHaveBeenCalledTimes(1);
        jest.runOnlyPendingTimers();
        expect(commit.mock.calls).toEqual([
          [HANDLE_PASSWORD_RESET_REQUEST],
          [HANDLE_PASSWORD_RESET_REQUEST_FAILED, {
            email: 'Invalid email'
          }]
        ]);
      });
      it('should respond with error on EMAIL NOT PROVIDED', () => {
        actions.handleResetSubmit({
          commit,
          state
        });
        expect(setTimeout).toHaveBeenCalledTimes(1);
        jest.runOnlyPendingTimers();
        expect(commit.mock.calls).toEqual([
          [HANDLE_PASSWORD_RESET_REQUEST],
          [HANDLE_PASSWORD_RESET_REQUEST_FAILED, {
            email: "Email can't be empty"
          }]
        ]);
      });
      it('should respond with error non existing email', async () => {
        global.fetch = jest.fn().mockImplementation(() => ({
          json: () => Promise.resolve({
            message: 'Action failed',
            errors: ['Record not found']
          }),
          status: 401,
          ok: false
        }));
        await actions.handleResetSubmit({
          commit,
          state
        }, 'me@example.com');
        expect(setTimeout).toBeCalledTimes(0);
        jest.runOnlyPendingTimers();
        expect(commit.mock.calls).toEqual([
          [HANDLE_PASSWORD_RESET_REQUEST],
          [HANDLE_PASSWORD_RESET_REQUEST_FAILED, {
            message: 'Action failed'
          }]
        ]);
      });
      it('should respond with success response', async () => {
        global.fetch = jest.fn().mockImplementation(() => ({
          json: () => Promise.resolve({
            message: 'Password reset instruction successfully sent'
          }),
          status: 200,
          ok: true
        }));
        await actions.handleResetSubmit({
          commit,
          state
        }, 'me@example.com');
        expect(setTimeout).toBeCalledTimes(0);
        jest.runOnlyPendingTimers();
        expect(commit.mock.calls).toEqual([
          [HANDLE_PASSWORD_RESET_REQUEST],
          [HANDLE_PASSWORD_RESET_REQUEST_SUCCESS]
        ]);
      });
      it('should do nothing if isSubmitting true', () => {
        actions.handleResetSubmit({
          commit,
          state: {
            ...state,
            isSubmitting: true
          }
        });
        expect(commit).not.toBeCalled();
      });
    });
    describe('Password Update', () => {
      let commit;
      beforeEach(() => {
        commit = jest.fn();
      });
      afterEach(() => {
        jest.clearAllMocks();
        jest.clearAllTimers();
      });
      it('should respond with errors on INVALID PASSWORD', async () => {
        await actions.handleUpdateSubmit({
          commit,
          state
        }, {
          password: 'hello',
          passwordConfirmation: 'qwerty'
        });
        expect(setTimeout).toHaveBeenCalledTimes(1);
        jest.runOnlyPendingTimers();
        expect(commit.mock.calls).toEqual([
          [HANDLE_PASSWORD_RESET_REQUEST],
          [HANDLE_PASSWORD_RESET_REQUEST_FAILED, {
            passwordConfirmation: 'Provided passwords does not match'
          }]
        ]);
      });

      it('should respond with error non existing email', async () => {
        global.fetch = jest.fn().mockImplementation(() => ({
          json: () => Promise.resolve({
            message: 'Action failed',
            errors: ['Invalid or expired token']
          }),
          status: 400,
          ok: false
        }));
        await actions.handleUpdateSubmit({
          commit,
          state
        }, {
          password: 'password',
          passwordConfirmation: 'password',
          token: 'qwerty-12345678'
        });
        expect(setTimeout).toBeCalledTimes(1);
        jest.runOnlyPendingTimers();
        expect(commit.mock.calls).toEqual([
          [HANDLE_PASSWORD_RESET_REQUEST],
          [HANDLE_PASSWORD_RESET_REQUEST_FAILED, {
            message: 'Action failed',
            errors: ['Invalid or expired token']
          }]
        ]);
      });
      it('should respond with success response', async () => {
        const navigate = jest.fn();
        global.fetch = jest.fn().mockImplementation(() => ({
          json: () => Promise.resolve({
            message: 'Password updated success'
          }),
          status: 200,
          ok: true
        }));
        await actions.handleUpdateSubmit({
          commit,
          state
        }, {
          password: 'password',
          passwordConfirmation: 'password',
          token: 'qwerty-12345678',
          navigate
        });
        expect(setTimeout).toBeCalledTimes(0);
        jest.runOnlyPendingTimers();
        expect(commit.mock.calls).toEqual([
          [HANDLE_PASSWORD_RESET_REQUEST],
          [HANDLE_PASSWORD_RESET_REQUEST_SUCCESS]
        ]);
        expect(navigate).toBeCalled();
      });

      it('should do nothing if isSubmitting true', () => {
        actions.handleUpdateSubmit({
          commit,
          state: {
            ...state,
            isSubmitting: true
          }
        }, {
          password: 'password',
          passwordConfirmation: 'password',
          token: 'qwerty-12345678'
        });
        expect(commit).not.toBeCalled();
      });
    });
  });
  describe('#mutations', () => {
    it('should mark isSubmitting true', () => {
      mutations[HANDLE_PASSWORD_RESET_REQUEST](state);
      expect(state.isSubmitting).toBeTruthy();
    });
    it('should update state with some errors', () => {
      mutations[HANDLE_PASSWORD_RESET_REQUEST_FAILED](state, {
        message: 'Invalid or expired link'
      });
      expect(state.errors).toEqual(expect.objectContaining({
        message: 'Invalid or expired link'
      }));
      expect(state.isSubmitting).toBeFalsy();
    });
    it('should update state on success', () => {
      mutations[HANDLE_PASSWORD_RESET_REQUEST_SUCCESS](state);
      expect(state.isSubmitting).toBeFalsy();
      expect(state.success).toBeTruthy();
      expect(Object.keys(state.errors).length).toBe(0);
    });
  });
});
