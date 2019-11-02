import fetch from '../../../src/utils/fetch';


describe('fetch', () => {
  describe('#POST', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should respond to POST method with 200', async () => {
      global.fetch = jest.fn().mockImplementation(() => ({
        json: () => Promise.resolve({
          token: 'hello-token-123456'
        }),
        status: 200,
        ok: true
      }));
      const res = await fetch.post('/user/login', {
        email: 'me@example.com',
        password: 'password'
      });
      expect(res.token).toEqual('hello-token-123456');
    });

    it('should respond to POST method with 201', async () => {
      global.fetch = jest.fn().mockImplementation(() => ({
        json: () => Promise.resolve({
          email: 'me@example.com',
          password: 'password'
        }),
        status: 201,
        ok: true
      }));
      const res = await fetch.post('/user/login', {
        email: 'me@example.com',
        password: 'password'
      });
      expect(res.email).toEqual('me@example.com');
      expect(res.password).toEqual('password');
    });

    it('should throw an error on failed post request', async () => {
      global.fetch = jest.fn().mockImplementation(() => ({
        json: () => Promise.resolve({
          errors: ['Invalid email or password']
        }),
        status: 400,
        ok: false
      }));
      try {
        await fetch.post('/user/login', {
          email: 'me@example.com',
          password: 'password'
        });
      } catch (error) {
        expect(error.errors[0]).toEqual('Invalid email or password');
      }
    });
  });

  describe('#GET', () => {
    it('should respond to GET request', async () => {
      global.fetch = jest.fn().mockImplementation(() => ({
        json: () => Promise.resolve({
          message: 'Success',
          books: []
        }),
        status: 200,
        ok: true
      }));
      const res = await fetch.get('/books');
      expect(res).toEqual(expect.objectContaining({
        message: 'Success',
        books: []
      }));
    });
  });
});
