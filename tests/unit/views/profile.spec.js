import {
  shallowMount,
  createLocalVue
} from '@vue/test-utils';
import Vuex from 'vuex';
import Profile from '../../../src/views/profile.vue';
import MainLayout from '../../../src/components/layouts/MainLayout.vue';

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.component('main-layout', MainLayout);
const profile = {
  email: 'me@example.com',
  role: 'user',
  created_at: new Date()
};
describe('Profile Page', () => {
  let store;
  let state;
  let wrapper;
  let spyOnToggle;
  beforeEach(() => {
    spyOnToggle = jest.spyOn(Profile.methods, 'toggleEdit');
    state = {
      user: {
        profile,
        isSubmitting: false
      }
    };
    store = new Vuex.Store({
      state
    });
    wrapper = shallowMount(Profile, {
      localVue,
      store,
      stubs: ['router-link'],
      mocks: {
        $route: {
          meta: {
            layout: 'main-layout'
          }
        }
      }
    });
  });
  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
  it('should respond set component into editing mode', () => {
    const btn = wrapper.find('#toggle-edit-btn');
    expect(wrapper.vm.$data.editing).toBeFalsy();
    btn.trigger('click');
    expect(spyOnToggle).toBeCalled();
    expect(wrapper.vm.$data.editing).toBeTruthy();
  });
  it('should set it from edit mode into view mode', () => {
    wrapper.setData({
      editing: true
    });
    const btn = wrapper.find('#toggle-edit-btn');
    expect(wrapper.vm.$data.editing).toBeTruthy();
    btn.trigger('click');
    expect(spyOnToggle).toBeCalled();
    expect(wrapper.vm.$data.editing).toBeFalsy();
  });
});
