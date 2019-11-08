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
  let spyOnScroll;
  beforeEach(async () => {
    spyOnScroll = jest.spyOn(Home.methods, 'handleScroll');
    state = {
      books: {
        isLoading: false,
        data: []
      }
    };
    getters = {
      allBooks: () => state.data,
      isLoadingMoreBook: () => false
    };
    actions = {
      fetchBooks: jest.fn(),
      handleBookPagination: jest.fn()
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
      attachToDocument: true,
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
    expect(wrapper).toMatchSnapshot();
  });
  it('should list to on scroll event', () => {
    window.dispatchEvent(new CustomEvent('scroll'));
    expect(spyOnScroll).toHaveBeenCalled();
    expect(actions.handleBookPagination).not.toHaveBeenCalled();
  });
  it('should dispatch handle book pagination', () => {
    window.innerHeight = 0;
    window.dispatchEvent(new CustomEvent('scroll'));
    expect(spyOnScroll).toBeCalled();
    expect(actions.handleBookPagination).toBeCalled();
  });
});
