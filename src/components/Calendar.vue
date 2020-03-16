<template>
  <div class="calendar">
    <div class="calendar__bar">
      <CalendarBar :year="year" :month="month" />
    </div>

    <div class="calendar__schedule">
      <CalendarSchedule :year="year" :month="month" :day="day" :holiday="holiday" />
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import CalendarBar from './CalendarBar.vue';
import CalendarSchedule from './CalendarSchedule.vue';

export default {
  components: {
    CalendarBar,
    CalendarSchedule,
  },

  computed: {
    ...mapState({
      year: 'year',
      month: 'month',
      day: 'day',
      holiday: 'holiday',
    }),
  },

  created() {
    this.browsing();
  },

  methods: {
    ...mapActions({
      browsing: 'browsing',
    }),
  },
};
</script>

<style lang="scss" scoped>
.calendar {
  display: grid;
  grid-template-rows: auto 1fr;
  height: 100vh;
}

.calendar__bar {
  border-bottom: 1px solid #dadce0;
  padding: 12px;
}

.calendar__schedule {
  overflow: hidden;
  padding: 12px;
}
</style>
