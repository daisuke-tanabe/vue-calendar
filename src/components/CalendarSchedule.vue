<template>
  <div ref="schedule" :class="$style.schedule">
    <div
      v-for="(schedule, index) in schedules"
      :key="index"
      :class="[$style.cell, { [$style['cell--gray']]: !schedule.current }]"
    >
      <div v-if="schedule.week" :class="$style.cell__head">{{ schedule.week }}</div>
      <div :class="$style.cell__body">
        <div :class="[$style.day, { [$style['day--circle']]: isToday(schedule.day) }]">{{ schedule.day }}</div>
        <div v-if="schedule.holiday" :class="$style.holiday">{{ schedule.holiday }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { TweenMax } from 'gsap';

function zeroPadding(num) {
  return `${num}`.padStart(2, '0');
}

function createSchedule({ year, month, days, current, holiday }) {
  return days.map(day => {
    const date = `${year}-${zeroPadding(month)}-${zeroPadding(day)}`;
    return { day, current, holiday: holiday[date] || '' };
  });
}

export default {
  props: {
    year: {
      type: Number,
      required: true,
    },
    month: {
      type: Number,
      required: true,
    },
    day: {
      type: Number,
      required: true,
    },
    holiday: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      weeks: ['日', '月', '火', '水', '木', '金', '土'],
    };
  },

  computed: {
    // 今月のスケジュール
    scheduleOfMonth: ({ year, month, holiday }) => {
      const days = [...Array(new Date(year, month, 0).getDate()).keys()].map(index => index + 1);
      return createSchedule({
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
      return createSchedule({
        year,
        month: month - 1,
        days,
        current: false,
        holiday,
      });
    },
    // 翌月のはみだしスケジュール
    scheduleOfNextMonth: ({ year, month, holiday, scheduleOfMonth, scheduleOfLastMonth }) => {
      // 初月のはみだし日数(最大6週間あるので最大値は42)
      const firstDay = 42 - scheduleOfMonth.length - scheduleOfLastMonth.length;
      const days = [...Array(firstDay).keys()].map(index => index + 1);
      return createSchedule({
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
        week: index < 7 ? weeks[index] : '',
      })),
  },

  watch: {
    month() {
      this.enter();
    },
  },

  methods: {
    enter() {
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
.schedule {
  background-color: #dadce0;
  border: 1px solid #dadce0;
  display: grid;
  gap: 1px;
  grid-template-columns: repeat(7, minmax(40px, 1fr));
  height: 100%;
}

.cell {
  background-color: #ffffff;
  color: #333333;

  &--gray {
    background-color: #f3f3f3;
  }
}

.cell__head {
  font-size: 10px;
  line-height: 1;
  padding: 12px 12px 4px;
  text-align: center;
}

.cell__body {
  padding: 12px;
}

.day {
  font-size: 12px;
  line-height: 1;
  text-align: center;

  &--circle {
    color: #f00d4f;
    font-weight: bold;
  }
}

.holiday {
  background-color: #ffae02;
  border-radius: 3px;
  color: #ffffff;
  font-size: 12px;
  margin-top: 8px;
  padding: 3px 8px;
}
</style>
