import assert from "node:assert";
import test from "node:test";
import { maybeBetweenDates } from "./maybeBetweenDates.js";

test('maybeBetweenDates should return true when "date" is between "from" and "to"', () => {
    assert.equal(
        maybeBetweenDates("2023-01-01", "2023-12-31", "2023-07-04"),
        true,
    );
});

test('maybeBetweenDates should return false when "date" is before "from"', () => {
    assert.equal(
        maybeBetweenDates("2023-01-01", "2023-12-31", "2022-12-31"),
        false,
    );
});

test('maybeBetweenDates should return false when "date" is after "to"', () => {
    assert.equal(
        maybeBetweenDates("2023-01-01", "2023-12-31", "2024-01-01"),
        false,
    );
});

test('maybeBetweenDates should ignore "from" if test is undefined', () => {
    assert.equal(
        maybeBetweenDates(undefined, "2023-12-31", "2023-07-04"),
        true,
    );
});

test('maybeBetweenDates should ignore "to" if test is undefined', () => {
    assert.equal(
        maybeBetweenDates("2023-01-01", undefined, "2023-07-04"),
        true,
    );
});

test('maybeBetweenDates should handle both "from" and "to" being undefined', () => {
    assert.equal(maybeBetweenDates(undefined, undefined, "2023-07-04"), true);
});
