import {
  shallowMount,
  createLocalVue
} from '@vue/test-utils';
import Vuex from 'vuex';
import TopNav from '../../../src/components/navs/TopNav.vue';

const currentUser = {
  user: {
    profile: {
      email: 'me@example.com'
    }
  }
};
const localVue = createLocalVue();
localVue.use(Vuex);
describe('TopNav.vue', () => {
  let wrapper;
  let getters;
  let store;
  let actions;
  let spyOnToggle;
  let spyOnLogout;
  beforeEach(() => {
    spyOnToggle = jest.spyOn(TopNav.methods, 'toggleDropdown');
    spyOnLogout = jest.spyOn(TopNav.methods, 'signoutUser');
    actions = {
      handleSignOut: jest.fn()
    };
    getters = {
      currentUser: () => currentUser
    };
    store = new Vuex.Store({
      getters,
      actions
    });
    wrapper = shallowMount(TopNav, {
      stubs: ['router-link'],
      localVue,
      store
    });
  });
  describe('component rendering', () => {
    it('should match the snapshot', () => {
      expect(wrapper).toMatchSnapshot();
      expect(wrapper.vm.$data.dropdownVisible).toBeFalsy();
    });
    it('should toggle dropdown visibility', () => {
      const dropdown = wrapper.find('#nav-dropdown');
      dropdown.trigger('click');
      expect(spyOnToggle).toBeCalled();
      expect(wrapper.vm.$data.dropdownVisible).toBeTruthy();
    });

    it('should respond on click logout', () => {
      const logoutBtn = wrapper.find('basic-button-stub');
      logoutBtn.props().onClick();
      expect(spyOnLogout).toBeCalled();
      expect(actions.handleSignOut).toBeCalled();
    });
  });
});
