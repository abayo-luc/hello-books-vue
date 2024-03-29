import {
  shallowMount,
  createLocalVue
} from '@vue/test-utils';
import Vuex from 'vuex';
import Login from '../../../src/views/Login.vue';

const localVue = createLocalVue();
localVue.use(Vuex);
const INITIAL_STATE = {
  email: '',
  password: '',
  errors: '',
  submitting: false
};
describe('Login.vue', () => {
  let actions;
  let store;
  let mutations;
  let state;
  let wrapper;
  let spayOnChange;
  let spyOnSubmit;
  beforeEach(() => {
    spyOnSubmit = jest.spyOn(Login.methods, 'onSubmit');
    spayOnChange = jest.spyOn(Login.methods, 'handleInputChange');
    state = {
      auth: {
        ...INITIAL_STATE
      }
    };
    actions = {
      handleLoginSubmit: jest.fn(),
      handleInputChange: jest.fn(),
      handleClearState: jest.fn()
    };
    store = new Vuex.Store({
      state,
      mutations,
      actions
    });
    wrapper = shallowMount(Login, {
      store,
      localVue,
      stubs: ['router-link']
    });
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render component with initial state', () => {
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
  });
  it('it should clear auth state on destroy', () => {
    wrapper.destroy();
    expect(actions.handleClearState).toBeCalled();
  });
  it('should handle on form submit', () => {
    const form = wrapper.find('#login-form');
    form.trigger('submit');
    expect(spyOnSubmit).toBeCalledTimes(1);
    expect(actions.handleLoginSubmit).toBeCalledTimes(1);
  });
});
