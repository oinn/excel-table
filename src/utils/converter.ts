import { read as readXlsx, utils } from 'xlsx';

export type XslxArray = {
  [columnName: string]: string
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
