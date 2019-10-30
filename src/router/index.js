import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Authors from '../views/Authors.vue';

Vue.use(VueRouter);

const routes = [{
  path: '/',
  name: 'home',
  component: Home,
},
{
  path: '/authors',
  name: 'authors',
  component: Authors,
},
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
