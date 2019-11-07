/* eslint-disable consistent-return */
import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';

const lazyLoad = view => () => import(`@/views/${view}.vue`);
Vue.use(VueRouter);
export const routes = [{
  path: '/',
  name: 'home',
  component: lazyLoad('Home'),
  meta: {
    layout: 'main-layout',
    isProtected: true
  }
},
{
  path: '/authors',
  name: 'authors',
  component: lazyLoad('Authors'),
  meta: {
    layout: 'main-layout'
  }
},
{
  path: '/login',
  name: 'login',
  component: lazyLoad('Login')
},
{
  path: '/signup',
  name: 'signup',
  component: lazyLoad('Signup'),
  meta: {
    layout: 'auth-layout'
  }
},
{
  path: '/users/confirmation',
  name: 'instructions',
  component: lazyLoad('AccountConfirmation')
},
{
  path: '/users/password/reset',
  name: 'passwordReset',
  component: lazyLoad('PasswordReset'),
  meta: {
    layout: 'auth-layout'
  }
},
{
  path: '/users/password',
  name: 'passwordUpdate',
  component: lazyLoad('PasswordUpdate'),
  meta: {
    layout: 'auth-layout'
  }
}
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.isProtected)) {
    if (store.getters.isLoggedIn) {
      next();
      return '';
    }
    next('/login');
  }
  if (['/login', '/signup'].includes(to.path) && store.getters.isLoggedIn) {
    next('/');
  }
  next();
});
export default {
  router,
  store
};
