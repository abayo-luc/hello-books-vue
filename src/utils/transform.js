/* eslint-disable valid-typeof */
const getUsername = (user) => {
  if (!user) {
    return {};
  }
  const name = user.first_name || user.last_name || user.email.split('@')[0];
  return {
    ...user,
    name
  };
};

const arrayToObject = data => data.reduce((accumulator, currentValue) => {
  accumulator[currentValue.id] = currentValue;
  return accumulator;
}, {});
const isEmpty = data => data === undefined || data === null
  || (typeof data === 'Object' && !Object.keys(data).length)
  || (typeof data === 'string' && !data.trim().length);

export default {
  getUsername,
  arrayToObject,
  isEmpty
};
