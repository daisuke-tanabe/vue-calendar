<template>
  <div ref="schedule" :class="$style.wrapper">
    <div :class="$style.calendar">
      <div
        v-for="(schedule, index) in schedules"
        :key="index"
        :class="[$style.calendar__cell, { [$style['calendar__cell--gray']]: !schedule.current }]"
      >
        <div :class="$style.cell">
          <div v-if="schedule.week" :class="$style.cell__week">{{ schedule.week }}</div>
          <div :class="[$style.cell__number, { [$style['cell__number--active']]: isToday(schedule.day) }]">
            {{ schedule.day }}
          </div>
          <div v-if="schedule.holiday" :class="$style.cell__label">{{ schedule.holiday }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { TweenMax } from 'gsap';

// 1月に最大42日分表示する（最大6週間）
const MAX_DISPLAY_DAYS = 42;

function zeroPadding(num) {
  return `${num}`.padStart(2, '0');
}

function makeSchedule({ year, month, days, current, holiday }) {
  return days.map(day => {
    const date = `${year}-${zeroPadding(month)}-${zeroPadding(day)}`;
    return { day, current, holiday: holiday[date] || '' };
  });
}

export default {
  data() {
    return {
      weeks: ['日', '月', '火', '水', '木', '金', '土'],
    };
  },

  computed: {
    ...mapState({
      year: 'year',
      month: 'month',
      day: 'day',
      holiday: 'holiday',
    }),
    // 今月のスケジュール
    scheduleOfMonth: ({ year, month, holiday }) => {
      const days = [...Array(new Date(year, month, 0).getDate()).keys()].map(index => index + 1);
      return makeSchedule({
        year,
        month,
        days,
        current: true,
        holiday,
      });
    },
    // 先月のはみだしスケジュール
    scheduleOfLastMonth: ({ year, month, holiday }) => {
      const weekOfFirstDay = new Date(year, month - 1, 1).getDay();
      const dayOfLatMonth = new Date(year, month - 1, 0).getDate();
      const days = [...Array(weekOfFirstDay).keys()].map(index => dayOfLatMonth - index).reverse();
      return makeSchedule({
        year,
        month: month - 1,
        days,
        current: false,
        holiday,
      });
    },
    // 翌月のはみだしスケジュール
    scheduleOfNextMonth: ({ year, month, holiday, scheduleOfMonth, scheduleOfLastMonth }) => {
      const firstDay = MAX_DISPLAY_DAYS - scheduleOfMonth.length - scheduleOfLastMonth.length;
      const days = [...Array(firstDay).keys()].map(index => index + 1);
      return makeSchedule({
        year,
        month: month + 1,
        days,
        current: false,
        holiday,
      });
    },
    // 今月、先月、翌月のスケジュールをマージしたもの
    schedules: ({ scheduleOfLastMonth, scheduleOfMonth, scheduleOfNextMonth, weeks }) =>
      [...scheduleOfLastMonth, ...scheduleOfMonth, ...scheduleOfNextMonth].map((schedule, index) => ({
        ...schedule,
        week: index < weeks.length ? weeks[index] : '',
      })),
  },

  watch: {
    month() {
      this.calenderAnimation();
    },
  },

  created() {
    this.fetchHoliday();
  },

  methods: {
    ...mapActions({
      fetchHoliday: 'fetchHoliday',
    }),
    calenderAnimation() {
      requestAnimationFrame(() => {
        TweenMax.fromTo(
          this.$refs.schedule,
          0.3,
          {
            transform: 'translateY(10px)',
          },
          {
            transform: 'translateY(0)',
          },
        );
      });
    },
    isToday(day) {
      return this.day === day;
    },
  },
};
</script>

<style lang="scss" module>
.wrapper {
  overflow: hidden;
  padding: 16px;
}

// calendar
// ------------------------------
.calendar {
  background: #dadce0;
  border: 1px solid #dadce0;
  display: grid;
  gap: 1px;
  grid-template-columns: repeat(7, minmax(40px, 1fr));
  height: 100%;
}

.calendar__cell {
  background-color: #ffffff;

  &--gray {
    background-color: #f3f3f3;
  }
}

// cell
// ------------------------------
.cell {
  color: #333333;
  font-size: 10px;
  padding: 12px;
}

.cell__week {
  margin-bottom: 4px;
  text-align: center;
}

.cell__number {
  font-size: 12px;
  line-height: 1;
  text-align: center;

  &--active {
    color: #f00d4f;
    font-weight: bold;
  }
}

.cell__label {
  background-color: #f9a802;
  border-radius: 3px;
  color: #ffffff;
  font-size: 12px;
  line-height: 1.4;
  margin-top: 8px;
  padding: 4px 8px;
}
</style>
