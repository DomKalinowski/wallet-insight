/**
 * Determines if the processed `amount` is at least as large as the processed `min` value.
 *
 * @param {number} min - The minimum value that the processed amount is compared against. If `min` is `undefined`, then the function will always return `true`.
 * @param {number|string} amount - The value to be processed and compared to the `min`. It can be a number, or a numeric string that will be parsed into a float value.
 * @param {Function} [fn=(val) => val] - An optional processing function to apply to both `min` and `amount` before comparison. By default, it acts as an identity function, making no change to the inputs.
 *
 * @returns {boolean} - Returns `true` if the processed `amount` is greater than or equal to the processed `min` value or if the `min` is `undefined`; otherwise, it returns `false`.
 *
 * @example
 * // Using the default processing function:
 * maybeAtLeastMinAmount(10, '20'); // returns true
 * maybeAtLeastMinAmount(10, '5'); // returns false
 *
 * @example
 * // Custom processing function rounding down to the nearest integer:
 * const floor = Math.floor;
 * maybeAtLeastMinAmount(10.7, '11.2', floor); // returns true
 * maybeAtLeastMinAmount(10.9, '10.3', floor); // returns false
 */
export const maybeAtLeastMinAmount = (min, amount, fn = (val) => val) =>
    typeof min === "undefined" || fn(Number.parseFloat(amount)) >= fn(min);

/**
 * Evaluates whether the processed `amount` is at most equal to the processed `max`.
 *
 * @param {number} [max] - The maximum value that the processed amount is compared against. If `max` is `undefined`, then the function will always return `true`.
 * @param {number|string} amount - The value to be processed and compared to the `max`. It can be a number, or a numeric string that will be parsed into a float value.
 * @param {Function} [fn=(val) => val] - An optional processing function to apply to both `min` and `amount` before comparison. By default, it acts as an identity function, making no change to the inputs.
 *
 * @returns {boolean} Returns `true` if the processed `amount` is lower than or equal to the processed `max` value or if the `max` is `undefined`; otherwise, it returns `false`.
 *
 * @example
 * // Example using default identity function.
 * maybeAtMostMaxAmount(10, '9.5'); // true
 * maybeAtMostMaxAmount(10, '11');  // false
 * maybeAtMostMaxAmount(undefined, '1000'); // true
 *
 * @example
 * // Example using a custom rounding function as `fn`.
 * const round = (val) => Math.round(val);
 * maybeAtMostMaxAmount(10, '10.49', round); // true
 * maybeAtMostMaxAmount(10, '10.5', round);  // false
 */
export const maybeAtMostMaxAmount = (max, amount, fn = (val) => val) =>
    typeof max === "undefined" || fn(Number.parseFloat(amount)) <= fn(max);

/**
 * Determines whether a given `amount` is inclusively between two bounds, `min` and `max`.
 *
 * @param {number} min - The minimum bound for the `amount`. The `amount` should be equal to or greater than this value for the function to return `true`.
 * @param {number} max - The maximum bound for the `amount`. The `amount` should be equal to or less than this value for the function to return `true`.
 * @param {number|string} amount - A numeric value or string representation of a numeric value to compare against `min` and `max`.
 *
 * @returns {boolean} Returns `true` if the `amount` is between the `min` and `max` (inclusive), otherwise returns `false`.
 *
 * @example
 * // Example with `amount` falling within the specified range.
 * maybeBetweenAmount(3, 8, 5); // true
 * maybeBetweenAmount(1, 10, '10'); // true
 *
 * @example
 * // Example with `amount` not falling within the specified range.
 * maybeBetweenAmount(3, 8, 2); // false
 * maybeBetweenAmount(5, 15, '16'); // false
 */
export const maybeBetweenAmount = (min, max, amount) =>
    maybeAtLeastMinAmount(min, amount) && maybeAtMostMaxAmount(max, amount);
