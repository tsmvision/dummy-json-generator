import {
  removeFileIfExists,
  writeDataToFile,
  displayTimeLapse,
} from "./utility";
import path from "path";

const OUTPUT_FILE_PATH = path.join(__dirname, "out/output.json");

const numberOfRow = 1000;
const totalRow = 100000000;

const execute = async () => {
  let startingTime = Date.now();
  console.log(`starting time: ${startingTime}`);

  try {
    await removeFileIfExists(OUTPUT_FILE_PATH);
    await writeDataToFile(OUTPUT_FILE_PATH, numberOfRow, totalRow);
  } catch (err) {
    console.log(err);
  } finally {
    displayTimeLapse(startingTime, Date.now());
  }
};

execute();
