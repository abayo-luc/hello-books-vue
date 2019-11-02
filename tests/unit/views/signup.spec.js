import {
  shallowMount
} from '@vue/test-utils';
import Signup from '../../../src/views/Signup.vue';

describe('Signup.vue', () => {
  it('should match the snapshot', () => {
    const wrapper = shallowMount(Signup, {
      stubs: ['router-link']
    });
    expect(wrapper).toMatchSnapshot();
  });
});
