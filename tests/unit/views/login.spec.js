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
  beforeEach(() => {
    state = {
      auth: {
        ...INITIAL_STATE
      }
    };
    actions = {
      handleLoginSubmit: jest.fn(),
      handleInputChange: jest.fn()
    };
    store = new Vuex.Store({
      state,
      mutations,
      actions
    });
  });
  it('should match the snapshot', () => {
    const wrapper = shallowMount(Login, {
      store,
      localVue
    });
    expect(wrapper).toMatchSnapshot();
  });

  it('should render component with initial state', () => {
    const spayOnChange = jest.spyOn(Login.methods, 'handleInputChange');
    const wrapper = shallowMount(Login, {
      store,
      localVue
    });
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
});
