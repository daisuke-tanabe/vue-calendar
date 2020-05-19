<template>
  <div :class="classesCell" @click="handleClickCell">
    <div ref="cellContainer" :class="classesCellContainer">
      <div v-if="isVisibleWeek" :class="[$style.week]">{{ week }}</div>
      <div :class="classesDay">{{ day }}</div>
      <div v-if="isVisibleHoliday" :class="$style.holiday">{{ holiday }}</div>
      <div :class="$style.taskList">
        <div v-for="task in visibleTask" :key="task.id" :class="$style.taskList__item">
          <div :class="$style.taskList__itemName">{{ task.name }}</div>
          <div :class="$style.taskList__itemRemoveButton" @click.stop="handleClickTaskRemoveButton(task.id)">×</div>
        </div>
        <div
          v-show="isVisibleOverviewButton"
          :class="$style.taskList__overviewButton"
          @click.stop="handleClickTaskOverviewButton"
        >
          他{{ numberOfOverflowTask }}件
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

  computed: {
    classesCell: ({ $style, current }) => [$style.cell, { [$style['cell--gray']]: !current }],
    classesCellContainer: ({ $style, overview }) => [
      $style.cell__container,
      { [$style['cell__container--scale']]: overview },
    ],
    classesDay: ({ $style, day, today }) => [$style.day, { [$style['day--active']]: day === today }],
    current: ({ schedule }) => schedule.current,
    date: ({ schedule }) => schedule.date,
    day: ({ schedule }) => schedule.day,
    firstWeek: ({ schedule }) => schedule.firstWeek,
    holiday: ({ schedule }) => schedule.holiday,
    isVisibleOverviewButton: ({ overview, tasksLength }) => tasksLength > MAX_TASK && !overview,
    isVisibleHoliday: ({ holiday, overview }) => holiday !== '' && !overview,
    isVisibleWeek: ({ firstWeek, overview }) => firstWeek || overview,
    numberOfOverflowTask: ({ tasksLength }) => tasksLength - MAX_TASK,
    overview: ({ schedule }) => schedule.overview,
    tasks: ({ schedule }) => schedule.tasks,
    tasksLength: ({ tasks }) => tasks.length,
    visibleTask: ({ overview, tasks }) => (overview ? tasks : tasks.slice(0, MAX_TASK)),
    week: ({ schedule }) => schedule.week,
  },

  watch: {
    overview() {
      this.$nextTick(() => {
        // 下部に余白をもたせるためのマジックナンバー
        const PADDING = 12;
        const bodyHeight = Math.floor(document.body.clientHeight);
        const $container = this.$refs.cellContainer;
        const containerRect = $container.getBoundingClientRect();
        const containerRectBottom = Math.floor(containerRect.bottom);
        const containerRectHeight = Math.floor(containerRect.height);
        if (containerRectBottom > bodyHeight - PADDING) {
          $container.style.top = `calc(-5% - ${containerRectBottom - bodyHeight + PADDING}px)`;
          $container.style.height = `${containerRectHeight}px`;
          return;
        }
        $container.style.top = '';
        $container.style.height = '';
      });
    },
  },

  methods: {
    handleClickCell() {
      this.$emit('on-click-cell', this.date);
    },
    handleClickTaskOverviewButton() {
      this.$emit('on-click-task-overview-button', this.date, this.$el);
    },
    handleClickTaskRemoveButton(taskId) {
      this.$emit('on-click-remove-task-button', taskId);
    },
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
  overflow: hidden;
  position: absolute;
  width: 100%;

  &--scale {
    background: #ffffff;
    border-radius: 3px;
    box-shadow: 0 24px 38px 3px rgba(#000, 0.14), 0 9px 46px 8px rgba(#000, 0.12), 0 11px 15px -7px rgba(#000, 0.2);
    height: auto;
    left: -5%;
    min-height: 110%;
    overflow: auto;
    top: -5%;
    width: 110%;
    z-index: 10;
  }
}

.week {
  font-size: 10px;
  padding: 5px 0;
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
