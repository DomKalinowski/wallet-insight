import { bold, hex } from "ansis";

const hexColors = {
    jan: "#979ca2",
    feb: "#2f77c3",
    mar: "#8f9fff",
    apr: "#f8b3ec",
    may: "#a4d13a",
    jun: "#28a261",
    jul: "#61bf9a",
    aug: "#eee296",
    sep: "#fe8b4c",
    oct: "#98512a",
    nov: "#2f77c3",
    dec: "#1126a5",
};

/**
 * Generates a styled string for the given month using ANSI styling codes.
 * The function applies bold, italic, and underline styles to the hex color associated with the month.
 * The hex color for each month is retrieved from the `hexColors` object.
 *
 * @param {string} month - The month abbreviation (e.g., 'jan', 'feb', etc.) used as a key to retrieve the corresponding color from `hexColors`.
 * @returns {string} A styled string with ANSI escape codes to format text output in terminals. Includes styling for bold, italic, underline, and color.
 * @example
 * // Suppose hexColors contains the following data:
 * // { jan: "#979ca2", feb: "#2f77c3", ..., dec: "#1126a5" }
 *
 * const styledKey = createStyledMonthKey('jan');
 * console.log(styledKey); // Outputs the style-applied ANSI code for January's color of \x1B[1m\x1B[3m\x1B[4m\x1B[38;2;151;156;162m
 */
const createStyledMonthKey = (month) => {
    return bold.italic.bgHex("#000000").hex(hexColors[month]).open;
};

/**
 * Constructs a mapping between month names and ANSI color escape codes based on provided hexadecimal color values. Additionally, this function creates a reversed month name as a key with the corresponding styled color escape codes.
 *
 * The `hexColors` object is expected to have keys representing month names (e.g., "jan", "feb", etc.) and values as string hexadecimal colors (e.g., "#FFFFFF").
 *
 * The generated `monthColors` object will have keys for both the original month names and their reversed variants. Each original month name key will map to an ANSI escape code that sets the text to the hexadecimal color specified in `hexColors`. Each reversed month name key will map to an ANSI escape code that applies predefined styles and colors.
 *
 * @param {Object} hexColors - An object where keys are month abbreviations and values are their corresponding hexadecimal color codes.
 * @returns {Object} An object with each month and its reversed name as keys, and ANSI escape codes for styling as values.
 *
 * @example
 * const hexColors = {
 *   jan: '#979ca2',
 *   feb: '#2f77c3',
 *   // other months...
 * };
 *
 * const monthColors = export const monthColors = Object.keys(hexColors).reduce(
 *   (colors, month) => {
 *     colors[month] = hex(hexColors[month]).open;
 *     colors[[...month].reverse().join("")] = createStyledMonthKey(month);
 *     return colors;
 *   },
 *   {}
 * );
 *
 * console.log(monthColors['jan']); // Outputs the ANSI escape code for January's color
 * console.log(monthColors['naj']); // Outputs the ANSI escape code for styled 'jan' (January reversed)
 */
export const monthColors = Object.keys(hexColors).reduce((colors, month) => {
    colors[month] = hex(hexColors[month]).bgHex("#5d5d5d").open;
    colors[[...month].reverse().join("")] = createStyledMonthKey(month);
    return colors;
}, {});

export const monthNames = Object.keys(hexColors);
