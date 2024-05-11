import assert from "node:assert";
import test from "node:test";
import { maybeBetweenAbsoluteAmount } from "./maybeBetweenAbsoluteAmount.js";

test("should return true when both min and max are undefined", () => {
    assert.strictEqual(
        maybeBetweenAbsoluteAmount(undefined, undefined, 100),
        true,
    );
});

test("should return true when amount is between absMin and absMax", () => {
    assert.strictEqual(maybeBetweenAbsoluteAmount("50", "150", "100"), true);
});

test("should return false when amount is less than absMin", () => {
    assert.strictEqual(maybeBetweenAbsoluteAmount(101, 200, 100), false);
});

test("should return false when amount is greater than absMax", () => {
    assert.strictEqual(maybeBetweenAbsoluteAmount(0, 99, 100), false);
});

test("should return true when amount is equal to absMin and less than absMax", () => {
    assert.strictEqual(maybeBetweenAbsoluteAmount(100, 150, 100), true);
});

test("should return true when amount is greater than absMin and equal to absMax", () => {
    assert.strictEqual(maybeBetweenAbsoluteAmount(50, 100, 100), true);
});

test("should handle non-numeric amounts by treating them as 0", () => {
    assert.strictEqual(
        maybeBetweenAbsoluteAmount(10, 20, "not-a-number"),
        false,
    );
});

test("should return false when amount is outside the range on the negative side", () => {
    assert.strictEqual(maybeBetweenAbsoluteAmount(-50, -20, -60), false);
});

test("should return false when the absolute value of the number is not between the absolute values of min and max", () => {
    assert.strictEqual(maybeBetweenAbsoluteAmount(-50, -20, -30), false);
});

test("should return true when amount is within the negative range", () => {
    assert.strictEqual(maybeBetweenAbsoluteAmount(-20, -50, -30), true);
});
