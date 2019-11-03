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
  beforeEach(() => {
    state = {
      auth: {
        errors: {},
        submitting: false,
        success: false
      }
    };
    actions = {
      handleConfirmation: jest.fn()
    };
    store = new Vuex.Store({
      state,
      actions
    });
  });
  it('should match the snapshot', () => {
    const wrapper = mount(AccountConfirmation, {
      store,
      localVue,
      stubs: ['router-link', 'router-view'],
      mocks: {
        $route: {
          query: {}
        }
      }
    });
    expect(wrapper).toMatchSnapshot();
  });
});
