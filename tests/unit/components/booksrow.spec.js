import {
  mount,
} from '@vue/test-utils';
import BooksRow from '../../../src/components/BooksRow.vue';

const wrapper = mount(BooksRow, {
  propsData: {
    books: [{
      rating: 8,
      author: 'Chinua Achebe',
      title: 'Things Fall Apart',
      genre: 'Novel',
      url: 'https://via.placeholder.com/600/92c952',
    }],

  },
});

describe('BookCard.vue', () => {
  it('should render book title', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
