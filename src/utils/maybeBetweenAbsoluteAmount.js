import {
    maybeAtLeastMinAmount,
    maybeAtMostMaxAmount,
} from "./maybeBetweenAmount.js";

/**
 * Checks if a given amount is at least the specified minimum absolute value.
 *
 * The function determines whether the provided amount is greater than or equal to
 * an absolute minimum value (`absMin`). If `absMin` is undefined, the function
 * will treat it as there being no minimum and always return true. This can be useful
 * when the minimum value is dynamic or optional. The function parses the `amount`
 * as a float and takes its absolute value for comparison.
 *
 * @param {number} [absMin] - An optional number representing the absolute minimum
 *                            value that `amount` should be equal to or above.
 * @param {string|number} amount - The numerical amount to check against `absMin`. It can be
 *                                 a number or a string that represents a number.
 *
 * @returns {boolean} Returns true if `absMin` is undefined, or if the absolute value of `amount`
 *                    is greater than or equal to `absMin`. Returns false otherwise.
 *
 * @example
 * // returns true because 10 is greater than 5
 * maybeAtLeastMinAbsoluteAmount(5, "10");
 *
 * @example
 * // returns false because 3 is less than 5
 * maybeAtLeastMinAbsoluteAmount(5, "-3");
 *
 * @example
 * // returns true since `absMin` is not provided
 * maybeAtLeastMinAbsoluteAmount(undefined, "123");
 */
const maybeAtLeastMinAbsoluteAmount = (absMin, amount) =>
    maybeAtLeastMinAmount(absMin, amount, Math.abs);

/**
 * Checks if a given amount is at most the specified maximum absolute value.
 *
 * The function determines whether the provided amount is less than or equal to
 * an absolute maximum value (`absMax`). If `absMax` is undefined, the function
 * will treat it as there being no maximum and always return true. This can be useful
 * when the maximum value is dynamic or optional. The function parses the `amount`
 * as a float and takes its absolute value for comparison.
 *
 * @param {number} [absMax] - An optional number representing the absolute maximum
 *                            value that `amount` should be equal to or below.
 * @param {string|number} amount - The numerical amount to check against `absMax`. It can be
 *                                 a number or a string that represents a number.
 *
 * @returns {boolean} Returns true if `absMax` is undefined, or if the absolute value of `amount`
 *                    is less than or equal to `absMax`. Returns false otherwise.
 *
 * @example
 * // returns true because 3 is less than 5
 * maybeAtMostMaxAbsoluteAmount(5, "3");
 *
 * @example
 * // returns true because 5 is equal to 5
 * maybeAtMostMaxAbsoluteAmount(5, "-5");
 *
 * @example
 * // returns false because 10 is greater than 5
 * maybeAtMostMaxAbsoluteAmount(5, "10");
 *
 * @example
 * // returns true since `absMax` is not provided
 * maybeAtMostMaxAbsoluteAmount(undefined, "123");
 */
const maybeAtMostMaxAbsoluteAmount = (absMax, amount) =>
    maybeAtMostMaxAmount(absMax, amount, Math.abs);

/**
 * Checks if a given amount is within the inclusive range specified by the absolute minimum and maximum values.
 *
 * This function uses `maybeAtLeastMinAbsoluteAmount` and `maybeAtMostMaxAbsoluteAmount` to determine whether the provided
 * `amount` falls within an absolute range, including the boundaries defined by `absMin` and `absMax`. If either of the boundary
 * functions return false, the combined result will also be false, meaning the `amount` does not fall within the desired range.
 * The comparison is inclusive of both `absMin` and `absMax`. If `absMin` or `absMax` is undefined, that end of the range is
 * treated as unbounded, effectively ignoring that boundary check.
 *
 * @param {number} [absMin] - An optional number representing the absolute minimum value that `amount` should be equal to or above.
 * @param {number} [absMax] - An optional number representing the absolute maximum value that `amount` should be equal to or below.
 * @param {string|number} amount - The numerical amount to check against `absMin` and `absMax`. It can be a number or a string
 *                                 that represents a numerical value.
 *
 * @returns {boolean} Returns true if `amount` is greater than or equal to `absMin`, and less than or equal to `absMax`.
 *                    If `absMin` or `absMax` are undefined, those bounds are ignored. Returns false otherwise.
 *
 * @example
 * // returns true because 6 is between 5 and 10
 * maybeBetweenAbsoluteAmount(5, 10, "6");
 *
 * @example
 * // returns false because 11 is not between 5 and 10
 * maybeBetweenAbsoluteAmount(5, 10, "11");
 *
 * @example
 * // returns true because 3 is above the minimum (no maximum set)
 * maybeBetweenAbsoluteAmount(3, undefined, "5");
 *
 * @example
 * // returns true because 8 is below the maximum (no minimum set)
 * maybeBetweenAbsoluteAmount(undefined, 10, "8");
 */
export const maybeBetweenAbsoluteAmount = (absMin, absMax, amount) =>
    maybeAtLeastMinAbsoluteAmount(absMin, amount) &&
    maybeAtMostMaxAbsoluteAmount(absMax, amount);
