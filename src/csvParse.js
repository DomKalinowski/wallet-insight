import { createReadStream } from "node:fs";
import { parse } from "@fast-csv/parse";
import { monthNames } from "./monthColors.js";
import {
    maybeBetweenAbsoluteAmount,
    maybeBetweenAmount,
    maybeBetweenDates,
} from "./utils/index.js";

/**
 * Evaluates whether a given row meets a variety of optional filtering criteria.
 *
 * This function checks if the amount is within absolute and regular bounds, if the date falls within a specified range,
 * and if certain strings are included within specific fields of the row. Each criterion is only applied if its associated
 * parameters are provided. This allows for flexible, criterion-based filtering.
 *
 * @param {Object} row - The data row to be checked against the provided criteria.
 * @param {number} [row.amount] - The monetary value associated with the row that will be checked against amount criteria.
 * @param {string} [row.date] - The date associated with the row in the format 'MM/DD/YYYY' which will be checked against date criteria.
 * @param {string} [row.type] - The type string associated with the row to check for inclusion of the `type` parameter.
 * @param {string} [row.reference] - The reference string associated with the row to check for inclusion of the `reference` parameter.
 * @param {Object} criteria - An object containing the various filtering criteria.
 * @returns {boolean} Returns `true` if the row meets all the provided criteria, otherwise returns `false`.
 */
const checkRow = (
    row,
    { min, max, absMin, absMax, type = "", reference = "", from, to },
) =>
    maybeBetweenAbsoluteAmount(absMin, absMax, row.amount) &&
    maybeBetweenAmount(min, max, row.amount) &&
    maybeBetweenDates(from, to, row.date) &&
    row.type?.includes(type) &&
    row.reference.toLowerCase()?.includes(reference.toLowerCase());

/**
 * Processes a given row of data and, if it meets specified criteria,
 * updates the total amount, total rows, and adds the row to the CLI table with color formatting.
 *
 * The function is curried, receiving its configuration `state` first, which includes references
 * to various options and criteria used in processing. It returns another function that takes a `row`
 * as an argument and processes it based on the earlier provided `state`.
 *
 * @param {Object} state - An object containing properties used for processing and filtering.
 * @param {Object} state.cliTable - A CLI table instance where rows are added if they meet the criteria.
 * @param {boolean} state.hasCliOptions - A flag indicating whether CLI options are available to check against.
 * @param {number} state.totalAmount - The running total amount accumulated from valid rows.
 * @param {number} state.totalRows - The running total of valid rows processed.
 * @param {Object} [cliOptions] - Optional. CLI options against which to check the current row.
 * @returns {Function} A function that accepts a `row` object and processes it according to the given state.
 */
const processAndFilterRow = (state, cliOptions, config) => (row) => {
    const { cliTable, hasCliOptions, tableName } = state;

    const tableCriteria = config?.output?.tables[tableName];

    let shouldAddRow;
    if (hasCliOptions) {
        shouldAddRow = checkRow(row, cliOptions);
    } else if (tableCriteria?.length > 0) {
        shouldAddRow = tableCriteria.some((criteria) =>
            checkRow(row, criteria),
        );
    }

    if (shouldAddRow) {
        state.totalAmount += Number.parseFloat(row.amount);

        const dateSplit = row.date.split("/");
        const month = Number.parseInt(dateSplit[1]);
        const year = Number.parseInt(dateSplit[2]);

        const monthName = monthNames[month - 1];
        const color =
            year % 2 === 0 ? monthName : [...monthName].reverse().join("");

        state.totalRows += 1;

        cliTable.addRow(row, { color });
    }
};

/**
 * Constructs a configuration object for parsing CSV data. The returned configuration instructs the CSV parser to ignore empty lines, use specific headers based on the statement type, and rename headers.
 *
 * @function csvParseConfig
 * @param {string} statement - The type of statement (e.g., 'bankStatement', 'creditCardStatement') which determines the configuration key to be used in parsing.
 * @returns {Object} Returns an object containing the configuration for the CSV parser.
 * @property {boolean} ignoreEmpty - Indicates whether empty lines should be ignored by the parser.
 * @property {Array<string|undefined>} headers - An array of header names to be used when parsing the CSV data. Undefined entries represent headers that were specified in the configuration as null to be hidden in the table.
 * @property {boolean} renameHeaders - Whether or not to rename headers in the parsed output.
 */
const csvParseConfig = (statement, config) => ({
    ignoreEmpty: true,
    headers: Object.values(config.statements[statement].columns).map((v) =>
        v ? v : undefined,
    ),
    renameHeaders: true,
});

/**
 * Analyses the CSV file specified by `filePath`, transforming each row according to predefined rules and processing it with a given function.
 * The output is a stream of transformed data where each object has an additional 'reference' field.
 * It returns a Promise which resolves when the entire file has been processed or rejects if an error occurs during processing.
 *
 * @function analyser
 * @param {Object} params - The parameters object for the function.
 * @param {string} params.filePath - The path to the CSV file that needs to be analysed.
 * @param {string} params.statement - The type of statement (e.g., 'bankStatement', 'creditCardStatement'), used to determine the parsing configuration.
 * @param {Object} params.state - An object that represents the state passed to the `processAndFilterRow` function for additional processing.
 * @returns {Promise} A Promise that resolves when the CSV file processing is complete, or rejects if an error occurs.
 */
export function analyser({ filePath, statement, state, cliOptions, config }) {
    return new Promise((resolve, reject) =>
        createReadStream(filePath)
            .pipe(parse(csvParseConfig(statement, config)))
            .transform((data) => ({
                ...data,
                reference: [
                    data.name,
                    data.reference.replaceAll("\t", "").trim(),
                ]
                    .filter(Boolean)
                    .join(" | "),
                statement,
            }))
            .on("error", reject)
            .on("data", processAndFilterRow(state, cliOptions, config))
            .on("end", resolve),
    );
}
