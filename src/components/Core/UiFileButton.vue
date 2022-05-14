<template>
  <UiButton @click="clickInput">
    <slot></slot>
  </UiButton>
  <input
    ref="inputRef"
    class="ui-file-button__input"
    type="file"
    :aria-label="label"
    :accept="accept"
    @change="handleFileSelect"
  />
</template>

<script lang="ts" setup> // UiFileButton
import {
  defineEmits,
  defineProps,
  ref,
} from 'vue';
import UiButton from '@/components/Core/UiButton.vue';

interface Emits {
  (e: 'select', file: File): void,
}

const emit = defineEmits<Emits>();
defineProps({
  label: {
    type: String,
    required: true,
  },
  accept: {
    type: String,
    default: '',
  },
});

const inputRef = ref<HTMLInputElement | null>(null);

function clickInput() {
  inputRef.value?.click();
}

function handleFileSelect() {
  const file = inputRef.value?.files?.[0];
  if (file && file.size) {
    emit('select', file);
  }
}
</script>

<style lang="scss">
.ui-file-button__input {
  display: none;
}
</style>
