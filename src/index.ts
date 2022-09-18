import { faker } from '@faker-js/faker';
import fs from 'fs/promises';
import { removeFileIfExists, generateResultByNumber, customStrinify, writeDataToFile } from './utility';

const OUTPUT_FILE_PATH = "out/output.json";

const numberOfRow = 2;
const totalRow = 20;

async function execute() {
  try {
    removeFileIfExists(OUTPUT_FILE_PATH);
    await writeDataToFile(OUTPUT_FILE_PATH, numberOfRow, totalRow);
  } catch (err) {
    console.log(err);
  }
}

execute();