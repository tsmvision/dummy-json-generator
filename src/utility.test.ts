import {describe, expect, test} from '@jest/globals';
import { getCurrentNumberOfRow } from './utility';

describe("utility", () => {
    test("getCurrentNumberOfRow()", () => {
        const TOTAL_ROW = 10;
        const NUMBER_OF_ROW = 3;
        expect(getCurrentNumberOfRow(TOTAL_ROW, NUMBER_OF_ROW, 1)).toBe(3);
        expect(getCurrentNumberOfRow(TOTAL_ROW, NUMBER_OF_ROW, 3)).toBe(1);
        expect(getCurrentNumberOfRow(100, 12, 8)).toBe(4);
    });
});
