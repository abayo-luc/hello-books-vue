import {
  shallowMount
} from '@vue/test-utils';
import InputIcon from '../../../src/components/TextInputs/InputIcon.vue';

describe('InputIcon.vue', () => {
  it('should match snapshot', () => {
    const wrapper = shallowMount(InputIcon, {
      propsData: {
        name: 'email',
        type: 'email',
        placeholder: 'Email',
        iconName: 'email'
      }
    });
    expect(wrapper).toMatchSnapshot();
  });
});
