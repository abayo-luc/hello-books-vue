import {
  mount
} from '@vue/test-utils';
import ReadingListCard from '../../../src/components/cards/ReadingListCard.vue';

const wrapper = mount(ReadingListCard);

describe('ReadingListCard.vue', () => {
  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
