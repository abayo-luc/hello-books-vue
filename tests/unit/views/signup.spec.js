import {
  shallowMount,
  createLocalVue
} from '@vue/test-utils';
import Vuex from 'vuex';
import Signup from '../../../src/views/Signup.vue';
import AuthLayout from '../../../src/components/layouts/AuthLayout.vue';

const localVue = createLocalVue();
localVue.component('auth-layout', AuthLayout);
localVue.use(Vuex);
const INITIAL_STATE = {
  email: '',
  password: '',
  passwordConfirmation: '',
  name: '',
  submitting: false,
  success: false,
  errors: {}
};
describe('Signup.vue', () => {
  let actions;
  let store;
  let mutations;
  let state;
  let wrapper;
  let spayOnChange;
  beforeEach(() => {
    spayOnChange = jest.spyOn(Signup.methods, 'onChange');
    state = {
      auth: {
        ...INITIAL_STATE
      }
    };
    actions = {
      handleSignupSubmit: jest.fn(),
      handleInputChange: jest.fn(),
      handleClearState: jest.fn()
    };
    store = new Vuex.Store({
      state,
      mutations,
      actions
    });
    wrapper = shallowMount(Signup, {
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
  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });
  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
  it('it should clear auth state on destroy', () => {
    wrapper.destroy();
    expect(actions.handleClearState).toBeCalled();
  });
  it('should respond on change text', () => {
    const input = wrapper.find({
      name: 'email'
    });
    const {
      onChangeText
    } = input.props();
    const target = {
      value: 'me@example.com',
      name: 'email'
    };
    onChangeText({
      target
    });
    expect(spayOnChange).toBeCalled();
    expect(actions.handleInputChange).toBeCalled();
  });
  it('should respond on submit', () => {
    const form = wrapper.find('#signup-form');
    form.trigger('submit');
    expect(actions.handleSignupSubmit).toHaveBeenCalledTimes(1);
  });
});
