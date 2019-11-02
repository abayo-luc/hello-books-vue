import {
  shallowMount
} from '@vue/test-utils';
import LinkedButton from '../../../src/components/Buttons/LinkedButton.vue';

describe('LinkedButton.vue', () => {
  it('should match snapshot', () => {
    const wrapper = shallowMount(LinkedButton, {
      stubs: ['router-link', 'router-view'],
      propsData: {
        title: 'Login',
        type: 'submit',
        to: '/'
      }
    });
    expect(wrapper).toMatchSnapshot();
  });
});
