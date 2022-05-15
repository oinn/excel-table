import { read as readXlsx, writeFile, utils } from 'xlsx';

export type XslxArray = {
  [columnName: string]: string | number
}[]

async function readFile(file: File) {
  return new Promise((resolve) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      resolve(event.target?.result);
    };
    reader.readAsBinaryString(file);
  });
}

// eslint-disable-next-line import/prefer-default-export
export async function xlsxToArray(file: File): Promise<XslxArray> {
  const binary = await readFile(file);
  const data = readXlsx(binary, { type: 'binary' });
  const sheetName = data.SheetNames[0];

  return utils.sheet_to_json(data.Sheets[sheetName]);
}

export async function arrayToXlsx(data: XslxArray, fileName: string) {
  const ws = utils.json_to_sheet(data);
  const wb = utils.book_new();
  utils.book_append_sheet(wb, ws, 'Sheet1');
  writeFile(wb, fileName);
}
