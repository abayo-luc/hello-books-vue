import {
  isEmpty,
} from 'lodash';

export const checkEmail = () => true;

export const validateAuth = (data) => {
  const errors = {};
  if (isEmpty(data.email)) errors.email = 'Email is required';
  if (isEmpty(data.password)) errors.password = 'Password is required';
  return {
    errors,
    isValid: isEmpty(errors),
  };
};
