import {
  shallowMount,
  mount,
  createLocalVue
} from '@vue/test-utils';
import VueRouter from 'vue-router';
import Notification from 'vue-notification';
import App from '@/App.vue';
import Login from '../../src/views/Login.vue';
import MainLayout from '../../src/components/layouts/MainLayout.vue';
import {
  routes
} from '../../src/router';

const localVue = createLocalVue();
localVue.use(VueRouter);
localVue.component('main-layout', MainLayout);
localVue.use(Notification);
describe('App', () => {
  it('renders a child component via routing', () => {
    //     const router = new VueRouter({
    //       routes
    //     });
    //     const wrapper = mount(App, {
    //       localVue,
    //       router
    //     });

    //     router.push('/login');

    //     expect(wrapper.find(Login).exists()).toBe(true);
  });
});
