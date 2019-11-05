import {
  mount,
  createLocalVue
} from '@vue/test-utils';
import VueRouter from 'vue-router';
import SideNav from '../../../src/components/navs/SideNav.vue';
import {
  routes
} from '../../../src/router';

const localVue = createLocalVue();
localVue.use(VueRouter);
const router = new VueRouter({
  routes
});
const wrapper = mount(SideNav, {
  localVue,
  router
});

describe('SideNav.vue', () => {
  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
  it('should container all pages', () => {
    expect(wrapper.vm.$data.pages.length > 2).toBeTruthy();
    expect(wrapper.vm.$data.pages[0].active).toBeTruthy();
  });
  it('should navigate on router link click', () => {
    router.push('/authors');
    const activeRoute = wrapper.vm.$data.pages.find(route => route.path === '/authors');
    expect(wrapper.vm.$data.pages[0].active).toBeFalsy();
    expect(activeRoute.active).toBeTruthy();
  });
});
