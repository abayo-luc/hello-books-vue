import {
  mount,
  createLocalVue
} from '@vue/test-utils';
import VueRouter from 'vue-router';
import Notification from 'vue-notification';
import Vuex from 'vuex';
import App from '@/App.vue';
import Login from '../../src/views/Login.vue';
import MainLayout from '../../src/components/layouts/MainLayout.vue';
import {
  routes
} from '../../src/router';
import store from '../../src/store';

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueRouter);
localVue.component('main-layout', MainLayout);
localVue.use(Notification);
const router = new VueRouter({
  routes
});
describe('App', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(App, {
      localVue,
      store,
      router
    });
  });
  it('renders a child component via routing', () => {
    expect(wrapper).toMatchSnapshot();
  });
  it('should render a child component via routing', () => {
    wrapper.vm.$router.push('/login');
    expect(wrapper.find(Login).exists()).toBeTruthy();
  });
});
