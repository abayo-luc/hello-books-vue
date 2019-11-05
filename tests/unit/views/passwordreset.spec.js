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
      handleResetSubmit: jest.fn()
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
          meta: 'auth-layout'
        }
      }

    });
  });
  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
