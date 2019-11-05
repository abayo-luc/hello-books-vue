import {
  mount,
  createLocalVue
} from '@vue/test-utils';
import Vuex from 'vuex';
import Signup from '../../../src/views/Signup.vue';
import AuthLayout from '../../../src/components/layouts/AuthLayout.vue';

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
  let wrapper;
  // let spayOnChange;
  beforeEach(() => {
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
    // spayOnChange = jest.spyOn(Signup.methods, 'handleInputChange');
    wrapper = mount(AuthLayout, {
      store,
      localVue,
      slots: {
        default: [Signup]
      },
      stubs: ['router-link'],
      mocks: {
        $route: {
          meta: 'auth-layout'
        }
      }
    });
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
  it('it should clear auth state on destroy', () => {
    wrapper.destroy();
    // expect(actions.handleClearState).toBeCalled();
  });
  // it('should mount component with initial state', () => {
  //   const input = wrapper.find({
  //     name: 'email'
  //   });
  //   console.log(input);
  //   // const {
  //   //   onChangeText
  //   // } = input.props();
  //   // const target = {
  //   //   value: 'me@example.com',
  //   //   name: 'email'
  //   // };
  //   // onChangeText({
  //   //   target
  //   // });
  //   // expect(spayOnChange).toBeCalled();
  // });
});
