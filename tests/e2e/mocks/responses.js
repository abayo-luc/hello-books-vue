import user from '../fixture/user.json';
import books from '../fixture/books.json';

const success = res => ({
  json: () => Promise.resolve(res),
  status: 200,
  ok: true
});
const failed = res => ({
  json: () => Promise.resolve(res),
  status: 400,
  ok: false
});

export const failedAuth = () => ({
  json: () => Promise.resolve({
    message: 'Action failed',
    errors: {
      email: [
        'has already been taken'
      ]
    }
  }),
  status: 400,
  ok: false
});

export const successAuth = () => ({
  json: () => Promise.resolve({
    message: 'User registered successuflly',
    data: {
      id: '49d771a8-ea31-41a9-8b45-13b7c845cc09',
      email: 'jean.luc@gmail.com',
      name: null,
      created_at: '2019-11-18T11:39:46.727Z',
      updated_at: '2019-11-18T11:39:46.727Z'
    }
  }),
  status: 200,
  ok: true
});

export const login = ({
  success: ({
    message: 'Success',
    token: 'qwerty-12345'
  }),
  failed: failed({
    message: 'Login failed',
    errors: ['Invalid email or password']
  })
});

export const resetPassword = ({
  success: success({
    message: 'Password reset instructions was sent successfully'
  }),
  failed: failed({
    error: 'Record not found'
  })
});
export const updatePassword = ({
  success: success({
    message: 'Password update successfully',
    token: 'qwerty-123456'
  }),
  failed: failed({
    message: 'Action canceled',
    errors: ['Invalid or expired token']
  })
});

export const getUser = ({
  success: success(user),
  update: success({
    message: 'Profile updated successfully',
    data: {
      id: 'a7f7367c-9a57-40c2-aa53-4202ebc24db9',
      email: 'jean.abayo@gmail.com',
      created_at: new Date(),
      updated_at: '2019-11-15T17:25:25.612Z',
      role: 'user',
      bio: null,
      phone_number: '0789277275',
      address: 'KG 11 Av',
      avatar: 'https://res.cloudinary.com/dghepsznx/image/upload/v1573838496/hello-book/fhdt70bljialibwrplng.png',
      name: 'Jean Luc Abayo'
    }
  })
});

export const getBooks = ({
  success: success(books)
});
