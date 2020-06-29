import './assets/scss/reset.scss';
import Vue from 'vue';
import Home from './components/pages/Home.vue';
import store from './store';

const app = new Vue({
  components: { Home },
  store,
  template: '<Home />',
});

app.$mount('.js-app');
