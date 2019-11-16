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
  let actions;
  let spyOnToggle;
  let spyOnUpload;
  const notify = jest.fn();
  beforeEach(() => {
    spyOnToggle = jest.spyOn(Profile.methods, 'toggleEdit');
    spyOnUpload = jest.spyOn(Profile.methods, 'upload');
    state = {
      user: {
        profile,
        isSubmitting: false
      }
    };
    actions = {
      updateImage: jest.fn()
    };
    store = new Vuex.Store({
      state,
      actions
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
        },
        $notify: notify
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
  it('should respond on file input change', () => {
    global.fetch = jest.fn().mockImplementation(() => ({
      json: () => Promise.resolve({
        url: 'https://example.com/sample.png'
      }),
      status: 200,
      ok: true
    }));
    wrapper.vm.upload([{
      type: 'image'
    }]);
    expect(spyOnUpload).toBeCalled();
  });
  it('should show notification error', () => {
    global.fetch = jest.fn().mockImplementation(() => ({
      json: () => Promise.resolve({
        message: 'Invalid url'
      }),
      status: 400,
      ok: false
    }));
    wrapper.vm.upload([{
      type: 'hello'
    }]);
    // expect(notify).toBeCalled();
  });
});
