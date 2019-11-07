import combinedRouterStore from '../../src/router';

const {
  router
} = combinedRouterStore;
describe('Router', () => {
  it('should handle navigation to login', async () => {
    await router.push('/login');
    expect(router.history.current.path).toEqual('/login');
  });
});
