/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */
import Vue from 'vue';

// Devise requires a bus, vue-router and vuex. We initialize these in your application
// so that both apps can share the same store and router. All devise vuex
// is namespaced under the "devise" namespace.
import { sync } from 'vuex-router-sync';

// Devise
import Devise from './main';

// Vuex, Router, Bus
import EventBus from './event-bus'
import router from './router/route-boilerplate-app.config'
import store from './vuex/store-boilerplate-app'

Vue.config.productionTip = false;

require('./bootstrap');

window.bus = EventBus;
sync(store, router);
Vue.use(Devise, {
  store,
  router,
  bus: window.bus,
  options: {
    adminClass: '',
  },
});

// eslint-disable-next-line no-unused-vars
const app = new Vue({
  el: '#app',
  router,
  mounted () {
    this.appLoaded();
  },
  methods: {
    appLoaded () {
      window.bus.$on('devise-loaded', () => { });
    },
  },
});
