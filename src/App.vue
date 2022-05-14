<template>
  <AppHeader :file-name="fileName" @import="handleImport" @export="handleExport"/>

  <div class="app-table__wrapper">
    <AppTable/>
  </div>
</template>

<script lang="ts" setup> // App
import { ref } from 'vue';
import AppHeader from '@/components/AppHeader.vue';
import AppTable from '@/components/AppTable.vue';

const fileName = ref('');

function handleImport(file: File) {
  fileName.value = file.name;
  // eslint-disable-next-line no-console
  console.log('import', file);
}

function handleExport() {
  // eslint-disable-next-line no-console
  console.log('export');
}
</script>

<style lang="scss">
#app {
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
