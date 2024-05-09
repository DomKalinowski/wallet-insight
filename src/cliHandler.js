const { Table } = require("console-table-printer");
const config = require("../walletconfig.json");
const { analyser } = require("./csvParse");

const { cliTableConfig, printResultsBuilder } = require("./cliTable");
const cliTable = new Table(cliTableConfig);

module.exports = (options) => {
    const hasFilesInConfig = Object.values(config.files).length > 0;
    const state = {
        ...options,
        cliTable,
        totalAmount: 0,
        totalRows: 0,
    };
    const printResults = printResultsBuilder(state);

    if (options.file || (options.statement && hasFilesInConfig)) {
        const filePath =
            options.file ?? config.dir + config.files[options.statement];

        Promise.resolve(
            analyser({
                filePath,
                statement: options.statement,
                state,
            }),
        ).then(printResults);
    } else if (options.files || hasFilesInConfig) {
        const statementKeys = Object.keys(config.files);

        Promise.all(
            statementKeys.map((statement) =>
                analyser({
                    filePath: config.dir + config.files[statement],
                    statement,
                    state,
                }),
            ),
        ).then(printResults);
    } else {
        console.log("Provide a path to the bank statement");
    }
};
