<template>
  <td :class="classes">
    <div
      class="app-table__body-cell-wrapper"
      @click="handleCellClick"
      @dblclick="handleCellDoubleClick"
      @click.right.prevent="handleRightClick"
      @keydown="handleCellClick"
    >
      <input
        v-model="cellData"
        type="text"
        :aria-label="`${props.rowId}_${props.columnId}`"
        :size="cellData.length || 1"
        :disabled="!props.cell.isEditable"
        @keydown.enter="unsetEditableCell"
        @keydown.esc="unsetEditableCell"
      />
    </div>
  </td>
</template>

<script lang="ts" setup> // AppTableCell
import { defineProps, computed, PropType } from 'vue';
import type { TableCell } from '@/store/TableStore';
import { useTableStore } from '@/store/TableStore';

const props = defineProps({
  cell: {
    type: Object as PropType<TableCell>,
    required: true,
  },
  rowId: {
    type: Number,
    required: true,
  },
  columnId: {
    type: Number,
    required: true,
  },
});

const classes = computed(() => ({
  'app-table__body-cell': true,
  'app-table__body-cell--marked': props.cell.isMarked,
  'app-table__body-cell--selected': props.cell.isSelected,
}));

const {
  setCell,
  selectCell,
  unselectCell,
  setEditableCell,
  unsetEditableCell,
  showContextMenu,
} = useTableStore();

const cellData = computed({
  get() {
    return props.cell.data || '';
  },
  set(value: string) {
    setCell(props.rowId, props.columnId, value);
  },
});

function handleCellClick() {
  selectCell(props.rowId, props.columnId);
}
function handleCellDoubleClick() {
  setEditableCell(props.rowId, props.columnId);
}
function handleRightClick(event: MouseEvent) {
  unselectCell();
  showContextMenu({
    event: {
      x: event.clientX,
      y: event.clientY,
    },
    cell: {
      rowId: props.rowId,
      columnId: props.columnId,
    },
  });
}
</script>

<style lang="scss">
.app-table__body-cell {
  padding: 0;

  font-weight: 400;
  text-align: center;

  &--marked {
    background-color: aquamarine;
  }

  &--selected > .app-table__body-cell-wrapper > input {
    padding: 6px 14px;

    border: 2px solid #6495EDFF;
  }
}

.app-table__body-cell-wrapper {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: stretch;

  > input {
    padding: 8px 16px;
    min-width: 64px;
    flex-grow: 1;

    border: none;
    outline: none;
  }
}
</style>
