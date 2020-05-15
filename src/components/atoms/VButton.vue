<template>
  <button type="button" :class="classes" :style="styleObject" @click="handleClick">{{ text }}</button>
</template>

<script>
export default {
  props: {
    skin: {
      type: String,
      required: false,
      default: '',
    },
    styleObject: {
      type: Object,
      required: false,
      default: () => ({}),
    },
    text: {
      type: String,
      required: true,
    },
  },

  computed: {
    classes: ({ $style, skin }) => {
      const baseName = 'button';
      const classArray = [$style[baseName]];
      if (skin !== '') classArray.push($style[`${baseName}--${skin}`]);
      return classArray;
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

  &--primary {
    background-color: #1a73e8;
    border: none;
    color: #fff;

    &:hover {
      background-color: #1f84f4;
    }
  }
}
</style>
