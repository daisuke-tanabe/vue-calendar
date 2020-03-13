import './assets/scss/reset.scss';
import Vue from 'vue';
import Calendar from './components/Calendar.vue';
import store from './store';

new Vue({
  el: '#js-calendar',
  components: { Calendar },
  store,
  template: '<Calendar />',
});
