import assert from "node:assert";
import test from "node:test";
import { parseDate } from "./parseDate.js";

test("parseDate should correctly parse dates formatted as MM/DD/YYYY", () => {
    const date = "25/12/2020";
    const expectedTimestamp = Date.parse("2020-12-25");
    assert.equal(parseDate(date), expectedTimestamp);
});

test("parseDate should handle dates with single-digit months and days", () => {
    const date = "05/01/2021";
    const expectedTimestamp = Date.parse("2021-01-05");
    assert.equal(parseDate(date), expectedTimestamp);
});

test("parseDate should return NaN for invalid date formats", () => {
    const invalidDate = "not-a-date";
    assert.ok(Number.isNaN(parseDate(invalidDate)));
});

test("parseDate should return NaN for incorrect date values", () => {
    const invalidDate = "40/13/2020"; // Invalid month and day
    assert.ok(Number.isNaN(parseDate(invalidDate)));
});

test("parseDate should return NaN if the date string is empty", () => {
    const emptyDate = "";
    assert.ok(Number.isNaN(parseDate(emptyDate)));
});
