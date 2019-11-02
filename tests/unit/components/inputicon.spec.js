import {
  shallowMount
} from '@vue/test-utils';
import InputIcon from '../../../src/components/TextInputs/InputIcon.vue';

const onChangeText = jest.fn();
const propsData = {
  name: 'email',
  type: 'email',
  placeholder: 'Email',
  iconName: 'email',
  value: '',
  onChangeText
};
describe('InputIcon.vue', () => {
  it('should match snapshot', () => {
    const wrapper = shallowMount(InputIcon, {
      propsData
    });
    expect(wrapper).toMatchSnapshot();
  });
  it('should respond on input change', () => {
    const wrapper = shallowMount(InputIcon, {
      propsData
    });
    const input = wrapper.find('input');
    input.element.value = 'me@gmail.com';
    input.trigger('input');
    expect(onChangeText).toBeCalled();
  });
});
