import {
  shallowMount
} from '@vue/test-utils';
import Authors from '../../../src/views/Authors.vue';

describe('Authors.vue', () => {
  it('should match the snapshot', () => {
    const wrapper = shallowMount(Authors, {
      mocks: {
        $route: {
          meta: 'main-layout'
        }
      }
    });
    expect(wrapper).toMatchSnapshot();
  });
});
