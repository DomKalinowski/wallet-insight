import { bold } from "ansis";
import { monthColors } from "./monthColors.js";
import { parseDate } from "./utils/index.js";

/**
 * Generates a configuration object for displaying CLI tables based on provided options.
 *
 * This function accepts a title and an optional sorting configuration and returns an object
 * specifying how to display and sort a table in the command line interface. The returned object includes
 * a styled title, column definitions, a list of disabled columns to be omitted from the rendering,
 * a color map for the rows, and a sorting function for the data in the table.
 *
 * @param {string} tableTitle - The title text to be displayed above the table.
 * @param {Object} [options] - Optional parameters to define table sorting behavior.
 * @param {string} [options.sortBy=date] - The name of the column by which the table should be sorted.
 * @param {string} [options.sortDir=asc] - The direction of sorting ('asc' for ascending or 'desc' for descending).
 * @returns {Object} The configuration object for the CLI table.
 *
 * @example
 * // Invoking cliTableConfig with a custom title and default sorting options:
 * const config = cliTableConfig("Transaction Summary");
 * console.dir(config); // Shows the generated CLI table configuration.
 *
 * @example
 * // Invoking cliTableConfig with a custom title and specified sorting options:
 * const config = cliTableConfig("Transaction Summary", { sortBy: "amount", sortDir: "desc" });
 * console.dir(config); // Shows the generated CLI table configuration with custom sorting.
 *
 * @todo Replace placeholder column configurations with actual config.
 * @todo Replace the hardcoded disabledColumns array with actual config.
 */
export function cliTableConfig(
    tableTitle,
    { sortBy = "date", sortDir = "asc" },
) {
    return {
        title: bold.inverse.magenta(`  ===== ${tableTitle} =====  `),
        columns: [
            //TODO: Replace with the config
            { name: "date", alignment: "right" },
            { name: "amount", alignment: "right" },
            { name: "type", alignment: "right" },
            { name: "reference", alignment: "left" },
        ],
        disabledColumns: ["name"], //TODO: Replace with the config
        colorMap: monthColors,
        sort: (row1, row2) => {
            let obj1 = row1;
            let obj2 = row2;

            if (sortDir === "desc") {
                obj1 = row2;
                obj2 = row1;
            }

            return parseDate(obj1[sortBy]) - parseDate(obj2[sortBy]);
        },
    };
}

/**
 * Constructs a function that prints the results of transaction processing.
 *
 * This function utilizes a closure over the `state` object to format and print
 * the results to the console when invoked. It makes use of the passed argument `a`
 * which is expected to be an array of numbers where each number represents a count of
 * transactions, or directly as the total number of transactions if not reducible.
 *
 * @param {Object} state - The state object containing data about the transactions.
 * @param {Object} state.cliTable - An object with a method `printTable` for displaying table results.
 * @param {number} state.totalRows - The total number of transactions processed.
 * @param {number} state.totalAmount - The summed value of all transaction amounts.
 * @returns {Function} A function that takes in an array `a` and prints formatted output to the console.
 *
 * @example
 * // Given a state object with transaction data:
 * const state = {
 *   cliTable: {
 *     printTable: () => { ... }
 *   },
 *   totalRows: 100,
 *   totalAmount: 2500.75
 * };
 * const printResults = printResultsBuilder(state);
 *
 * // Now call `printResults` with an array of transaction counts:
 * printResults([10, 20, 30]); // Prints formatted results to the console
 */
export function printResultsBuilder(state) {
    return (a) => {
        state.cliTable.printTable();
        console.log(
            `Out of the ${bold.underline.blue(
                a.reduce?.((sum, total) => sum + total, 0) ?? a,
            )} transactions that were parsed, there were ${bold.underline.green(
                state.totalRows,
            )} transactions that amounted to a total of ${bold.underline.red(
                JSON.stringify(
                    Math.round((state.totalAmount + Number.EPSILON) * 100) /
                        100,
                ),
            )} GBP.\r\n`,
        );
    };
}
