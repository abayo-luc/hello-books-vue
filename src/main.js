import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import MainLayout from './components/layouts/MainLayout.vue';

Vue.config.productionTip = false;
Vue.component('main-layout', MainLayout);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
