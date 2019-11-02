import {
  shallowMount
} from '@vue/test-utils';
import SideNav from '../../../src/components/navs/SideNav.vue';

const $route = {
  path: '/'
};
const wrapper = shallowMount(SideNav, {
  mocks: {
    $route
  },
  stubs: ['router-link', 'router-view']
});

describe('SideNav.vue', () => {
  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
