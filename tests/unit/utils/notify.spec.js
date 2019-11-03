import Vue from 'vue';
import customNotify from '../../../src/utils/notify';
import clearNotification from '../../../src/utils/clearNotification';

jest.mock('vue', () => ({
  notify: jest.fn()
}));

describe('Notify', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  it('should show popup notification', () => {
    customNotify({
      title: 'Hello'
    });
    expect(Vue.notify).toBeCalled();
  });
  it('should clear popup notification', () => {
    clearNotification();
    expect(Vue.notify).toBeCalled();
  });
});
