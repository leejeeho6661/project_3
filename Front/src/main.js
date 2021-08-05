import Vue from 'vue';
import Vuex from 'vuex';
import axios from './plugins/axios';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';
import 'url-search-params-polyfill';
import { store } from './store/store';
import VueCryptojs from 'vue-cryptojs';

import VueSession from 'vue-session';
var sessionOptions = {
  persist: true
};

Vue.config.productionTip = false;

var VueCookie = require('vue-cookie');
// Tell Vue to use the plugin
Vue.use(VueCookie);
Vue.use(axios);
Vue.use(Vuex);
Vue.use(VueCryptojs);
Vue.use(VueSession, sessionOptions);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
