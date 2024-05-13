import { readFileSync } from "node:fs";
import { bold } from "ansis";
import { Table } from "console-table-printer";
import { getMascot } from "./assets/ascii-mascot.js";
import { cliTableConfig, printResultsBuilder } from "./cliTable.js";
import { analyser } from "./csvParse.js";

const DEFAULT_TABLE = "ALL";
const NO_CONFIG_ERROR_MSG = `
${bold.red("Failed to read or parse the configuration file. ")}
Please provide a file path using the '--file' CLI option 
or ensure that the 'walletconfig.json' file exists and contains valid paths.

`;
const CONFIG_FILE_PATH = "./walletconfig.json";

export default (cliOptions) => {
    const hasCliOptions = Object.values(cliOptions).filter(Boolean).length > 0;

    let config;
    try {
        config = JSON.parse(readFileSync(CONFIG_FILE_PATH, "utf8"));
    } catch (err) {
        if (!cliOptions.file) {
            throw new Error(
                getMascot() + bold.yellow(NO_CONFIG_ERROR_MSG) + bold.red(err),
            );
        }
    }

    const { dir, statements, output } = config;
    const tableNamesDefinedInConfig = output ? Object.keys(output?.tables) : [];
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
            cliTable: new Table(
                cliTableConfig(
                    tableName,
                    hasCliOptions ? cliOptions : output?.sort ?? {},
                ),
            ),
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
                    config,
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
                        config,
                    }),
                ),
            ).then(printResults);
        } else {
            console.log("Provide a path to the bank statement");
        }
    }
};
