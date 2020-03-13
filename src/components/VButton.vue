<template>
  <button type="button" class="button" @click="handleClick">
    <slot />
  </button>
</template>

<script>
export default {
  methods: {
    handleClick() {
      this.$emit('on-click');
    },
  },
};
</script>

<style lang="scss" scoped>
.button {
  background-color: transparent;
  border: 1px solid #dadce0;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  line-height: 1;
  height: 100%;
  padding: 8px;
  outline: none;
  width: 100%;

  &:hover {
    background-color: #f3f3f3;
  }
}
</style>
