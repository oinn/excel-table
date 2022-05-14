<template>
  <button class="ui-button">
    <slot></slot>
  </button>
</template>

<style lang="scss">
.ui-button {
  height: 28px;
  min-width: 120px;
  padding: 4px 12px;

  background-color: #111214;
  border: none;
  border-radius: 4px;
  outline: none;

  color: #FFFFFF;
  font-family: sans-serif;
  font-size: 14px;
  line-height: 20px;

  &:hover,
  &:focus {
    background-color: change-color(#111214, $lightness: 20%);
    cursor: pointer;
  }
}
</style>
