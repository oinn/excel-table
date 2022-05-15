<template>
  <table class="app-table">
    <!-- Header -->
    <thead class="app-table__header">
      <tr>
        <th
          v-for="(columnName, index) in columnNames" :key="index"
          class="app-table__header-cell"
        >
          {{ columnName }}
        </th>
      </tr>
    </thead>

    <!-- Body -->
    <tbody class="app-table__body">
      <tr v-for="(row, rowIndex) in data" :key="rowIndex" class="app-table__body-row">
        <AppTableCell
          v-for="(cell, cellIndex) in row" :key="cellIndex"
          :cell="cell"
          :row-id="rowIndex"
          :column-id="cellIndex"
        />
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts" setup> // AppTable
import { storeToRefs } from 'pinia';
import { useTableStore } from '@/store/TableStore';
import AppTableCell from '@/components/AppTableCell.vue';

const tableStore = useTableStore();
const { data, columnNames } = storeToRefs(tableStore);
</script>

<style lang="scss">
.app-table {
  font-family: sans-serif;
  font-size: 14px;
  line-height: 20px;

  border-collapse: collapse;
}

.app-table__header {
  position: sticky;
  top: 0;

  background-color: #111214;

  color: #FFFFFF;
}

.app-table__header-cell {
  padding: 8px 16px;

  font-weight: 400;
  text-align: center;
}

.app-table__body-row {
  box-shadow: inset 0 1px 0 #E6E7E9, inset 0px -1px 0px #E6E7E9;

  &:nth-child(2n) {
    background-color: #F9FAFC;
  }
}
</style>
