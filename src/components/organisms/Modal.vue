<template>
  <div :class="$style.wrapper">
    <div :class="$style.underLayer" @click="closeModal"></div>
    <div :class="$style.modal">
      <button :class="$style.modal__closeButton" @click="closeModal">×</button>
      <div :class="$style.modal__saveButton">
        <VButton skin="primary" text="保存" @on-click="saveTask" />
      </div>
      <div :class="$style.modal__date">{{ targetDate }}</div>
      <div :class="$style.modal__input">
        <input v-model="text" type="text" autocomplete="off" placeholder="タスクを入力" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import VButton from '../atoms/VButton.vue';

export default {
  components: {
    VButton,
  },

  data() {
    return {
      text: '',
    };
  },

  computed: {
    ...mapState({
      targetDate: 'targetDate',
    }),
  },

  methods: {
    ...mapActions({
      applyTask: 'applyTask',
      toggleModal: 'toggleModal',
    }),
    closeModal() {
      this.toggleModal({ date: '', isVisible: false });
    },
    saveTask() {
      if (this.text !== '') this.applyTask(this.text);
      this.toggleModal({ date: '', isVisible: false });
    },
  },
};
</script>

<style lang="scss" module>
.wrapper {
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
  position: fixed;
  width: 100%;
  z-index: 100;
}

.underLayer {
  background: transparent;
  height: 100%;
  position: fixed;
  width: 100%;
}

.modal {
  align-items: center;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 24px 38px 3px rgba(#000, 0.14), 0 9px 46px 8px rgba(#000, 0.12), 0 11px 15px -7px rgba(#000, 0.2);
  display: flex;
  flex-direction: column;
  height: 320px;
  justify-content: center;
  position: relative;
  width: 400px;
}

.modal__closeButton {
  display: flex;
  font-size: 20px;
  height: 40px;
  justify-content: center;
  position: absolute;
  right: 6px;
  top: 6px;
  width: 40px;
}

.modal__saveButton {
  bottom: 8px;
  height: 36px;
  position: absolute;
  right: 8px;
  width: 76px;
}

.modal__date {
  font-size: 15px;
  margin-bottom: 24px;
}

.modal__input {
  border-bottom: 1px solid #dadce0;
  font-size: 15px;
}
</style>
