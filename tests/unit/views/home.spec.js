import {
  shallowMount,
} from '@vue/test-utils';
import Home from '../../../src/views/Home.vue';


describe('Home Page', () => {
  it('should match the snapshot', async () => {
    const wrapper = await shallowMount(Home, {
      stubs: ['router-link', 'router-view'],
      mocks: {
        $route: {
          meta: 'main-layout',
        },
      },
    });
    expect(wrapper).toMatchSnapshot();
  });
});
