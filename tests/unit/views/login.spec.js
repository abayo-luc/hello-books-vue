import {
  shallowMount
} from '@vue/test-utils';
import Login from '../../../src/views/Login.vue';

describe('Login.vue', () => {
  it('should match the snapshot', () => {
    const wrapper = shallowMount(Login);
    expect(wrapper).toMatchSnapshot();
  });
});
