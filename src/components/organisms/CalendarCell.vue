<template>
  <div :class="[$style.cell, { [$style['cell--gray']]: !schedule.current }]" @click="handleClickCell(schedule.date)">
    <div :class="[$style.cell__container, { [$style['cell__container--scale']]: schedule.overview }]">
      <div v-if="isVisibleWeek(schedule.firstWeek, schedule.overview)" :class="$style.week">{{ schedule.week }}</div>
      <div :class="[$style.day, { [$style['day--active']]: schedule.day === today }]">{{ schedule.day }}</div>
      <div v-if="isVisibleHoliday(schedule.holiday, schedule.overview)" :class="$style.holiday">
        {{ schedule.holiday }}
      </div>
      <div :class="$style.taskList">
        <div v-for="task in getTasks(schedule.tasks, schedule.overview)" :key="task.id" :class="$style.taskList__item">
          <div :class="$style.taskList__itemName">{{ task.name }}</div>
          <div :class="$style.taskList__itemRemoveButton" @click.stop="handleClickTaskRemoveButton(task.id)">×</div>
        </div>
        <div
          v-show="isVisibleOverviewButton(schedule.tasks, schedule.overview)"
          :class="$style.taskList__overviewButton"
          @click.stop="handleClickTaskOverviewButton(schedule.date)"
        >
          他{{ getNumberOfOverflowTask(schedule.tasks) }}件
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// セルに表示する最大タスク数
const MAX_TASK = 2;

export default {
  props: {
    schedule: {
      type: Object,
      required: true,
    },
    today: {
      type: Number,
      required: true,
    },
  },

  methods: {
    getNumberOfOverflowTask: tasks => tasks.length - MAX_TASK,
    getTasks: (tasks, overview) => (overview ? tasks : tasks.slice(0, MAX_TASK)),
    handleClickCell(date) {
      this.$emit('on-click-cell', date);
    },
    handleClickTaskOverviewButton(date) {
      this.$emit('on-click-task-overview-button', date, this.$el);
    },
    handleClickTaskRemoveButton(taskId) {
      this.$emit('on-click-remove-task-button', taskId);
    },
    isVisibleOverviewButton: (task, overview) => task.length > MAX_TASK && !overview,
    isVisibleHoliday: (holiday, overview) => holiday !== '' && !overview,
    isVisibleWeek: (firstWeek, overview) => firstWeek || overview,
  },
};
</script>

<style lang="scss" module>
.cell {
  background-color: #ffffff;
  position: relative;

  &--gray {
    background-color: #f3f3f3;
  }
}

.cell__container {
  height: 100%;
  position: absolute;
  width: 100%;

  &--scale {
    background: #ffffff;
    border-radius: 3px;
    box-shadow: 0 24px 38px 3px rgba(#000, 0.14), 0 9px 46px 8px rgba(#000, 0.12), 0 11px 15px -7px rgba(#000, 0.2);
    height: auto;
    left: -5%;
    min-height: 110%;
    top: -5%;
    width: 110%;
    z-index: 10;
  }
}

.week {
  font-size: 10px;
  margin: 5px 0;
  text-align: center;
}

.day {
  font-size: 12px;
  line-height: 1;
  margin: 5px 0;
  text-align: center;

  &--active {
    color: #f00d4f;
    font-weight: bold;
  }
}

.holiday {
  background-color: #f9a802;
  border-radius: 3px;
  color: #ffffff;
  font-size: 12px;
  line-height: 1.4;
  margin: 4px 4px 0;
  overflow: hidden;
  padding: 3px 8px;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.taskList {
  margin: 4px 0;
}

.taskList__item {
  background-color: #2ac8e2;
  border-radius: 3px;
  color: #ffffff;
  font-size: 12px;
  line-height: 1.4;
  margin: 0 4px;
  padding: 3px 24px 3px 8px;
  position: relative;

  &:not(:first-child) {
    margin-top: 4px;
  }
}

.taskList__itemName {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.taskList__itemRemoveButton {
  cursor: pointer;
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
}

.taskList__overviewButton {
  border-radius: 3px;
  cursor: pointer;
  font-size: 10px;
  font-weight: bold;
  line-height: 1.4;
  margin: 4px 4px 0;
  padding: 4px 8px;

  &:hover {
    background: #f0f0f0;
  }
}
</style>
