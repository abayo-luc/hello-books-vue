import {
  shallowMount
} from '@vue/test-utils';
import BasicButton from '../../../src/components/Buttons/BasicButton.vue';

describe('BasicButton.vue', () => {
  it('should match snapshot', () => {
    const wrapper = shallowMount(BasicButton, {
      propsData: {
        title: 'Login',
        type: 'submit'
      }
    });
    expect(wrapper).toMatchSnapshot();
  });
});
