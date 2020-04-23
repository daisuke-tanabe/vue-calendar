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
    ...mapState(['targetDate']),
  },

  methods: {
    ...mapActions({
      toggleModal: 'toggleModal',
      applyTask: 'applyTask',
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
  justify-content: center;
  display: flex;
  position: fixed;
  height: 100%;
  width: 100%;
}

.underLayer {
  background: transparent;
  height: 100%;
  position: fixed;
  width: 100%;
}

.modal {
  align-items: center;
  justify-content: center;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 24px 38px 3px rgba(#000, 0.14), 0 9px 46px 8px rgba(#000, 0.12), 0 11px 15px -7px rgba(#000, 0.2);
  height: 320px;
  display: flex;
  flex-direction: column;
  position: relative;
  width: 400px;
}

.modal__closeButton {
  justify-content: center;
  font-size: 20px;
  display: flex;
  height: 40px;
  position: absolute;
  top: 6px;
  right: 6px;
  width: 40px;
}

.modal__saveButton {
  position: absolute;
  bottom: 8px;
  right: 8px;
  height: 36px;
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
