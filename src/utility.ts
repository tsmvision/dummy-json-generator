import { faker } from '@faker-js/faker';
import fs from 'fs/promises';

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
    }
    catch (e) {
        console.log(e);
    }
};

export const generateResultByNumber = (numberOfRow: number) => {
    const result: any[] = [];
    for (let i = 0; i < numberOfRow; i++) {
      result.push(createRandomUser());
    }
    
    return result;
};

export const customStrinify = (result: any[]) => {
    const data = result.map((element: any) => JSON.stringify(element));

    return data.join(",");
};

export const writeDataToFile = async (OUTPUT_FILE_PATH: string, numberOfRow: number, totalRow: number) => {
    await fs.writeFile(OUTPUT_FILE_PATH, "");
    await fs.appendFile(OUTPUT_FILE_PATH, "[");

    for (let i = 0; i < Math.floor(totalRow / numberOfRow); i++) {

        if (i !== 0) {
            await fs.appendFile(OUTPUT_FILE_PATH, ",");
        }

        const result = generateResultByNumber(numberOfRow);
        const strinifiedResult = customStrinify(result);
        
        await fs.appendFile(OUTPUT_FILE_PATH, strinifiedResult);
    }

    await fs.appendFile(OUTPUT_FILE_PATH, "]");
};
