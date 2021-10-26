<script lang="ts">
import { computed, ref, defineComponent } from 'vue';

type Schedule = {
  month: number;
  day: number;
  isCurrentDay: boolean;
};

type MakeSchedule = {
  (month: number, days: number[]): Schedule[];
};

export default defineComponent({
  name: 'App',

  setup() {
    // 月に最大表示する日数の定義（6週間 * 7 = 42）
    const maxDays = 42;

    // 曜日の定義
    const weeks = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'] as const;

    // 初期の日付データ
    const today = new Date();
    const date = {
      month: today.getMonth() + 1,
      year: today.getFullYear(),
      day: today.getDate(),
    };

    // 今年、今月、今日
    const currentYear = ref(date.year);
    const currentMonth = ref(date.month);
    const currentDay = ref(date.day);

    // 表記されている年月
    const displayedYear = ref(date.year);
    const displayedMonth = ref(date.month);

    const makeSchedule: MakeSchedule = (month, days) => {
      return days.map((day) => ({
        month,
        day,
        isCurrentDay:
          currentDay.value === day && currentMonth.value === month && currentYear.value === displayedYear.value,
      }));
    };

    const schedules = computed(() => {
      // 今月
      const thisMonthDays = [...Array(new Date(displayedYear.value, displayedMonth.value, 0).getDate()).keys()].map(
        (index) => index + 1
      );
      const thisMonthSchedule = makeSchedule(displayedMonth.value, thisMonthDays);

      // 先月
      const weekOfFirstDay = new Date(displayedYear.value, displayedMonth.value - 1, 1).getDay();
      const dayOfLatMonth = new Date(displayedYear.value, displayedMonth.value - 1, 0).getDate();
      const lastMonthDays = [...Array(weekOfFirstDay).keys()].map((index) => dayOfLatMonth - index).reverse();
      const lastMonthSchedule: Schedule[] = makeSchedule(displayedMonth.value - 1, lastMonthDays);

      // 翌月
      const firstDay = maxDays - thisMonthSchedule.length - lastMonthSchedule.length;
      const nextMonthDays = [...Array(firstDay).keys()].map((index) => index + 1);
      const nextMonthSchedule: Schedule[] = makeSchedule(displayedMonth.value + 1, nextMonthDays);

      return [...lastMonthSchedule, ...thisMonthSchedule, ...nextMonthSchedule];
    });

    // 先月へ
    const toLastMonth = () => {
      if (displayedMonth.value <= 1) {
        displayedMonth.value = 12;
        displayedYear.value -= 1;
        return;
      }
      displayedMonth.value -= 1;
    };

    // 翌月へ
    const toNextMonth = () => {
      if (displayedMonth.value >= 12) {
        displayedMonth.value = 1;
        displayedYear.value += 1;
        return;
      }
      displayedMonth.value += 1;
    };

    return {
      weeks,
      currentYear,
      currentMonth,
      currentDay,
      displayedYear,
      displayedMonth,
      schedules,
      toLastMonth,
      toNextMonth,
    };
  },
});
</script>

<template>
  <div :class="$style.app">
    <div :class="$style.bar">
      <div :class="$style.pager">
        <button :class="$style.pager__button" type="button" @click="toLastMonth">＜</button>
        <button :class="$style.pager__button" type="button" @click="toNextMonth">＞</button>
      </div>
      <div :class="$style.currentPage">{{ displayedMonth }}/{{ displayedYear }}</div>
    </div>
    <div ref="schedule" :class="$style.calendar">
      <div v-for="week in weeks" :key="week" :class="[$style.cell, $style['cell--narrow']]">
        <div :class="$style.week">{{ week }}</div>
      </div>
      <div
        v-for="({ month, day, isCurrentDay }, index) in schedules"
        :key="index"
        :class="[$style.cell, { [$style['cell--gray']]: displayedMonth !== month }]"
      >
        <div
          :class="[
            $style.day,
            {
              [$style['day--circle']]: isCurrentDay,
            },
          ]"
        >
          {{ day }}
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" module>
.app {
  display: grid;
  grid-template-rows: auto 1fr;
  height: 100vh;
}

.bar {
  align-items: center;
  display: flex;
  padding: 24px;
}

.pager {
  flex: 0 1 auto;
  margin-right: 18px;
}

.pager__button {
  background: none;
  border: none;
  border-radius: 16px;
  font-size: 12px;
  font-weight: bold;
  margin: 0 4px;
  outline: none;
  padding: 8px;

  &:hover {
    background: #dadce0;
    cursor: pointer;
  }
}

.currentPage {
  font-size: 24px;
}

.calendar {
  background: #dadce0;
  border: 1px solid #dadce0;
  display: grid;
  gap: 1px;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  grid-template-rows: auto repeat(6, minmax(0, 1fr));
  height: 100%;
}

.cell {
  background-color: #ffffff;
  padding: 12px;

  &--gray {
    background-color: #f3f3f3;
  }

  &--narrow {
    padding: 8px 16px;
  }
}

.week {
  font-weight: bold;
  text-align: center;
}

.day {
  display: inline-block;
  font-size: 12px;
  height: 24px;
  line-height: 24px;
  min-width: 24px;

  &--circle {
    background: #1a73e8;
    border-radius: 50%;
    color: #fff;
    font-weight: bold;
    text-align: center;
  }
}
</style>
