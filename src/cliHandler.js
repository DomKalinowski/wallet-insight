import { Table } from "console-table-printer";
import config from "../walletconfig.json" assert { type: "json" };
import { cliTableConfig, printResultsBuilder } from "./cliTable.js";
import { analyser } from "./csvParse.js";

const DEFAULT_TABLE = "ALL";

export default (cliOptions) => {
    const { dir, statements, output } = config; //TODO: Test witout config file

    const hasCliOptions = Object.values(cliOptions).filter(Boolean).length > 0;
    const tableNamesDefinedInConfig = Object.keys(output?.tables);
    const tableNames =
        hasCliOptions || tableNamesDefinedInConfig.length === 0
            ? [DEFAULT_TABLE]
            : tableNamesDefinedInConfig;

    for (const tableName of tableNames) {
        const filesFromConfig = Object.values(statements).filter(
            ({ file }) => file,
        );
        const hasFilesInConfig = filesFromConfig.length > 0;

        const state = {
            hasCliOptions,
            tableName,
            cliTable: new Table(cliTableConfig(tableName, cliOptions)),
            totalAmount: 0,
            totalRows: 0,
        };

        const printResults = printResultsBuilder(state);

        if (cliOptions.file || (cliOptions.statement && hasFilesInConfig)) {
            const filePath =
                cliOptions.file ?? dir + filesFromConfig[cliOptions.statement];

            Promise.resolve(
                analyser({
                    filePath,
                    statement: cliOptions.statement,
                    state,
                    cliOptions,
                }),
            ).then(printResults);
        } else if (cliOptions.files || hasFilesInConfig) {
            const statementKeys = Object.keys(statements);

            Promise.all(
                statementKeys.map((statement) =>
                    analyser({
                        filePath: dir + statements[statement].file,
                        statement,
                        state,
                        cliOptions,
                    }),
                ),
            ).then(printResults);
        } else {
            console.log("Provide a path to the bank statement");
        }
    }
};
