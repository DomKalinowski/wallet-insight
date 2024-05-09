import { Table } from "console-table-printer";
import config from "../walletconfig.json" assert { type: "json" };
import { cliTableConfig, printResultsBuilder } from "./cliTable.js";
import { analyser } from "./csvParse.js";

export default (options) => {
    const { dir, files } = config;
    const cliTable = new Table(cliTableConfig(options));
    const hasFilesInConfig = Object.values(files).length > 0;
    const state = {
        ...options,
        cliTable,
        totalAmount: 0,
        totalRows: 0,
    };
    const printResults = printResultsBuilder(state);

    if (options.file || (options.statement && hasFilesInConfig)) {
        const filePath = options.file ?? dir + files[options.statement];

        Promise.resolve(
            analyser({
                filePath,
                statement: options.statement,
                state,
            }),
        ).then(printResults);
    } else if (options.files || hasFilesInConfig) {
        const statementKeys = Object.keys(files);

        Promise.all(
            statementKeys.map((statement) =>
                analyser({
                    filePath: dir + files[statement],
                    statement,
                    state,
                }),
            ),
        ).then(printResults);
    } else {
        console.log("Provide a path to the bank statement");
    }
};
