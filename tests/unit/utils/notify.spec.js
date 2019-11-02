import Vue from 'vue';
import customNotify from '../../../src/utils/notify';

jest.mock('vue', () => ({
  notify: jest.fn()
}));

describe('Notify', () => {
  it('should show popup notification', () => {
    customNotify({
      title: 'Hello'
    });
    expect(Vue.notify).toBeCalled();
  });
});
