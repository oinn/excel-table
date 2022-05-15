<template>
  <div class="app-header">
    <UiFileButton
      label="import"
      accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      @select="importFromFile($event)"
    >
      Import
    </UiFileButton>

    <UiButton @click="handleExportButtonClick">Export</UiButton>

    <div class="app-header__spacer"></div>
    <div class="app-header__title">{{ fileName }}</div>
    <div class="app-header__spacer"></div>

    <UiInput
      v-model="searchText"
      label="search"
      placeholder="Search..."
      @input="handleSearchInput"
    />
  </div>
</template>

<script lang="ts" setup> // AppHeader
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useTableStore } from '@/store/TableStore';
import UiFileButton from '@/components/Core/UiFileButton.vue';
import UiButton from '@/components/Core/UiButton.vue';
import UiInput from '@/components/Core/UiInput.vue';

const searchText = ref('');

const tableStore = useTableStore();
const { fileName } = storeToRefs(tableStore);
const { importFromFile, handleSearch, exportToFile } = tableStore;

let searchInputTimer: ReturnType<typeof setTimeout>;

function handleSearchInput() {
  clearTimeout(searchInputTimer);
  searchInputTimer = setTimeout(() => handleSearch(searchText.value), 500);
}

function handleExportButtonClick() {
  exportToFile();
}
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
