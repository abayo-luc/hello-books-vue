import {
  mount,
} from '@vue/test-utils';
import ReadingList from '../../../src/components/ReadingList.vue';

const wrapper = mount(ReadingList);
describe('ReadingList.vue', () => {
  it('should render reading list', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
