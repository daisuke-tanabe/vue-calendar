<template>
  <div :class="$style.wrapper">
    <Bar />
    <Calendar />
    <Modal v-if="visibleModal" />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Bar from '../organisms/Bar.vue';
import Calendar from '../organisms/Calendar.vue';
import Modal from '../organisms/Modal.vue';

export default {
  components: {
    Bar,
    Calendar,
    Modal,
  },

  computed: {
    ...mapState({
      visibleModal: 'visibleModal',
    }),
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
