import Vue from 'vue';
import Vuex from 'vuex';
import auth from './modules/auth';
import passwordReset from './modules/passwordReset';
import user from './modules/currentUser';
import books from './modules/books';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    passwordReset,
    user,
    books
  }
});
