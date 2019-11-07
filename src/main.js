import Vue from 'vue';
import Notifications from 'vue-notification';
import VueLazyLoad from 'vue-lazyload';
import App from './App.vue';
import routerStore from '@/router';
import MainLayout from '@/components/layouts/MainLayout.vue';
import AuthLayout from '@/components/layouts/AuthLayout.vue';
import LoadingImg from '@/assets/thumbnail.png';

const {
  router,
  store
} = routerStore;
Vue.config.productionTip = false;
Vue.component('main-layout', MainLayout);
Vue.component('auth-layout', AuthLayout);
Vue.use(Notifications);
Vue.use(VueLazyLoad, {
  observer: true,
  preLoad: 1.3,
  loading: LoadingImg
});
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
