/* eslint-disable quotes */
import {
  isEmpty
} from 'lodash';

export const checkEmail = () => true;

export const validateAuth = (data = {}) => {
  const errors = {};
  if (isEmpty(data.email)) errors.email = `Email can't be empty`;
  if (isEmpty(data.password)) errors.password = `Password can't be empty`;
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
