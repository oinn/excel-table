<template>
  <input
    v-model="value"
    class="ui-input"
    type="text"
    :aria-label="label"
    :placeholder="placeholder"
  />
</template>

<!--suppress JSUnusedGlobalSymbols -->
<script lang="ts" setup> // UiInput
import { computed, defineEmits, defineProps } from 'vue';

interface Emits {
  (e: 'update:modelValue', value: string): void,
}

const emit = defineEmits<Emits>();

// eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  label: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    default: '',
  },
});

const value = computed({
  get() {
    return props.modelValue;
  },
  set(text: string) {
    emit('update:modelValue', text);
  },
});
</script>

<style lang="scss">
.ui-input {
  height: 28px;
  min-width: 300px;
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
  }
}
</style>
