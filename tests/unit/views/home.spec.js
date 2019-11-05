import {
  shallowMount,
  createLocalVue
} from '@vue/test-utils';
import Home from '../../../src/views/Home.vue';
import MainLayout from '../../../src/components/layouts/MainLayout.vue';

const localVue = createLocalVue();
localVue.component('main-layout', MainLayout);

describe('Home Page', () => {
  it('should match the snapshot', async () => {
    const wrapper = await shallowMount(Home, {
      localVue,
      stubs: ['router-link', 'router-view'],
      mocks: {
        $route: {
          meta: {
            layout: 'main-layout'
          }
        }
      }
    });
    expect(wrapper).toMatchSnapshot();
  });
});
