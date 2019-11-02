import {
  mount
} from '@vue/test-utils';
import DashCard from '../../../src/components/DashCards.vue';


const wrapper = mount(DashCard);

describe('DashCard.vue', () => {
  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
