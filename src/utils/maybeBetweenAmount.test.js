import assert from "node:assert";
import test from "node:test";
import { maybeBetweenAmount } from "./maybeBetweenAmount.js";

test("should return true when amount is within range", () => {
    assert.equal(maybeBetweenAmount(1, 10, 5), true);
});

test("should return true when amount is equal to min", () => {
    assert.equal(maybeBetweenAmount(1, 10, 1), true);
});

test("should return true when amount is equal to max", () => {
    assert.equal(maybeBetweenAmount(1, 10, 10), true);
});

test("should return false when amount is below min", () => {
    assert.equal(maybeBetweenAmount(1, 10, 0), false);
});

test("should return false when amount is above max", () => {
    assert.equal(maybeBetweenAmount(1, 10, 11), false);
});

test("should handle negative numbers correctly", () => {
    assert.equal(maybeBetweenAmount(-10, 10, 0), true);
    assert.equal(maybeBetweenAmount(-10, -5, -11), false);
    assert.equal(maybeBetweenAmount(-10, -5, 0), false);
});

test("should handle when min is equal to max", () => {
    assert.equal(maybeBetweenAmount(5, 5, 5), true);
    assert.equal(maybeBetweenAmount(5, 5, 4), false);
    assert.equal(maybeBetweenAmount(5, 5, 6), false);
});
