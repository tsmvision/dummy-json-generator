import { faker } from "@faker-js/faker";
import fs from "fs/promises";
import dayjs from "dayjs";
import path from "path";

export const createRandomUser = () => {
  return {
    userId: faker.datatype.uuid(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    birthdate: faker.date.birthdate(),
    registeredAt: faker.date.past(),
  };
};

export const removeFileIfExists = async (filePath: string) => {
  try {
    await fs.access(filePath);
    await fs.unlink(filePath);
  } catch (e) {
    console.log(e);
  }
};

export const getCurrentNumberOfRow = (
  totalRow: number,
  numberOfRow: number,
  currentIterationNumber: number
) => {
  const lastIterationNumber = Math.ceil(totalRow / numberOfRow);

  if (currentIterationNumber === lastIterationNumber - 1) {
    return totalRow - numberOfRow * currentIterationNumber;
  }

  return numberOfRow;
};

export const generateResultByNumber = (
  totalRow: number,
  numberOfRow: number,
  currentIterationNumber: number
) => {
  const numRow = getCurrentNumberOfRow(
    totalRow,
    numberOfRow,
    currentIterationNumber
  );
  const result: any[] = [];
  for (let i = 0; i < numRow; i++) {
    result.push(createRandomUser());
  }

  return result;
};

export const customStrinify = (result: any[]) => {
  const data = result.map((element: any) => JSON.stringify(element));

  return data.join(",");
};

export const writeJsonElementsPerChunk = async (
  OUTPUT_FILE_PATH: string,
  numberOfRow: number,
  totalRow: number
) => {
  for (let i = 0; i < Math.ceil(totalRow / numberOfRow); i++) {
    if (i !== 0) {
      await fs.appendFile(OUTPUT_FILE_PATH, ",");
    }

    const result = generateResultByNumber(totalRow, numberOfRow, i);
    const strinifiedResult = customStrinify(result);

    await fs.appendFile(OUTPUT_FILE_PATH, strinifiedResult);
    console.log(`current row: ${(i + 1) * numberOfRow}`);
    console.log();
  }
};

export const writeDataToFile = async (
  OUTPUT_FILE_PATH: string,
  numberOfRow: number,
  totalRow: number
) => {
  await fs.mkdir(path.dirname(OUTPUT_FILE_PATH), { recursive: true });
  await fs.writeFile(OUTPUT_FILE_PATH, "[");

  await writeJsonElementsPerChunk(OUTPUT_FILE_PATH, numberOfRow, totalRow);
  await fs.appendFile(OUTPUT_FILE_PATH, "]");
};

export const displayTimeLapse = (startingTime: number, endingTime: number) => {
  const startDate = dayjs(startingTime);
  const endingDate = dayjs(endingTime);

  console.log(`ending time: ${endingDate.format("YYYY-MM-DD HH:mm:ss")}`);
  console.log(`timelapse: ${endingDate.diff(startDate, "second", true)}`);
};
