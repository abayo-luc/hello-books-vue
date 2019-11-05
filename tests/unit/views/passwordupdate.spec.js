import {
  shallowMount,
  createLocalVue
} from '@vue/test-utils';
import Vuex from 'vuex';
import PasswordUpdate from '../../../src/views/PasswordUpdate.vue';
import AuthLayout from '../../../src/components/layouts/AuthLayout.vue';

const localVue = createLocalVue();
localVue.component('auth-layout', AuthLayout);
localVue.use(Vuex);
describe('PasswordUpdate.vue', () => {
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
      handleUpdateSubmit: jest.fn()
    };
    store = new Vuex.Store({
      state,
      actions
    });
    wrapper = shallowMount(PasswordUpdate, {
      store,
      localVue,
      stubs: ['router-link'],
      mocks: {
        $route: {
          meta: {
            layout: 'auth-layout'
          },
          query: {
            token: 'qwerty-123456789'
          }
        }
      }

    });
  });
  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.vm.layout).toEqual('auth-layout');
  });
  it('should respond on text on input change', () => {
    const spyOnTexChangeHandler = jest.spyOn(wrapper.vm, 'handleInputChange');
    wrapper.vm.$forceUpdate();
    const input = wrapper.find({
      name: 'password'
    });
    input.props().onChangeText({
      target: {
        value: 'password',
        name: 'password'
      }
    });
    expect(spyOnTexChangeHandler).toBeCalled();
    expect(wrapper.vm.$data.password).toEqual('password');
  });
  it('should respond on form submit', () => {
    const resetForm = wrapper.find('#update-password-form');
    resetForm.trigger('submit');
    expect(actions.handleUpdateSubmit).toBeCalledTimes(1);
  });
});
