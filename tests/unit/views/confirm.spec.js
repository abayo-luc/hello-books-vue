import {
  mount,
  createLocalVue
} from '@vue/test-utils';
import Vuex from 'vuex';
import AccountConfirmation from '../../../src/views/AccountConfirmation.vue';

const localVue = createLocalVue();
localVue.use(Vuex);
describe('AccountConfirmation.Vue', () => {
  let actions;
  let store;
  let state;
  let wrapper;
  beforeEach(() => {
    state = {
      auth: {
        errors: {},
        submitting: false,
        success: false
      }
    };
    actions = {
      handleConfirmation: jest.fn(),
      handleClearState: jest.fn()
    };
    store = new Vuex.Store({
      state,
      actions
    });
    wrapper = mount(AccountConfirmation, {
      store,
      localVue,
      stubs: ['router-link', 'router-view'],
      mocks: {
        $route: {
          query: {}
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
  it('should clear state before destroy', () => {
    wrapper.destroy();
    expect(actions.handleClearState).toBeCalledTimes(1);
  });
});
