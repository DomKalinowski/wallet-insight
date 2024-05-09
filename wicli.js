import { program } from "commander";
import cliHandler from "./src/cliHandler.js";

program
    .name("wicli")
    .description("CLI to some JavaScript string utilities")
    .option(
        "-S, --statement <string>",
        "Name of the statement listed in walletconfig.json",
    )
    .option("-f, --file <string>", "Path to the bank statement")
    .option(
        "-F, --files <string>",
        "Path to the folder with the bank statements",
    )
    .option("-t, --type <string>", "String to filter type by", "")
    .option("-m, --min <number>", "Minimum amount to filter amount by")
    .option("-M, --max <number>", "Maximum amount to filter amount by")
    .option("--from [DD/MM/YYYY]", "From date")
    .option("--to [DD/MM/YYYY]", "To date")
    .option("-r, --reference <string>", "String to filter memo by", "")
    .option("-s, --sort <string>", "String to filter memo by")
    .option("-d, --sortDir [asc|desc]", "String to filter memo by")
    .action(cliHandler);

program.parse();
