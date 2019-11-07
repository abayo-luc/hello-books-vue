/* eslint-disable consistent-return */
import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Authors from '../views/Authors.vue';
import Login from '../views/Login.vue';
import Signup from '../views/Signup.vue';
import Confirmation from '../views/AccountConfirmation.vue';
import PasswordReset from '../views/PasswordReset.vue';
import PasswordUpdate from '../views/PasswordUpdate.vue';
import store from '../store';

Vue.use(VueRouter);
export const routes = [{
  path: '/',
  name: 'home',
  component: Home,
  meta: {
    layout: 'main-layout',
    isProtected: true
  }
},
{
  path: '/authors',
  name: 'authors',
  component: Authors,
  meta: {
    layout: 'main-layout'
  }
},
{
  path: '/login',
  name: 'login',
  component: Login
},
{
  path: '/signup',
  name: 'signup',
  component: Signup,
  meta: {
    layout: 'auth-layout'
  }
},
{
  path: '/users/confirmation',
  name: 'instructions',
  component: Confirmation
},
{
  path: '/users/password/reset',
  name: 'passwordReset',
  component: PasswordReset,
  meta: {
    layout: 'auth-layout'
  }
},
{
  path: '/users/password',
  name: 'passwordUpdate',
  component: PasswordUpdate,
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
