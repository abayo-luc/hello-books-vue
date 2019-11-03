import {
  shallowMount
} from '@vue/test-utils';
import AuthLayout from '../../../src/components/layouts/AuthLayout.vue';

describe('AuthLayout.vue', () => {
  it('should match snapshot', () => {
    const wrapper = shallowMount(AuthLayout);
    expect(wrapper).toMatchSnapshot();
  });
});
