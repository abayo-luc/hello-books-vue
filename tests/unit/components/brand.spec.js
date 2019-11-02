import {
  shallowMount
} from '@vue/test-utils';
import Brand from '../../../src/components/Brand.vue';

describe('Brand.vue', () => {
  it('should match snapshot', () => {
    const wrapper = shallowMount(Brand);
    expect(wrapper).toMatchSnapshot();
  });
});
