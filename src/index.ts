import { removeFileIfExists, writeDataToFile } from './utility';

const OUTPUT_FILE_PATH = "out/output.json";

const numberOfRow = 3;
const totalRow = 10;

const execute = async() => {
  try {
    removeFileIfExists(OUTPUT_FILE_PATH);
    await writeDataToFile(OUTPUT_FILE_PATH, numberOfRow, totalRow);
  } catch (err) {
    console.log(err);
  }
}

execute();