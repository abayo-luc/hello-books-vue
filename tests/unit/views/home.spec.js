import {
  shallowMount,
  createLocalVue
} from '@vue/test-utils';
import Vuex from 'vuex';
import Home from '../../../src/views/Home.vue';
import MainLayout from '../../../src/components/layouts/MainLayout.vue';

const localVue = createLocalVue();
localVue.component('main-layout', MainLayout);
localVue.use(Vuex);
describe('Home Page', () => {
  let state;
  let actions;
  let getters;
  let mutations;
  let store;
  let wrapper;
  beforeEach(async () => {
    state = {
      books: {
        isLoading: false,
        data: []
      }
    };
    getters = {
      allBooks: () => state.data
    };
    actions = {
      fetchBooks: jest.fn()
    };
    store = new Vuex.Store({
      state,
      actions,
      getters,
      mutations
    });
    wrapper = await shallowMount(Home, {
      localVue,
      store,
      stubs: ['router-link', 'router-view'],
      mocks: {
        $route: {
          meta: {
            layout: 'main-layout'
          }
        }
      }
    });
  });
  it('should match the snapshot', async () => {
    expect(wrapper).toMatchSnapshot();
  });
});
