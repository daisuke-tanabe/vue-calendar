import './assets/scss/reset.scss';
import Vue from 'vue';
import Home from './components/pages/Home.vue';
import store from './store';

new Vue({
  el: '#js-app',
  components: { Home },
  store,
  template: '<Home />',
});
