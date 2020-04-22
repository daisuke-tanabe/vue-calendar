<template>
  <div :class="$style.pager">
    <button :class="$style.pager__button" type="button" @click="handlePreviousPageClick">
      ＜
    </button>
    <button :class="$style.pager__button" type="button" @click="handleNextPageClick">
      ＞
    </button>
  </div>
</template>

<script>
export default {
  methods: {
    handleNextPageClick() {
      this.$emit('on-click-next-page');
    },
    handlePreviousPageClick() {
      this.$emit('on-click-previous-page');
    },
  },
};
</script>

<style lang="scss" module>
.pager {
  align-items: center;
  display: flex;
}

.pager__button {
  background: none;
  border: none;
  font-size: 16px;
  font-weight: bold;
  outline: none;
  padding-top: 3px;

  &:hover {
    cursor: pointer;
  }
}
</style>
