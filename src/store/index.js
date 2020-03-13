import Vuex from 'vuex';
import Vue from 'vue';
import HolidaysDateRepository from '../assets/js/fetchApi';

Vue.use(Vuex);

const today = new Date();

export default new Vuex.Store({
  state: {
    holiday: {},
    month: today.getMonth() + 1,
    year: today.getFullYear(),
  },

  mutations: {
    decrease(state, { unit }) {
      state[unit] -= 1;
    },
    increase(state, { unit }) {
      state[unit] += 1;
    },
    setHoliday(state, { data }) {
      state.holiday = data;
    },
    setMonth(state, { month }) {
      state.month = month;
    },
    setYear(state, { year }) {
      state.year = year;
    },
  },

  actions: {
    browsing({ commit }) {
      HolidaysDateRepository.get().then(({ data }) => {
        commit('setHoliday', { data });
      });
    },
    nextPage({ commit, state }) {
      if (state.month === 12) {
        commit('setMonth', { month: 1 });
        commit('increase', { unit: 'year' });
        return;
      }
      commit('increase', { unit: 'month' });
    },
    previousPage({ state, commit }) {
      if (state.month === 1) {
        commit('setMonth', { month: 12 });
        commit('decrease', { unit: 'year' });
        return;
      }
      commit('decrease', { unit: 'month' });
    },
    resetPage({ commit }) {
      commit('setMonth', { month: today.getMonth() + 1 });
      commit('setYear', { year: today.getFullYear() });
    },
  },
});
