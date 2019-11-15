/* eslint-disable valid-typeof */
const arrayToObject = data => data.reduce((accumulator, currentValue) => {
  accumulator[currentValue.id] = currentValue;
  return accumulator;
}, {});
const isEmpty = data => data === undefined || data === null
  || (typeof data === 'Object' && !Object.keys(data).length)
  || (typeof data === 'string' && !data.trim().length);

export default {
  arrayToObject,
  isEmpty
};
