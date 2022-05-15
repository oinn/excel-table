<template>
  <div class="app-header">
    <UiFileButton
      label="import"
      accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      @select="emit('import', $event)"
    >
      Import
    </UiFileButton>

    <UiButton @click="emit('export')">Export</UiButton>

    <div class="app-header__spacer"></div>
    <div class="app-header__title">{{ fileName }}</div>
    <div class="app-header__spacer"></div>

    <UiInput v-model="searchText" label="search" placeholder="Search..."/>
  </div>
</template>

<script lang="ts" setup> // AppHeader
import { computed, defineEmits, defineProps } from 'vue';
import UiFileButton from '@/components/Core/UiFileButton.vue';
import UiButton from '@/components/Core/UiButton.vue';
import UiInput from '@/components/Core/UiInput.vue';

interface Emits {
  (e: 'import', file: File): void,
  (e: 'export'): void,
  (e: 'update:searchText', text: string): void,
}

const emit = defineEmits<Emits>();

const props = defineProps({
  fileName: {
    type: String,
    default: '',
  },
  searchText: {
    type: String,
    default: '',
  },
});

const searchText = computed({
  get() {
    return props.searchText;
  },
  set(value: string) {
    emit('update:searchText', value);
  },
});
</script>

<style lang="scss">
.app-header {
  height: 56px;
  padding: 0 24px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;

  box-shadow: inset 0px -1px 0px #E6E7E9;
}

.app-header__spacer {
  flex-grow: 1;
}

.app-header__title {
  font-weight: 600;
}
</style>
