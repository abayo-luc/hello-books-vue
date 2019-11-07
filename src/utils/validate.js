/* eslint-disable no-unused-expressions */
/* eslint-disable no-multi-spaces */
/* eslint-disable no-useless-escape */
/* eslint-disable quotes */
import {
  isEmpty
} from 'lodash';

export const capitalize = value => `${value.charAt(0).toUpperCase()}${value.slice(1)}`;
export const checkPwd = ({
  password,
  passwordConfirmation
}) => password.trim() === passwordConfirmation.trim();
export const isEmailValid = (email) => {
  const regx =    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regx.test(email);
};
export const validateAuth = (data, keys = ['email', 'password']) => {
  const errors = {};
  keys.forEach((key) => {
    if (isEmpty(data[key])) {
      errors[key] = `${capitalize(key)} can't be empty`;
    } else {
      switch (key) {
        case 'passwordConfirmation':
          if (!checkPwd(data)) {
            errors[key] = 'Provided passwords does not match';
          }
          break;
        case 'email':
          if (!isEmailValid(data.email)) errors[key] = 'Invalid email';
          break;
        default:
          null;
      }
    }
  });
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
