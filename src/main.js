import Vue from 'vue';
import Notifications from 'vue-notification';
import App from './App.vue';
import router from './router';
import store from './store';
import MainLayout from './components/layouts/MainLayout.vue';
import AuthLayout from './components/layouts/AuthLayout.vue';

Vue.config.productionTip = false;
Vue.component('main-layout', MainLayout);
Vue.component('auth-layout', AuthLayout);
Vue.use(Notifications);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
