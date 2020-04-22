<template>
  <button type="button" :class="$style.button" @click="handleClick">{{ text }}</button>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: true,
    },
  },

  methods: {
    handleClick() {
      this.$emit('on-click');
    },
  },
};
</script>

<style lang="scss" module>
.button {
  background-color: transparent;
  border: 1px solid #dadce0;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  height: 100%;
  line-height: 1;
  outline: none;
  padding: 8px;
  width: 100%;

  &:hover {
    background-color: #f3f3f3;
  }
}
</style>
