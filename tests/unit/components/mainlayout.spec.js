import {
  shallowMount
} from '@vue/test-utils';
import MainLayout from '../../../src/components/layouts/MainLayout.vue';

describe('MainLayout.vue', () => {
  it('should match the snapshot', () => {
    const wrapper = shallowMount(MainLayout);
    expect(wrapper).toMatchSnapshot();
  });
});
