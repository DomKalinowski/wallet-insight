/**
 * Parses a date string formatted as "DD/MM/YYYY" and converts it into a timestamp.
 *
 * The function splits the input date by "/", reverses the resulting array to transform it into "YYYY-MM-DD" format,
 * which is the ISO 8601 format recognized by the `Date.parse` method, and then parses the date string to obtain the timestamp.
 *
 * Note: This function assumes the input date string is in "DD/MM/YYYY" format. If the date string is in a different format,
 * or if it includes time information, this function may not work correctly.
 *
 * @function parseDate
 * @param {string} date - The date string in "DD/MM/YYYY" format that needs to be parsed.
 * @returns {number} A timestamp representing the number of milliseconds since January 1, 1970, 00:00:00 UTC.
 *
 * @example
 * const timestamp = parseDate("31/12/2020");
 * // Returns the timestamp for December 31, 2020
 *
 * Notes:
 * - The function does not perform any validation on the input. Invalid or incorrectly formatted date strings will lead to an
 *   invalid Date object or NaN.
 * - It is assumed that the date string provided does not include any time component.
 */
export const parseDate = (date) =>
    Date.parse(date.split("/").reverse().join("-"));
