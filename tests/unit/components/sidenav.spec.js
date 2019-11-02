import {
  mount
} from '@vue/test-utils';
import SideNav from '../../../src/components/navs/SideNav.vue';

const $route = {
  path: '/'
};
const wrapper = mount(SideNav, {
  mocks: {
    $route
  },
  stubs: ['router-link', 'router-view']
});

describe('SideNav.vue', () => {
  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
  it('should container all pages', () => {
    expect(wrapper.vm.$data.pages.length > 2).toBeTruthy();
    expect(wrapper.vm.$data.pages[0].active).toBeTruthy();
  });
});
