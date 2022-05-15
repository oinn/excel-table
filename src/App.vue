<template>
  <AppHeader/>

  <div class="app-table__wrapper">
    <div class="app-table__container">
      <AppTable/>
    </div>
  </div>

  <ContextMenu/>
</template>

<script lang="ts" setup> // App
import AppHeader from '@/components/AppHeader.vue';
import AppTable from '@/components/AppTable.vue';
import ContextMenu from '@/components/ContextMenu.vue';
</script>

<style lang="scss">
#app {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.app-table__wrapper {
  flex-grow: 1;
  position: relative;

  overflow: auto;
}

.app-table__container {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: auto;
}
</style>
