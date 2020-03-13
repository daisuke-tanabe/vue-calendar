<template>
  <div class="pager">
    <button class="pager__button" type="button" @click="handlePreviousPageClick">
      ＜
    </button>
    <button class="pager__button" type="button" @click="handleNextPageClick">
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

<style lang="scss" scoped>
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
