<template>
  <div class="bar">
    <div class="bar__button">
      <VButton @on-click="onClickResetButton">
        今日
      </VButton>
    </div>

    <div class="bar__pager">
      <CalendarBarPager @on-click-next-page="onClickNextPage" @on-click-previous-page="onClickPreviousPage" />
    </div>

    <div class="bar__date">
      {{ date }}
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { TweenMax } from 'gsap';
import CalendarBarPager from './CalendarBarPager.vue';
import VButton from './VButton.vue';

export default {
  components: {
    CalendarBarPager,
    VButton,
  },

  props: {
    year: {
      type: Number,
      required: true,
    },
    month: {
      type: Number,
      required: true,
    },
  },

  data() {
    return {
      tweenedYear: 0,
      tweenedMonth: 0,
    };
  },

  computed: {
    date: ({ animatedYear, animatedMonth }) => `${animatedYear}年${animatedMonth}月`,
    animatedYear: ({ tweenedYear }) => tweenedYear.toFixed(0),
    animatedMonth: ({ tweenedMonth }) => tweenedMonth.toFixed(0),
  },

  watch: {
    year: {
      handler(value) {
        TweenMax.to(this.$data, 0.3, { tweenedYear: value });
      },
      immediate: true,
    },
    month: {
      handler(value) {
        TweenMax.to(this.$data, 0.3, { tweenedMonth: value });
      },
      immediate: true,
    },
  },

  methods: {
    ...mapActions({
      nextPage: 'nextPage',
      previousPage: 'previousPage',
      resetPage: 'resetPage',
    }),
    onClickNextPage() {
      this.nextPage();
    },
    onClickPreviousPage() {
      this.previousPage();
    },
    onClickResetButton() {
      this.resetPage();
    },
  },
};
</script>

<style lang="scss" scoped>
.bar {
  align-items: center;
  display: flex;
  margin: 0 auto;
}

.bar__button {
  flex: 0 1 64px;
  width: 64px;
}

.bar__pager {
  flex: 0 1 auto;
  margin-left: 32px;
}

.bar__date {
  flex: 0 1 auto;
  font-size: 20px;
  margin-left: 20px;
}
</style>
