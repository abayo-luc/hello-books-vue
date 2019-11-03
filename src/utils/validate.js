/* eslint-disable quotes */
import {
  isEmpty
} from 'lodash';

export const capitalize = value => `${value.charAt(0).toUpperCase()}${value.slice(1)}`;

export const validateAuth = (data = {}, keys = ['email', 'password']) => {
  const errors = {};
  keys.forEach((key) => {
    if (isEmpty(data[key])) {
      errors[key] = `${capitalize(key)} can't be empty`;
    }
  });
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
