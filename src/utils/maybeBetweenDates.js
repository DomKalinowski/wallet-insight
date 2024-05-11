import { parseDate } from "./parseDate.js";

/**
 * Checks if a given date is on or after the specified 'from' date.
 *
 * This function compares two dates. It first checks if the 'from' date is provided (not undefined).
 * If 'from' is undefined, the function will consider the condition as passed by default (truthy),
 * which means there's no start date to restrict the range. If 'from' is provided, it then uses the
 * `parseDate` function to convert both the 'from' and the input `date` into comparable formats,
 * typically Date objects, and checks whether the input `date` is greater than or equal to the 'from' date.
 * As such, the function ensures that the `date` falls within the allowed range starting at `from`.
 *
 * @param {string|undefined} from - The start date as a string in the format accepted by `parseDate`,
 *                                  or undefined to allow any date.
 * @param {string} date - The input date to check, as a string in the same format as `from`.
 * @returns {boolean} True if `date` is on or after `from`, or if `from` is undefined; false otherwise.
 * @throws Will throw an error if `parseDate` is not a valid function or cannot parse the provided dates.
 *
 * @example
 * // Assuming parseDate converts date strings into Date objects:
 * maybeFrom('2023-01-01', '2023-01-15'); // true, because Jan 15, 2023 is after Jan 1, 2023
 * maybeFrom(undefined, '2023-01-15'); // true, because `from` is undefined (no start date restriction)
 * maybeFrom('2023-01-20', '2023-01-15'); // false, because Jan 15, 2023 is before Jan 20, 2023
 */
const maybeFrom = (from, date) =>
    from === undefined || parseDate(date) >= parseDate(from);

/**
 * Checks if a given date is on or before the specified 'to' date.
 *
 * This function compares two dates. It first checks if the 'to' date is provided (not undefined).
 * If 'to' is undefined, the function will consider the condition valid by default (truthy),
 * meaning there's no end date to limit the range. If 'to' is provided, it then uses the
 * `parseDate` function to convert both the 'to' and the input `date` into comparable formats,
 * typically Date objects, and checks whether the input `date` is less than or equal to the 'to' date.
 * Consequently, this function ensures that the `date` falls within the allowed range ending at `to`.
 *
 * @param {string|undefined} to - The end date as a string in the format accepted by `parseDate`,
 *                                or undefined to impose no end date limitation.
 * @param {string} date - The input date to check, as a string in the same format as `to`.
 * @returns {boolean} True if `date` is on or before `to`, or if `to` is undefined; false otherwise.
 * @throws Will throw an error if `parseDate` is not a viable function or cannot parse the provided dates.
 *
 * @example
 * // Assuming parseDate converts date strings into Date objects:
 * maybeTo('2023-12-31', '2023-12-25'); // true, because Dec 25, 2023 is before Dec 31, 2023
 * maybeTo(undefined, '2023-12-25'); // true, because `to` is undefined (no end date limitation)
 * maybeTo('2023-12-20', '2023-12-25'); // false, because Dec 25, 2023 is after Dec 20, 2023
 */
const maybeTo = (to, date) =>
    to === undefined || parseDate(date) <= parseDate(to);

/**
 * Evaluates whether a given date falls between (or is equal to) an optional start ('from')
 * and end ('to') date.
 *
 * The function uses two other utility functions: `maybeFrom` and `maybeTo`, for which jsdoc
 * should exist elsewhere in the codebase. These functions are used to check the following:
 * - `maybeFrom` checks if the 'date' is on or after the 'from' date, or if 'from' is undefined,
 *   it returns true (no start date limitation).
 * - `maybeTo` checks if the 'date' is on or before the 'to' date, or if 'to' is undefined,
 *   it returns true (no end date limitation).
 *
 * Thus, `maybeBetweenDates` will only return true when 'date' lies in the range specified by
 * 'from' and 'to'. If either 'from' or 'to' is undefined, the respective check defaults to true,
 * essentially ignoring that boundary.
 *
 * @param {string|undefined} from - The starting date as a string in the format accepted by the
 *                                  parsing function, or undefined to ignore the start date limit.
 * @param {string|undefined} to - The ending date as a string in the same format as 'from', or
 *                                undefined to ignore the end date limit.
 * @param {string} date - The target date to evaluate, as a string in the format accepted by the
 *                        parsing function used within `maybeFrom` and `maybeTo`.
 * @returns {boolean} True if 'date' falls between 'from' and 'to'; false otherwise.
 *                    If 'from' is undefined, 'date' must be on or before 'to'.
 *                    If 'to' is undefined, 'date' must be on or after 'from'.
 *                    If both are undefined, it always returns true (no boundaries).
 * @throws Will throw an error if the underlying `maybeFrom` or `maybeTo` functions are not
 *         available or fail to parse the provided dates.
 *
 * @example
 * // Assuming maybeFrom and maybeTo handle string dates correctly:
 * maybeBetweenDates('2023-01-01', '2023-12-31', '2023-07-04'); // true, July 4th is between Jan 1st and Dec 31st
 * maybeBetweenDates(undefined, '2023-12-31', '2024-01-01'); // false, January 1st, 2024 is after December 31st, 2023
 * maybeBetweenDates('2023-01-01', undefined, '2022-12-31'); // false, December 31st, 2022 is before January 1st, 2023
 * maybeBetweenDates(undefined, undefined, '2023-07-04'); // true, no boundaries for comparison
 */
export const maybeBetweenDates = (from, to, date) =>
    maybeFrom(from, date) && maybeTo(to, date);
