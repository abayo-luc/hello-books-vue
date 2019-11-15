import {
  shallowMount,
  createLocalVue
} from '@vue/test-utils';
import Vuex from 'vuex';
import CKEditor from '@ckeditor/ckeditor5-vue';
import ProfileEdit from '../../../src/components/EditProfile.vue';
import {
  profile
} from '../helpers';

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(CKEditor);
const toggleEdit = jest.fn();
describe('Profile Edit', () => {
  let wrapper;
  let store;
  let actions;
  let spyOnChange;
  beforeEach(() => {
    spyOnChange = jest.spyOn(ProfileEdit.methods, 'onChangeText');
    actions = {
      saveProfile: jest.fn(),
      handleProfileEditing: jest.fn()
    };
    store = new Vuex.Store({
      actions
    });
    wrapper = shallowMount(ProfileEdit, {
      propsData: {
        profile: {
          ...profile
        },
        toggleEdit
      },
      localVue,
      store
    });
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
  it('should respond on text input change', () => {
    const e = {
      target: {
        name: 'first_name',
        value: 'Luc'
      }
    };
    const input = wrapper.find({
      name: 'first_name'
    });
    input.props().onChangeText(e);
    expect(spyOnChange).toBeCalledWith(e);
    expect(actions.handleProfileEditing).toBeCalled();
  });
  it('should respond on bio input change', () => {
    const editor = wrapper.find('ckeditor-stub');
    editor.vm.$emit('input', '<p>Hello <b>world</b></p>');
    expect(spyOnChange).toBeCalledWith('<p>Hello <b>world</b></p>');
    expect(actions.handleProfileEditing).toBeCalled();
  });
  it('should handle on save edit', () => {
    const form = wrapper.find('form');
    form.trigger('submit');
    expect(actions.saveProfile).toBeCalled();
  });
});
