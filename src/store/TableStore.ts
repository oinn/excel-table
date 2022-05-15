import { defineStore } from 'pinia';
import { arrayToXlsx, xlsxToArray } from '@/utils/converter';

export interface TableCell {
  data: string,
  isSelected: boolean,
  isMarked: boolean,
  isEditable: boolean,
}

export interface CellEvent {
  event: {
    x: number | null,
    y: number | null,
  },
  cell: {
    rowId: number | null,
    columnId: number | null,
  },
}

type TableRow = TableCell[];
type TableData = TableRow[];

// eslint-disable-next-line import/prefer-default-export
export const useTableStore = defineStore('TableStore', {
  state() {
    return {
      isLoading: false,
      fileName: '',
      data: [] as TableData,
      columnNames: [] as string[],
      lastSearchText: '',
      selectedCell: {
        rowId: null as number | null,
        columnId: null as number | null,
      },
      editableCell: {
        rowId: null as number | null,
        columnId: null as number | null,
      },
      contextMenuData: {
        event: {
          x: null,
          y: null,
        },
        cell: {
          rowId: null,
          columnId: null,
        },
      } as CellEvent,
      rowBuffer: [] as TableRow,
    };
  },
  actions: {
    async importFromFile(file: File) {
      this.isLoading = true;

      try {
        const data = await xlsxToArray(file);
        const finallyData = [] as TableData;

        data.forEach((dataRow) => {
          const row = [] as TableRow;
          Object.values(dataRow).forEach((dataCell) => {
            row.push({
              data: typeof dataCell === 'string' ? dataCell : dataCell.toString(),
              isSelected: false,
              isMarked: false,
              isEditable: false,
            });
          });
          finallyData.push(row);
        });
        this.data = finallyData;

        this.columnNames = Object.keys(data[0]);
        this.fileName = file.name || '';
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
      } finally {
        this.isLoading = false;
      }
    },
    exportToFile() {
      if (this.data.length) {
        const jsonData = this.data.map((row) => {
          return Object.values(this.columnNames).reduce((acc, columnName, index) => {
            acc[columnName] = row[index].data;
            return acc;
          }, {} as {[columnName: string]: string});
        });
        arrayToXlsx(jsonData, this.fileName);
      }
    },
    clearMarked() {
      this.data = this.data.map((row) => row.reduce((acc, cell) => {
        acc.push({
          ...cell,
          isMarked: false,
        });
        return acc;
      }, [] as TableRow));
    },
    handleSearch(text: string) {
      this.lastSearchText = text;

      if (!this.data.length) {
        return;
      }

      if (text) {
        const searchRegexp = new RegExp(text, 'im');
        this.data = this.data.map((row) => row.reduce((acc, cell) => {
          acc.push({
            ...cell,
            isMarked: searchRegexp.test(cell.data),
          });
          return acc;
        }, [] as TableRow));
      } else {
        this.clearMarked();
      }
    },
    setCell(rowId: number, columnId: number, value: string) {
      this.data[rowId][columnId].data = value;
    },
    unselectCell() {
      const { rowId, columnId } = this.selectedCell;
      if (typeof rowId === 'number' && typeof columnId === 'number') {
        this.data[rowId][columnId].isSelected = false;
        this.selectedCell = {
          rowId: null,
          columnId: null,
        };
      }
    },
    selectCell(rowId: number, columnId: number) {
      if (this.selectedCell.rowId === rowId && this.selectedCell.columnId === columnId) {
        return;
      }

      if (this.editableCell.rowId !== rowId || this.editableCell.columnId !== columnId) {
        this.unsetEditableCell();
      }

      this.unselectCell();
      this.selectedCell = {
        rowId,
        columnId,
      };
      this.data[rowId][columnId].isSelected = true;
    },
    unsetEditableCell() {
      const { rowId, columnId } = this.editableCell;
      if (typeof rowId === 'number' && typeof columnId === 'number') {
        this.data[rowId][columnId].isEditable = false;
        this.editableCell = {
          rowId: null,
          columnId: null,
        };
      }

      this.handleSearch(this.lastSearchText);
    },
    setEditableCell(rowId: number, columnId: number) {
      this.selectCell(rowId, columnId);

      this.unsetEditableCell();
      this.editableCell = {
        rowId,
        columnId,
      };
      this.data[rowId][columnId].isEditable = true;
    },
    showContextMenu(cellEvent: CellEvent) {
      this.contextMenuData = cellEvent;
    },
    copyRow(rowId: number) {
      this.rowBuffer = [...this.data[rowId]];
    },
    insertRowAbove(rowId: number) {
      const newRow = this.data[0].map((cell) => ({
        ...cell,
        data: '',
      }));
      this.data.splice(rowId, 0, newRow);
    },
    deleteRow(rowId: number) {
      this.data.splice(rowId, 1);
    },
    cutRow(rowId: number) {
      this.copyRow(rowId);
      this.deleteRow(rowId);
    },
    pasteRow(rowId: number) {
      if (this.rowBuffer.length) {
        this.data.splice(rowId, 0, this.rowBuffer);
      }
    },
  },
});

/*
[
  {
    columnName1: "1"
    columnName2: "2"
  },
  {
    columnName1: "3"
    columnName2: "4"
  }
]
* */
