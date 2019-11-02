import {
  validateAuth
} from '../../../src/utils/validate';

describe('Validator', () => {
  describe('Authentication input validator', () => {
    it('should error error on empty email', () => {
      const {
        errors,
        isValid
      } = validateAuth({
        email: 'me'
      });
      expect(errors).toEqual(
        expect.objectContaining({
          password: "Password can't be empty"
        })
      );
      expect(isValid).toBeFalsy();
    });
    it('should error error on empty password', () => {
      const {
        errors,
        isValid
      } = validateAuth({
        password: 'hello'
      });
      expect(errors).toEqual(
        expect.objectContaining({
          email: "Email can't be empty"
        })
      );
      expect(isValid).toBeFalsy();
    });
    it('should return isValid true', () => {
      const {
        isValid
      } = validateAuth({
        email: 'me@example.com',
        password: 'p12345'
      });
      expect(isValid).toBeTruthy();
    });
  });
});
