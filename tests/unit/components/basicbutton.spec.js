import {
  shallowMount
} from '@vue/test-utils';
import BasicButton from '../../../src/components/Buttons/BasicButton.vue';

describe('BasicButton.vue', () => {
  let wrapper;
  let getClass;
  const onClick = () => console.warn('hello world');
  beforeEach(() => {
    getClass = jest.spyOn(BasicButton.methods, 'getClass');
    wrapper = shallowMount(BasicButton, {
      propsData: {
        title: 'Login',
        type: 'submit',
        classes: 'default'
      }
    });
  });
  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.props().disabled).toBeFalsy();
  });
  it('should get dynamic class', () => {
    wrapper = shallowMount(BasicButton, {
      propsData: {
        title: 'Login',
        type: 'submit',
        classes: 'default',
        disabled: true,
        onClick
      }
    });
    expect(getClass).toBeCalled();
    expect(wrapper.props().classes).toEqual('default');
    expect(wrapper.props().disabled).toBeTruthy();
  });
});
