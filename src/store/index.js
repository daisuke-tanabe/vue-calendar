import Vuex from 'vuex';
import Vue from 'vue';
import HolidaysDateRepository from '../assets/js/fetchApi';

Vue.use(Vuex);

const today = new Date();

export default new Vuex.Store({
  state: {
    day: today.getDate(),
    holiday: {},
    month: today.getMonth() + 1,
    targetDate: '',
    tasks: [],
    year: today.getFullYear(),
    visibleModal: false,
  },

  mutations: {
    applyTask(state, name) {
      state.tasks = [
        ...state.tasks,
        {
          id: state.tasks.reduce((maxId, task) => Math.max(task.id, maxId), -1) + 1,
          name,
          date: state.targetDate,
        },
      ];
    },
    decrease(state, { unit }) {
      state[unit] -= 1;
    },
    increase(state, { unit }) {
      state[unit] += 1;
    },
    removeTask(state, id) {
      state.tasks = state.tasks.filter((task) => task.id !== id);
    },
    setTasks(state, tasks) {
      state.tasks = tasks;
    },
    updateHoliday(state, { data }) {
      state.holiday = data;
    },
    updateMonth(state, { month }) {
      state.month = month;
    },
    updateYear(state, { year }) {
      state.year = year;
    },
    updateVisibleModal(state, isVisible) {
      state.visibleModal = isVisible;
    },
    updateTargetDate(state, date) {
      state.targetDate = date;
    },
  },

  actions: {
    applyTask({ commit }, name) {
      commit('applyTask', name);
    },
    fetchHoliday({ commit }) {
      HolidaysDateRepository.get().then(({ data }) => {
        commit('updateHoliday', { data });
      });
    },
    nextPage({ commit, state }) {
      if (state.month === 12) {
        commit('updateMonth', { month: 1 });
        commit('increase', { unit: 'year' });
        return;
      }
      commit('increase', { unit: 'month' });
    },
    previousPage({ state, commit }) {
      if (state.month === 1) {
        commit('updateMonth', { month: 12 });
        commit('decrease', { unit: 'year' });
        return;
      }
      commit('decrease', { unit: 'month' });
    },
    removeTask({ commit }, id) {
      commit('removeTask', id);
    },
    resetPage({ commit }) {
      commit('updateMonth', { month: today.getMonth() + 1 });
      commit('updateYear', { year: today.getFullYear() });
    },
    setTasks({ commit }, tasks) {
      commit('setTasks', tasks);
    },
    setTargetDate({ commit }, date) {
      commit('updateTargetDate', date);
    },
    toggleModal({ commit }, isVisible) {
      commit('updateVisibleModal', isVisible);
    },
  },
});
