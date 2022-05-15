<template>
  <div v-show="isVisible" ref="uiMenuRef" class="context-menu">
    <ul class="context-menu__list">
      <li
        v-for="item in menuItems" :key="item.name"
        class="context-menu__list-item"
        @click="handleMenuItemClick(item.action)"
        @keydown="handleMenuItemClick(item.action)"
      >
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import type { Ref } from 'vue';
import { ref, watch } from 'vue';
import { useClickOutside } from '@/utils/clickOutside';
import { storeToRefs } from 'pinia';
import type { CellEvent } from '@/store/TableStore';
import { useTableStore } from '@/store/TableStore';

const uiMenuRef = ref<HTMLElement | null>(null);
const isVisible = ref(false);

const tableStore = useTableStore();
const { contextMenuData } = storeToRefs(tableStore);
const {
  cutRow,
  copyRow,
  pasteRow,
  insertRowAbove,
  deleteRow,
} = tableStore;

useClickOutside(uiMenuRef as Ref<HTMLElement>, () => {
  isVisible.value = false;
});

watch(contextMenuData, (cellEvent: CellEvent) => {
  const { x, y } = cellEvent.event;

  if (uiMenuRef.value && typeof x === 'number' && typeof y === 'number') {
    uiMenuRef.value.style.top = `${y}px`;
    uiMenuRef.value.style.left = `${x}px`;
    isVisible.value = true;
  }
});

function handleMenuItemClick(action: () => void) {
  isVisible.value = false;
  action();
}

function cutRowHandle() {
  if (typeof contextMenuData.value.cell.rowId === 'number') {
    cutRow(contextMenuData.value.cell.rowId);
  }
}
function copyRowHandle() {
  if (typeof contextMenuData.value.cell.rowId === 'number') {
    copyRow(contextMenuData.value.cell.rowId);
  }
}
function pasteRowHandle() {
  if (typeof contextMenuData.value.cell.rowId === 'number') {
    pasteRow(contextMenuData.value.cell.rowId);
  }
}
function insertRowAboveHandle() {
  if (typeof contextMenuData.value.cell.rowId === 'number') {
    insertRowAbove(contextMenuData.value.cell.rowId);
  }
}
function deleteRowHandle() {
  if (typeof contextMenuData.value.cell.rowId === 'number') {
    deleteRow(contextMenuData.value.cell.rowId);
  }
}

const menuItems = [
  { name: 'Cut row', action: cutRowHandle },
  { name: 'Copy row', action: copyRowHandle },
  { name: 'Paste row above', action: pasteRowHandle },
  { name: 'Insert row above', action: insertRowAboveHandle },
  { name: 'Delete row', action: deleteRowHandle },
];
</script>

<style lang="scss">
.context-menu {
  position: fixed;
  z-index: 10;

  background-color: #111214;

  color: #FFFFFF;
}

.context-menu__list {
  padding: 0;
  margin: 0;

  list-style: none;
}

.context-menu__list-item {
  padding: 8px 16px;

  &:hover {
    background-color: change-color(#111214, $lightness: 20%);
    cursor: pointer;
  }
}
</style>
