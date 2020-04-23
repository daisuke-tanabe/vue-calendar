<template>
  <div ref="schedule" :class="$style.wrapper">
    <div :class="$style.calendar">
      <div
        v-for="(schedule, index) in schedules"
        :key="index"
        :class="[$style.calendar__cell, { [$style['calendar__cell--gray']]: !schedule.current }]"
      >
        <div :class="$style.cell" @click.self="showModal(schedule.date)">
          <div v-if="schedule.week" :class="$style.cell__week">{{ schedule.week }}</div>
          <div :class="[$style.cell__number, { [$style['cell__number--active']]: isToday(schedule.day) }]">
            {{ schedule.day }}
          </div>
          <div :class="$style.cell__task">
            <div v-for="task in schedule.tasks" :key="task.id" :class="$style.cell__taskItem">
              <div :class="$style.cell__taskItemName">{{ task.name }}</div>
              <div :class="$style.cell__taskItemRemoveButton" @click="removeTask(task.id)">×</div>
            </div>
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

function makeSchedule({ year, month, days, current, holiday, tasks }) {
  return days.map(day => {
    const date = `${year}-${zeroPadding(month)}-${zeroPadding(day)}`;
    const filteredByDateTask = tasks.filter(task => task.date === date);
    return { day, current, date, holiday: holiday[date] || '', tasks: filteredByDateTask };
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
      tasks: 'tasks',
    }),
    // 今月のスケジュール
    scheduleOfMonth: ({ year, month, holiday, tasks }) => {
      const days = [...Array(new Date(year, month, 0).getDate()).keys()].map(index => index + 1);
      return makeSchedule({
        year,
        month,
        days,
        tasks,
        current: true,
        holiday,
      });
    },
    // 先月のはみだしスケジュール
    scheduleOfLastMonth: ({ year, month, holiday, tasks }) => {
      const weekOfFirstDay = new Date(year, month - 1, 1).getDay();
      const dayOfLatMonth = new Date(year, month - 1, 0).getDate();
      const days = [...Array(weekOfFirstDay).keys()].map(index => dayOfLatMonth - index).reverse();
      return makeSchedule({
        year,
        month: month - 1,
        days,
        tasks,
        current: false,
        holiday,
      });
    },
    // 翌月のはみだしスケジュール
    scheduleOfNextMonth: ({ year, month, holiday, tasks, scheduleOfMonth, scheduleOfLastMonth }) => {
      const firstDay = MAX_DISPLAY_DAYS - scheduleOfMonth.length - scheduleOfLastMonth.length;
      const days = [...Array(firstDay).keys()].map(index => index + 1);
      return makeSchedule({
        year,
        month: month + 1,
        days,
        tasks,
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
      toggleModal: 'toggleModal',
      removeTask: 'removeTask',
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
    showModal(date) {
      this.toggleModal({ date, isVisible: true });
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
  height: 100%;
  padding: 12px;
}

.cell__week {
  font-size: 10px;
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

.cell__task {
  color: #333;
  font-size: 12px;
  margin-top: 8px;
}

.cell__taskItem {
  background-color: #2ac8e2;
  border-radius: 3px;
  color: #ffffff;
  font-size: 12px;
  line-height: 1.4;
  margin-top: 8px;
  padding: 4px 24px 4px 8px;
  position: relative;

  &:not(:first-child) {
    margin-top: 8px;
  }
}

.cell__taskItemName {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.cell__taskItemRemoveButton {
  cursor: pointer;
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
}

.cell__label {
  background-color: #f9a802;
  border-radius: 3px;
  color: #ffffff;
  font-size: 12px;
  line-height: 1.4;
  margin-top: 8px;
  overflow: hidden;
  padding: 4px 8px;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
