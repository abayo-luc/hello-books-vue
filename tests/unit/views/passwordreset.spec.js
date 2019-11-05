import {
  shallowMount,
  createLocalVue
} from '@vue/test-utils';
import Vuex from 'vuex';
import PasswordReset from '../../../src/views/PasswordReset.vue';
import AuthLayout from '../../../src/components/layouts/AuthLayout.vue';

const localVue = createLocalVue();
localVue.component('auth-layout', AuthLayout);
localVue.use(Vuex);
const handleResetSubmit = jest.fn();
describe('PasswordReset.vue', () => {
  let wrapper;
  let state;
  let actions;
  let store;
  beforeEach(() => {
    state = {
      passwordReset: {
        isSubmitting: false,
        success: false,
        errors: {}
      }
    };
    actions = {
      handleResetSubmit
    };
    store = new Vuex.Store({
      state,
      actions
    });
    wrapper = shallowMount(PasswordReset, {
      store,
      localVue,
      stubs: ['router-link'],
      mocks: {
        $route: {
          meta: {
            layout: 'auth-layout'
          }
        }
      }

    });
  });
  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.vm.layout).toEqual('auth-layout');
  });
  it('should respond on text in put change', () => {
    const spyOnTexChangeHandler = jest.spyOn(wrapper.vm, 'handleInputChange');
    wrapper.vm.$forceUpdate();
    const input = wrapper.find({
      name: 'email'
    });
    input.props().onChangeText({
      target: {
        value: 'me@example.com',
        name: 'email'
      }
    });
    expect(spyOnTexChangeHandler).toBeCalled();
    expect(wrapper.vm.$data.email).toEqual('me@example.com');
  });
  it('should respond on form submit', () => {
    const resetForm = wrapper.find('#reset-form');
    resetForm.trigger('submit');
    expect(handleResetSubmit).toBeCalledTimes(1);
  });
});
