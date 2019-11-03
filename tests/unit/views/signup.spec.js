import {
  shallowMount,
  createLocalVue
} from '@vue/test-utils';
import Vuex from 'vuex';
import Signup from '../../../src/views/Signup.vue';

const localVue = createLocalVue();
localVue.use(Vuex);
const INITIAL_STATE = {
  email: '',
  password: '',
  errors: '',
  submitting: false
};
describe('Signup.vue', () => {
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
      handleSignupSubmit: jest.fn(),
      handleInputChange: jest.fn()
    };
    store = new Vuex.Store({
      state,
      mutations,
      actions
    });
  });
  it('should match the snapshot', () => {
    const wrapper = shallowMount(Signup, {
      store,
      localVue,
      stubs: ['router-link'],
      mocks: {
        $route: {
          meta: 'auth-layout'
        }
      }
    });
    expect(wrapper).toMatchSnapshot();
  });
});
