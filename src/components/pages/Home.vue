<template>
  <div :class="$style.wrapper">
    <Bar />
    <Calendar />
  </div>
</template>

<script>
import Bar from '../organisms/Bar.vue';
import Calendar from '../organisms/Calendar.vue';

export default {
  components: {
    Bar,
    Calendar,
  },
};
</script>

<style lang="scss" module>
.wrapper {
  display: grid;
  grid-template-rows: auto 1fr;
  height: 100vh;
}
</style>
