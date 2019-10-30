import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Authors from '../views/Authors.vue';
import Login from '../views/Login.vue';

Vue.use(VueRouter);

const routes = [{
  path: '/',
  name: 'home',
  component: Home,
  meta: {
    layout: 'main-layout',
  },
},
{
  path: '/authors',
  name: 'authors',
  component: Authors,
  meta: {
    layout: 'main-layout',
  },
},
{
  path: '/login',
  name: 'login',
  component: Login,
},
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
