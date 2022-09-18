import { removeFileIfExists, writeDataToFile, displayTimeLapse } from './utility';

const OUTPUT_FILE_PATH = "out/output.json";

const numberOfRow = 1000;
const totalRow = 10000;

const execute = async() => {
  let startingTime = Date.now();
  console.log(`starting time: ${startingTime}`);

  try {
    await removeFileIfExists(OUTPUT_FILE_PATH);
    await writeDataToFile(OUTPUT_FILE_PATH, numberOfRow, totalRow);
  } catch (err) {
    console.log(err);
  } 
  finally {
    displayTimeLapse(startingTime, Date.now());
  }
}

execute();