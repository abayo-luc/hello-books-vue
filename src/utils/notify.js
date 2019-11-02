import Vue from 'vue';

export default ({
  type,
  title,
  text,
  ...options
}) => Vue.notify({
  group: 'foo',
  type,
  title,
  text,
  ...options,
  closeOnClick: true
});
